// Recommendation Engine - Personalized Product Recommendations
export const generateRecommendations = (userProfile, products) => {
  if (!userProfile || !products || products.length === 0) {
    return [];
  }

  // Score each product based on user profile
  const scoredProducts = products.map((product) => {
    let score = 0;
    let reasons = [];

    // Budget alignment (40% weight)
    const userBudgetMax = userProfile.budgetRange?.max || 100000;
    const userBudgetMin = userProfile.budgetRange?.min || 0;
    
    if (product.price >= userBudgetMin && product.price <= userBudgetMax) {
      score += 40;
      reasons.push("Fits your budget");
    } else if (userProfile.priceVsQuality === "Price Priority") {
      score += 20;
      reasons.push("Good value for money");
    }

    // Brand preference (20% weight)
    if (userProfile.preferredBrands && userProfile.preferredBrands.length > 0) {
      const brandMatches = userProfile.preferredBrands.filter(
        brand => product.brand && product.brand.toLowerCase().includes(brand.toLowerCase())
      );
      if (brandMatches.length > 0) {
        score += 20;
        reasons.push(`Matches your preferred brands`);
      }
    }

    // Rating & Reviews (20% weight)
    if (product.rating) {
      score += (product.rating / 5) * 20;
      reasons.push(`Good rating: ${product.rating}/5`);
    }

    // Interest matching (20% weight)
    if (userProfile.interests && userProfile.interests.length > 0) {
      const categoryMatch = userProfile.interests.some(
        interest => product.category && product.category.toLowerCase().includes(interest.toLowerCase())
      );
      if (categoryMatch) {
        score += 20;
        reasons.push("Matches your interests");
      }
    }

    // Durability preference for long-term use
    if (userProfile.usageDuration === "Long-term" && product.durability === "High") {
      score += 10;
      reasons.push("Built for long-term use");
    }

    // Local seller preference
    if (userProfile.supportLocal && product.isLocal) {
      score += 10;
      reasons.push("Local/Small seller");
    }

    // Sustainability preference
    if (userProfile.sustainability && product.isSustainable) {
      score += 10;
      reasons.push("Eco-friendly option");
    }

    return {
      ...product,
      score: Math.min(score, 100),
      reasons,
      confidence: Math.min(score / 100, 1)
    };
  });

  // Sort by score and return top recommendations
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

// Generate personalized comparison data
export const generateComparison = (userProfile, products, selectedProducts) => {
  const comparisonData = {
    userProfile: {
      ageGroup: userProfile.ageGroup,
      budget: `₹${userProfile.budgetRange?.min || ""}-${userProfile.budgetRange?.max || ""}`,
      priorities: userProfile.priceVsQuality,
      usageDuration: userProfile.usageDuration
    },
    products: selectedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      rating: product.rating,
      specs: product.specs,
      pros: product.pros || [],
      cons: product.cons || [],
      bestFor: generateBestForText(userProfile, product)
    })),
    recommendation: selectBestProduct(userProfile, selectedProducts),
    alternatives: findAlternatives(userProfile, products, selectedProducts)
  };

  return comparisonData;
};

// AI-driven recommendation explanation
function generateBestForText(userProfile, product) {
  const texts = [];

  if (userProfile.ageGroup === "13-18" && product.price < 30000) {
    texts.push("Perfect for students on a tight budget");
  }

  if (userProfile.occupation === "Professional" && product.category === "Electronics") {
    texts.push("Ideal for professional work");
  }

  if (userProfile.usageDuration === "Long-term" && product.durability === "High") {
    texts.push("Great for long-term use");
  }

  if (userProfile.sustainability && product.isSustainable) {
    texts.push("Eco-conscious choice");
  }

  return texts.length > 0 ? texts.join(". ") : "Good general option";
}

// Select the best product for the user
function selectBestProduct(userProfile, products) {
  const scored = products.map((p) => {
    let score = 0;

    // Budget match
    if (p.price >= (userProfile.budgetRange?.min || 0) && p.price <= (userProfile.budgetRange?.max || 100000)) {
      score += 30;
    }

    // Rating
    score += (p.rating || 0) * 20;

    // Value for money
    if (userProfile.priceVsQuality === "Price Priority" && p.value >= 4) {
      score += 25;
    }

    // Confidence bonus for very sure choices
    if (score > 70) {
      score += 15;
    }

    return { product: p, score };
  });

  const best = scored.sort((a, b) => b.score - a.score)[0];
  return best ? best.product : products[0];
}

// Find alternative options
function findAlternatives(userProfile, allProducts, selectedProducts) {
  const selectedIds = selectedProducts.map(p => p.id);
  const alternatives = allProducts.filter(p => !selectedIds.includes(p.id));

  return alternatives
    .sort((a, b) => {
      const aPriceDiff = Math.abs(a.price - (userProfile.budgetRange?.max || 50000));
      const bPriceDiff = Math.abs(b.price - (userProfile.budgetRange?.max || 50000));
      return aPriceDiff - bPriceDiff;
    })
    .slice(0, 3);
}

// Detect confusion level based on behavior
export const detectConfusionLevel = (userBehavior) => {
  const {
    viewsPerProduct = 0,
    comparisonsMade = 0,
    cartsAbandoned = 0,
    timeSpentDeciding = 0,
    queriesAsked = 0
  } = userBehavior;

  let confusionScore = 0;

  if (viewsPerProduct > 20) confusionScore += 30;
  if (comparisonsMade > 5) confusionScore += 25;
  if (cartsAbandoned > 2) confusionScore += 20;
  if (timeSpentDeciding > 3600) confusionScore += 15;
  if (queriesAsked > 10) confusionScore += 10;

  if (confusionScore >= 70) return "Very Confused";
  if (confusionScore >= 50) return "Confused";
  if (confusionScore >= 30) return "Neutral";
  if (confusionScore >= 10) return "Confident";
  return "Very Confident";
};
