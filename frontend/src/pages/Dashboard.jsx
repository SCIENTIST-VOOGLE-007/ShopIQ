import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import ProfileSummary from "../components/ProfileSummary"
import RecommendationComparison from "../components/RecommendationComparison"
import { generateRecommendations } from "../services/recommendationEngine"
import { summarizeReviews } from "../services/reviewSummarizer"
import { getProfileApi } from "../services/api"
function Dashboard() {
  const { user, updateProfile } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [insights, setInsights] = useState([])

  useEffect(() => {
    // ensure we have latest profile from server
    const loadProfile = async () => {
      if (user && user.id && !user.profile) {
        try {
          const res = await getProfileApi(user.id)
          const updatedUser = res.data
          // sync full user object into context
          await updateProfile(updatedUser)
        } catch (err) {
          console.error("failed to load profile", err)
        }
      }
    }
    loadProfile()

    // Simulate loading product data and generating recommendations
    const mockProducts = [
      {
        id: 1,
        name: "MacBook Air M2",
        brand: "Apple",
        price: 89990,
        category: "Electronics",
        rating: 4.8,
        specs: { RAM: "8GB", Storage: "256GB", Processor: "M2" },
        pros: ["Fast processor", "Great battery life", "Lightweight"],
        cons: ["Expensive", "Limited ports", "No upgrade option"],
        durability: "High",
        isLocal: false,
        isSustainable: true
      },
      {
        id: 2,
        name: "Dell XPS 13",
        brand: "Dell",
        price: 79990,
        category: "Electronics",
        rating: 4.6,
        specs: { RAM: "8GB", Storage: "512GB", Processor: "Intel i5" },
        pros: ["Good value", "Reliable brand", "Good warranty"],
        cons: ["Can get hot", "Average battery"],
        durability: "High",
        isLocal: false
      },
      {
        id: 3,
        name: "Asus VivoBook",
        brand: "Asus",
        price: 49990,
        category: "Electronics",
        rating: 4.2,
        specs: { RAM: "8GB", Storage: "256GB", Processor: "Ryzen 5" },
        pros: ["Budget-friendly", "Good specs", "Local availability"],
        cons: ["Average build quality", "Shorter warranty"],
        durability: "Medium",
        isLocal: true,
        isSustainable: false
      }
    ];

    if (user && user.profile && user.profile.interests && user.profile.interests.length > 0) {
      const recs = generateRecommendations(user.profile, mockProducts);
      setRecommendations(recs);

      // Generate insights
      const newInsights = [
        `✨ Based on your profile (${user.profile.occupation}, Age: ${user.profile.ageGroup}), we recommend mid-range products`,
        `💡 Your budget (₹${user.profile.budgetRange?.min || "Any"}-${user.profile.budgetRange?.max || "Any"}) allows many options`,
        `🎯 Interests: ${user.profile.interests.join(", ")}`,
        `🌱 ${user.profile.supportLocal ? "Supporting local sellers" : "Open to all sellers"}`,
        `${user.profile.sustainability ? "✅ Eco-friendly products preferred" : ""}`,
      ].filter(Boolean);
      
      setInsights(newInsights);
    }

    setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="page"><h1>Loading recommendations...</h1></div>;
  }

  if (!user) {
    return <div className="page"><h1>Please log in to view your dashboard</h1></div>;
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="page">
        <h1>Your Dashboard</h1>
        <p>Your profile appears incomplete. Please <a href="/profile">edit your profile</a> to receive personalized recommendations.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Your Shopping Dashboard</h1>
      <p className="subtitle">Personalized recommendations based on your profile</p>

      <div className="dashboard-grid">
        <ProfileSummary profile={user} />
      </div>

      {/* Personalization Insights */}
      {insights.length > 0 && (
        <div className="glass-card insights-card">
          <h2>🎯 ShopIQ Insights</h2>
          <ul className="insights-list">
            {insights.map((insight, idx) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="glass-card recommendations-card">
          <h2>🤖 AI Recommendations For You</h2>
          <div className="recommendations-grid">
            {recommendations.map((product, idx) => (
              <div key={product.id} className="recommendation-card">
                <div className="rank-badge">#{idx + 1}</div>
                <h3>{product.name}</h3>
                <p className="brand">{product.brand}</p>
                
                <div className="product-details">
                  <div className="price">₹{product.price.toLocaleString()}</div>
                  <div className="rating">⭐ {product.rating}/5</div>
                  <div className="score-bar">
                    <div className="score-fill" style={{ width: `${product.score}%` }}></div>
                  </div>
                  <div className="confidence">Match: {Math.round(product.confidence * 100)}%</div>
                </div>

                <div className="reasons">
                  <strong>Why for you:</strong>
                  <ul>
                    {product.reasons.slice(0, 3).map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <button className="btn-primary" style={{ marginTop: "15px", width: "100%" }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Feature */}
      <RecommendationComparison />

      {/* Smart Shopping Tips */}
      <div className="glass-card tips-card">
        <h2>💡 Smart Shopping Tips</h2>
        <div className="tips-grid">
          <div className="tip">
            <h4>Budget Optimization</h4>
            <p>You can get excellent products in your budget range. Don't overspend on unnecessary features.</p>
          </div>
          {user.profile?.confusionLevel === "Very Confused" && (
            <div className="tip">
              <h4>Decision Support</h4>
              <p>Use the AI Assistant (chat) to ask specific questions. We'll help you compare and decide.</p>
            </div>
          )}
          {user.profile?.supportLocal && (
            <div className="tip">
              <h4>Local Sellers</h4>
              <p>Check out local and small sellers in your region for unique products and faster delivery.</p>
            </div>
          )}
          <div className="tip">
            <h4>Review Analysis</h4>
            <p>We analyze thousands of reviews to highlight real concerns vs. rare issues.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
