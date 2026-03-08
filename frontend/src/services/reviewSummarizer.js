// Review Summarizer - AI-powered review analysis
export const summarizeReviews = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      summary: "No reviews available",
      sentiment: null,
      commonPros: [],
      commonCons: [],
      dealBreakers: [],
      reliabilityScore: 0,
      topReviews: []
    };
  }

  // Analyze sentiment
  const sentiments = reviews.map(r => analyzeSentiment(r.text));
  const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;

  // Extract common themes
  const allPros = [];
  const allCons = [];
  const dealBreakers = [];

  reviews.forEach(review => {
    const { pros, cons, isDealBreaker } = extractThemes(review.text);
    allPros.push(...pros);
    allCons.push(...cons);
    if (isDealBreaker) {
      dealBreakers.push(review.text.substring(0, 100));
    }
  });

  // Count occurrences
  const proFrequency = countFrequency(allPros);
  const conFrequency = countFrequency(allCons);

  // Get most common themes
  const commonPros = Object.entries(proFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme, count]) => ({ theme, mentions: count }));

  const commonCons = Object.entries(conFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme, count]) => ({ theme, mentions: count }));

  // Calculate reliability score (0-100)
  const reliabilityScore = (
    (reviews.filter(r => r.verified).length / reviews.length) * 50 + // 50% verified reviews
    (avgSentiment > 0.3 ? 30 : 20) + // 30% sentiment consistency
    Math.min((reviews.length / 100) * 20, 20) // 20% volume of reviews
  );

  return {
    summary: generateSummaryText(avgSentiment, commonPros, commonCons),
    sentiment: avgSentiment > 0.3 ? "Positive" : avgSentiment < -0.3 ? "Negative" : "Mixed",
    commonPros,
    commonCons,
    dealBreakers: dealBreakers.slice(0, 3),
    reliabilityScore: Math.round(reliabilityScore),
    totalReviews: reviews.length,
    verifiedReviews: reviews.filter(r => r.verified).length,
    topReviews: reviews.slice(0, 3)
  };
};

// Analyze sentiment of a review (-1 to 1 scale)
function analyzeSentiment(text) {
  const positiveWords = [
    "great", "excellent", "amazing", "good", "love", "perfect", "best",
    "quality", "worth", "recommend", "happy", "satisfied", "fantastic",
    "awesome", "brilliant", "wonderful", "outstanding", "superb"
  ];

  const negativeWords = [
    "bad", "terrible", "awful", "hate", "poor", "worst", "broken",
    "waste", "disappointed", "defective", "useless", "regret", "horrible",
    "cheap", "badly", "rubbish", "dreadful", "pathetic"
  ];

  const lowerText = text.toLowerCase();
  
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

  return (positiveCount - negativeCount) / (positiveCount + negativeCount + 1);
}

// Extract themes from review text
function extractThemes(text) {
  const lowerText = text.toLowerCase();
  const pros = [];
  const cons = [];
  let isDealBreaker = false;

  // Common themes
  const themes = {
    durability: ["durable", "strong", "lasts", "longevity", "sturdy", "solid"],
    battery: ["battery", "battery life", "charging", "power"],
    performance: ["fast", "speed", "smooth", "quick", "slow", "lag"],
    design: ["design", "looks", "color", "appearance", "aesthetic"],
    price: ["expensive", "cheap", "pricey", "worth", "value"],
    support: ["support", "warranty", "service", "help", "customer"],
    quality: ["quality", "finish", "build", "material"],
    comfort: ["comfortable", "ergonomic", "painless", "cozy"],
    functionality: ["feature", "function", "works", "doesn't work", "bug", "issue"]
  };

  // Check for themes
  Object.entries(themes).forEach(([theme, keywords]) => {
    const hasTheme = keywords.some(keyword => lowerText.includes(keyword));
    if (hasTheme) {
      if (analyzeSentiment(text) > 0.3) {
        pros.push(theme);
      } else if (analyzeSentiment(text) < -0.3) {
        cons.push(theme);
      }
    }
  });

  // Detect deal-breakers
  const dealBreakerKeywords = ["stopped working", "broke", "broken", "defective", "failed", "died", "returned"];
  isDealBreaker = dealBreakerKeywords.some(keyword => lowerText.includes(keyword));

  return { pros, cons, isDealBreaker };
}

// Count frequency of themes
function countFrequency(arr) {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

// Generate human-readable summary
function generateSummaryText(sentiment, commonPros, commonCons) {
  if (sentiment > 0.5) {
    return "Highly recommended by users. Most customers praise its quality and reliability.";
  } else if (sentiment > 0.2) {
    return "Generally positive reviews. Users appreciate the overall value and performance.";
  } else if (sentiment < -0.5) {
    return "Reviews indicate significant issues. Consider alternatives before purchasing.";
  } else if (sentiment < -0.2) {
    return "Mixed reviews with some notable concerns. Review the cons carefully.";
  } else {
    return "Average product with both strengths and weaknesses. Check full reviews.";
  }
}

// Get review insights for a specific user profile
export const getProfileRelevantInsights = (reviews, userProfile) => {
  const insights = [];

  reviews.forEach(review => {
    const { pros, cons } = extractThemes(review.text);

    // Match with user priorities
    if (userProfile.priceVsQuality === "Quality Priority" && pros.includes("quality")) {
      insights.push("Users highlight excellent quality - good for your standards");
    }

    if (userProfile.usageDuration === "Long-term" && pros.includes("durability")) {
      insights.push("Multiple users confirm it lasts long - perfect for you");
    }

    if (userProfile.occupation === "Student" && cons.includes("price")) {
      insights.push("⚠️ Some students feel it's overpriced - check cheaper alternatives");
    }

    if (userProfile.techSavviness === "Basic" && cons.includes("complicated")) {
      insights.push("⚠️ Users with limited tech skills found it complex");
    }
  });

  return insights.slice(0, 5); // Return top 5 relevant insights
};

// Generate review summary for comparison
export const generateReviewComparison = (product1Reviews, product2Reviews) => {
  const summary1 = summarizeReviews(product1Reviews);
  const summary2 = summarizeReviews(product2Reviews);

  const comparison = {
    product1: summary1,
    product2: summary2,
    verdict: summary1.reliabilityScore > summary2.reliabilityScore ? "Product 1" : "Product 2",
    reasoning: generateComparisonReasoning(summary1, summary2)
  };

  return comparison;
};

function generateComparisonReasoning(summary1, summary2) {
  const reasons = [];

  if (summary1.reliabilityScore > summary2.reliabilityScore) {
    reasons.push(`Product 1 has more reliable reviews (${summary1.reliabilityScore}% vs ${summary2.reliabilityScore}%)`);
  }

  if (summary1.commonPros.length > summary2.commonPros.length) {
    reasons.push(`Product 1 has more highlighted strengths`);
  }

  if (summary1.dealBreakers.length < summary2.dealBreakers.length) {
    reasons.push(`Product 2 has more deal-breaker complaints`);
  }

  return reasons;
}
