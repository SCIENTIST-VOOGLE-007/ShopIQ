// PDF Report Generator for Shopping Comparisons
export const generatePDFReport = (comparisonData, userProfile) => {
  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>ShopIQ - Product Comparison Report</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        .header {
          background: linear-gradient(135deg, #6366f1, #22d3ee);
          color: white;
          padding: 40px;
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section h2 {
          color: #6366f1;
          font-size: 18px;
          margin-bottom: 15px;
          border-bottom: 2px solid #6366f1;
          padding-bottom: 10px;
        }
        .user-profile {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .profile-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .profile-label {
          font-weight: bold;
          color: #6366f1;
        }
        .profile-value {
          color: #555;
        }
        .product-comparison {
          margin-bottom: 25px;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          page-break-inside: avoid;
        }
        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .product-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
        .product-price {
          font-size: 18px;
          font-weight: bold;
          color: #6366f1;
        }
        .product-rating {
          color: #f59e0b;
          font-weight: bold;
        }
        .pros-cons {
          display: flex;
          gap: 20px;
          margin-top: 15px;
        }
        .pros, .cons {
          flex: 1;
        }
        .pros h4, .cons h4 {
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }
        .pros {
          color: #10b981;
        }
        .cons {
          color: #ef4444;
        }
        .pros ul, .cons ul {
          list-style: none;
          font-size: 12px;
          line-height: 1.5;
        }
        .pros li:before, .cons li:before {
          content: "• ";
          margin-right: 5px;
        }
        .recommendation {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(34, 211, 238, 0.1));
          border-left: 4px solid #6366f1;
          padding: 20px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .recommendation h3 {
          color: #6366f1;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .recommendation p {
          color: #555;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer {
          text-align: center;
          color: #999;
          font-size: 12px;
          margin-top: 40px;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background: #f8f9fa;
          font-weight: bold;
          color: #6366f1;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🛍️ ShopIQ Product Comparison Report</h1>
        <p>Personalized AI Shopping Companion</p>
      </div>

      <div style="padding: 0 40px;">
        <!-- User Profile Section -->
        <div class="section">
          <h2>Your Preferences</h2>
          <div class="user-profile">
            <div class="profile-row">
              <span class="profile-label">Age Group:</span>
              <span class="profile-value">${comparisonData.userProfile.ageGroup}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">Budget:</span>
              <span class="profile-value">${comparisonData.userProfile.budget}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">Priority:</span>
              <span class="profile-value">${comparisonData.userProfile.priorities}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">Usage Duration:</span>
              <span class="profile-value">${comparisonData.userProfile.usageDuration}</span>
            </div>
          </div>
        </div>

        <!-- Product Comparison Section -->
        <div class="section">
          <h2>Product Comparison</h2>
          ${comparisonData.products.map((product, idx) => `
            <div class="product-comparison">
              <div class="product-header">
                <div>
                  <div class="product-name">${idx + 1}. ${product.name}</div>
                  <div style="font-size: 12px; color: #999;">Brand: ${product.brand}</div>
                </div>
                <div>
                  <div class="product-price">₹${product.price.toLocaleString()}</div>
                  <div class="product-rating">⭐ ${product.rating}/5</div>
                </div>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong>Best For You:</strong> ${product.bestFor}
              </div>

              ${product.specs ? `
                <table>
                  <tr>
                    <th>Specification</th>
                    <th>Details</th>
                  </tr>
                  ${Object.entries(product.specs).map(([key, value]) => `
                    <tr>
                      <td>${key}</td>
                      <td>${value}</td>
                    </tr>
                  `).join('')}
                </table>
              ` : ''}

              <div class="pros-cons">
                <div class="pros">
                  <h4>✓ Pros</h4>
                  <ul>
                    ${product.pros.slice(0, 4).map(pro => `<li>${pro}</li>`).join('')}
                  </ul>
                </div>
                <div class="cons">
                  <h4>✗ Cons</h4>
                  <ul>
                    ${product.cons.slice(0, 4).map(con => `<li>${con}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- AI Recommendation Section -->
        <div class="section">
          <h2>🤖 AI Recommendation</h2>
          <div class="recommendation">
            <h3>Our Best Choice for You: ${comparisonData.recommendation.name}</h3>
            <p>
              Based on your profile, we recommend the ${comparisonData.recommendation.name} because:
            </p>
            <ul style="margin-left: 20px; margin-top: 10px; color: #555;">
              <li>✓ Fits your budget of ₹${userProfile.budgetRange?.min || ""}-${userProfile.budgetRange?.max || ""}</li>
              <li>✓ Excellent rating of ${comparisonData.recommendation.rating}/5 from users</li>
              <li>✓ Best value for money among all compared products</li>
              <li>✓ Meets your requirements as a ${userProfile.occupation}</li>
            </ul>
          </div>
        </div>

        <!-- Alternatives Section -->
        ${comparisonData.alternatives && comparisonData.alternatives.length > 0 ? `
          <div class="section">
            <h2>Alternative Options</h2>
            <p>If the recommended product doesn't work for you, consider these alternatives:</p>
            <ul style="margin-left: 20px; margin-top: 10px;">
              ${comparisonData.alternatives.map(alt => `
                <li style="margin-bottom: 8px; color: #555;">
                  <strong>${alt.name}</strong> - ₹${alt.price.toLocaleString()} (Rating: ${alt.rating}/5)
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
          <p>Generated by ShopIQ - Your Personal AI Shopping Companion</p>
          <p>Report Date: ${new Date().toLocaleDateString()}</p>
          <p>For more info, visit shopiq.local</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return reportHTML;
};

// Function to download/print the report
export const downloadPDFReport = (comparisonData, userProfile, filename = "ShopIQ_Report.html") => {
  const htmlContent = generatePDFReport(comparisonData, userProfile);
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to print the report
export const printPDFReport = (comparisonData, userProfile) => {
  const htmlContent = generatePDFReport(comparisonData, userProfile);
  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.print();
};

// Function to email the report (frontend, needs backend to actually send)
export const emailPDFReport = async (comparisonData, userProfile, email) => {
  try {
    const htmlContent = generatePDFReport(comparisonData, userProfile);
    const response = await fetch("http://localhost:5000/api/report/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        html: htmlContent,
        reportData: comparisonData
      })
    });
    return await response.json();
  } catch (error) {
    console.error("Error sending report:", error);
    throw error;
  }
};
