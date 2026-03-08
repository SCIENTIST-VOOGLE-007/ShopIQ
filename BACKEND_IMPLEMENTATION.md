# Backend Implementation Checklist

## 📋 Current Status
- ✅ Express server structure created
- ✅ User model with 40+ fields defined
- ✅ MongoDB configuration in .env
- ⏳ API endpoints need completion
- ⏳ Authentication logic needs implementation
- ⏳ Recommendation engine backend needs implementation

---

## 🔧 Complete These Tasks to Get Backend Fully Working

### 1. User Authentication Endpoints ⚠️ PRIORITY 1

**File**: `backend/controllers/userController.js`

```javascript
// Register endpoint
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ message: "Invalid input" });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Hash password (install bcrypt: npm install bcrypt)
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profile: {
        completionPercentage: 10
      }
    });
    
    await user.save();
    
    res.status(201).json({ 
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login endpoint
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    // Compare password
    const bcrypt = require('bcrypt');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    
    // Generate JWT (install jsonwebtoken: npm install jsonwebtoken)
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({ 
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        shoppingHistory: user.shoppingHistory
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile endpoint
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT middleware
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $set: {
          "profile": updates.profile,
          "preferences": updates.preferences
        }
      },
      { new: true }
    );
    
    res.json({ 
      message: "Profile updated",
      user 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

**Routes**: `backend/routes/userRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/profile', authenticateToken, userController.updateProfile);

module.exports = router;
```

---

### 2. Product Endpoints ⚠️ PRIORITY 2

**File**: `backend/controllers/productController.js`

```javascript
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query).limit(50);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to search history
exports.recordSearch = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query, category } = req.body;
    
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          "shoppingHistory.recentSearches": {
            query,
            category,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );
    
    res.json({ message: "Search recorded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

### 3. AI/Recommendation Endpoints ⚠️ PRIORITY 3

**File**: `backend/controllers/aiController.js`

```javascript
const { generateRecommendations } = require('../services/recommendationService');

// Get recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category } = req.body;
    
    const user = await User.findById(userId);
    
    // Get products from database
    const products = await Product.find({ 
      category: category || { $exists: true }
    }).limit(20);
    
    // Use the recommendation engine
    const recommendations = generateRecommendations(user, products);
    
    res.json({
      recommendations,
      userFit: {
        budget: user.profile.budget,
        interests: user.profile.interests,
        confusionLevel: user.profile.confusionLevel
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chat with AI
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    
    // TODO: Connect to NLP service (Ollama or OpenAI)
    // For now, return mock response
    const response = `I understand you're looking for help with "${message}". 
                      Based on your profile, I recommend checking our personalized recommendations.
                      Would you like to compare specific products?`;
    
    res.json({ 
      response,
      suggestions: ["Compare products", "View recommendations", "Save for later"]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Compare products
exports.compareProducts = async (req, res) => {
  try {
    const { productIds } = req.body;
    
    const products = await Product.find({ _id: { $in: productIds } });
    
    // Generate comparison data
    const comparison = {
      products,
      specs: generateComparisonTable(products),
      recommendation: selectBestProduct(products, req.user.id)
    };
    
    res.json(comparison);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

### 4. Install Required Packages

```bash
cd backend
npm install bcryptjs jsonwebtoken cors dotenv mongoose
```

**Update `backend/package.json`:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

---

### 5. Create Middleware for Authentication

**File**: `backend/middleware/auth.js`

```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
```

---

### 6. Update Server Entry Point

**File**: `backend/server.js`

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopiq')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### 7. Seed Sample Products

**File**: `backend/scripts/seedProducts.js`

```javascript
const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "MacBook Air M2",
    brand: "Apple",
    price: 89990,
    category: "Electronics",
    rating: 4.8,
    reviews: 1250,
    specs: { RAM: "8GB", Storage: "256GB", Processor: "M2" },
    description: "Lightweight laptop with excellent performance",
    durability: "High",
    isLocal: false,
    isSustainable: true
  },
  {
    name: "Dell XPS 13",
    brand: "Dell",
    price: 79990,
    category: "Electronics",
    rating: 4.6,
    reviews: 980,
    specs: { RAM: "8GB", Storage: "512GB", Processor: "Intel i5" },
    description: "Powerful laptop with great warranty",
    durability: "High",
    isLocal: false
  },
  // Add more products...
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.insertMany(sampleProducts);
    console.log('Products seeded successfully');
    process.exit();
  })
  .catch(err => console.log(err));
```

**Run seeding:**
```bash
node backend/scripts/seedProducts.js
```

---

### 8. Update Frontend API Calls

**File**: `frontend/src/services/api.js` (CREATE NEW FILE)

```javascript
const API_BASE_URL = "http://localhost:5000/api";

export const registerUser = async (email, password, name) => {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const updateUserProfile = async (token, profileData) => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  return response.json();
};

export const getRecommendations = async (token, category) => {
  const response = await fetch(`${API_BASE_URL}/ai/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ category })
  });
  return response.json();
};

export const searchProducts = async (query, minPrice, maxPrice) => {
  const params = new URLSearchParams({ query, minPrice, maxPrice });
  const response = await fetch(`${API_BASE_URL}/products/search?${params}`);
  return response.json();
};

export const chatWithAI = async (token, message) => {
  const response = await fetch(`${API_BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });
  return response.json();
};
```

---

### 9. Connect Frontend to Backend

**Update `frontend/src/context/AuthContext.jsx`:**

```javascript
import { createContext, useState, useEffect } from 'react';
import * as api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.registerUser(email, password, name);
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.loginUser(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setToken(response.token);
        setUser(response.user);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.updateUserProfile(token, profileData);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🚀 Implementation Order

1. **[ ] Install packages** - `npm install` in backend
2. **[ ] Create auth middleware** - Copy `backend/middleware/auth.js`
3. **[ ] Implement user controller** - Copy code from section 1
4. **[ ] Create routes** - Setup user, product, AI routes
5. **[ ] Create Product model** - Define schema like User model
6. **[ ] Seed products** - Run `seedProducts.js`
7. **[ ] Test with Postman** - Verify endpoints work
8. **[ ] Update .env** - Add JWT_SECRET
9. **[ ] Update frontend API** - Create `api.js` service
10. **[ ] Test frontend-backend flow** - Full signup → login → recommendations

---

## ✅ Verification Checklist

After implementing, verify:

- [ ] Backend starts without errors: `node server.js`
- [ ] MongoDB connection successful
- [ ] Can register new user via POST `/api/users/register`
- [ ] Can login via POST `/api/users/login`
- [ ] Can access protected routes with token
- [ ] Can get products via GET `/api/products`
- [ ] Can get recommendations via POST `/api/ai/recommendations`
- [ ] Frontend login works with backend
- [ ] Profile updates persist to database
- [ ] Chat messages send to backend

---

## 📝 Notes

- Passwords are NOT encrypted yet - add bcrypt first!
- JWT tokens expire after 7 days - adjust as needed
- CORS is enabled - restrict to frontend domain in production
- Error handling is basic - improve for production
- No input validation - add validation library (joi, yup)

**Total estimated implementation time: 4-6 hours**

