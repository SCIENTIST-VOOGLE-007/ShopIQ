import { useState } from "react"
import { generateComparison } from "../services/recommendationEngine"
import { summarizeReviews, getProfileRelevantInsights } from "../services/reviewSummarizer"
import { downloadPDFReport, printPDFReport } from "../services/reportGenerator"

function RecommendationComparison({ userProfile, products = [] }) {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [comparisonData, setComparisonData] = useState(null)
  const [reviewsSummary, setReviewsSummary] = useState(null)
  const [showComparison, setShowComparison] = useState(false)

  const toggleProductSelection = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.find(p => p.id === product.id)
      if (isSelected) {
        return prev.filter(p => p.id !== product.id)
      } else if (prev.length < 4) {
        return [...prev, product]
      }
      return prev
    })
  }

  const handleGenerateComparison = () => {
    if (selectedProducts.length < 2) {
      alert("Please select at least 2 products to compare")
      return
    }

    const comparison = generateComparison(userProfile, products, selectedProducts)
    setComparisonData(comparison)

    // Simulate review data and summarization
    const mockReviews = [
      {
        text: "Great quality product, very durable. Would recommend to anyone",
        verified: true
      },
      {
        text: "Good value for money but battery life could be better",
        verified: true
      },
      {
        text: "Excellent performance, fast and reliable. Love it!",
        verified: true
      }
    ]

    const summary = summarizeReviews(mockReviews)
    const insights = getProfileRelevantInsights(mockReviews, userProfile)
    
    setReviewsSummary({ summary, insights })
    setShowComparison(true)
  }

  const handleDownloadReport = () => {
    if (comparisonData) {
      downloadPDFReport(comparisonData, userProfile)
    }
  }

  const handlePrintReport = () => {
    if (comparisonData) {
      printPDFReport(comparisonData, userProfile)
    }
  }

  return (
    <div className="comparison-container">
      <h2>📊 Product Comparison Tool</h2>

      {!showComparison ? (
        <div>
          <p className="subtitle">Select 2-4 products to compare side-by-side</p>

          <div className="product-selector-grid">
            {products && products.map((product) => (
              <div
                key={product.id}
                className={`product-selector-card ${selectedProducts.find(p => p.id === product.id) ? "selected" : ""}`}
                onClick={() => toggleProductSelection(product)}
              >
                <div className="checkbox">
                  {selectedProducts.find(p => p.id === product.id) && "✓"}
                </div>
                <h3>{product.name}</h3>
                <p className="brand">{product.brand}</p>
                <div className="price-rating">
                  <span className="price">₹{product.price.toLocaleString()}</span>
                  <span className="rating">⭐ {product.rating}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="button-group-nav" style={{ marginTop: "20px" }}>
            <button
              className="btn-primary"
              onClick={handleGenerateComparison}
              disabled={selectedProducts.length < 2}
            >
              Compare {selectedProducts.length > 0 ? `(${selectedProducts.length} selected)` : ""}
            </button>
          </div>
        </div>
      ) : comparisonData ? (
        <div className="comparison-results">
          <button className="btn-secondary" onClick={() => setShowComparison(false)}>
            ← Back to Selection
          </button>

          {/* Comparison Table */}
          <div className="comparison-table-container">
            <table className="detailed-comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {comparisonData.products.map((p, idx) => (
                    <th key={idx}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Brand</td>
                  {comparisonData.products.map((p, idx) => (
                    <td key={idx}>{p.brand}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Price</td>
                  {comparisonData.products.map((p, idx) => (
                    <td key={idx} className="price">₹{p.price.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Rating</td>
                  {comparisonData.products.map((p, idx) => (
                    <td key={idx} className="rating">⭐ {p.rating}/5</td>
                  ))}
                </tr>
                {comparisonData.products[0].specs && (
                  Object.keys(comparisonData.products[0].specs).map((spec) => (
                    <tr key={spec}>
                      <td className="feature-name">{spec}</td>
                      {comparisonData.products.map((p, idx) => (
                        <td key={idx}>{p.specs[spec] || "N/A"}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pros & Cons */}
          <div className="pros-cons-section">
            <h3>Pros & Cons Analysis</h3>
            <div className="pros-cons-grid">
              {comparisonData.products.map((product, idx) => (
                <div key={idx} className="product-analysis">
                  <h4>{product.name}</h4>
                  <div className="pros">
                    <strong>✓ Pros:</strong>
                    <ul>
                      {product.pros && product.pros.slice(0, 3).map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons">
                    <strong>✗ Cons:</strong>
                    <ul>
                      {product.cons && product.cons.slice(0, 3).map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          {comparisonData.recommendation && (
            <div className="ai-recommendation">
              <h3>🤖 Our AI Recommendation</h3>
              <div className="recommendation-box">
                <h4>{comparisonData.recommendation.name}</h4>
                <p>
                  Based on your profile and requirements, we recommend the <strong>{comparisonData.recommendation.name}</strong> because:
                </p>
                <ul>
                  <li>Fits your budget of ₹{userProfile.budgetRange?.min}-{userProfile.budgetRange?.max}</li>
                  <li>Best value for your use case as a {userProfile.occupation}</li>
                  <li>Matches your priorities: {userProfile.priceVsQuality}</li>
                  <li>Highest overall score among compared products</li>
                </ul>
              </div>
            </div>
          )}

          {/* Review Insights */}
          {reviewsSummary && (
            <div className="review-insights">
              <h3>📖 Review Analysis</h3>
              <div className="insights-content">
                <p><strong>Overall Sentiment:</strong> {reviewsSummary.summary.sentiment}</p>
                <p>{reviewsSummary.summary.summary}</p>
                <p><strong>Reliability Score:</strong> {reviewsSummary.summary.reliabilityScore}%</p>
                
                {reviewsSummary.insights && reviewsSummary.insights.length > 0 && (
                  <div className="relevant-insights">
                    <strong>Insights for you:</strong>
                    <ul>
                      {reviewsSummary.insights.map((insight, idx) => (
                        <li key={idx}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="report-actions">
            <button className="btn-primary" onClick={handleDownloadReport}>
              📥 Download Report
            </button>
            <button className="btn-secondary" onClick={handlePrintReport}>
              🖨️ Print Report
            </button>
            <button className="btn-secondary" onClick={() => setShowComparison(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default RecommendationComparison
