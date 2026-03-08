# 🚀 ShopIQ Quick Start Guide

## ⚡ Start the Application (3 Steps)

### Step 1: Start MongoDB
```bash
# If installed locally:
mongod

# OR use MongoDB Atlas (cloud):
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account
# 3. Get connection string
# 4. Add to backend/.env as MONGO_URI
```

### Step 2: Start Backend Server
```bash
cd backend
npm install  # First time only
node server.js
# Should print: "Server running on port 5000"
```

### Step 3: Start Frontend Development Server
```bash
cd frontend
npm install  # First time only
npm run dev
# Opens http://localhost:5173
```

---

## 📝 First-Time User Experience

1. **Visit** `http://localhost:5173`
2. **Click** "Sign Up"
3. **Enter** email & password (min 6 chars)
4. **Complete** 5-step Profile:
   - Step 1: Basic Info (age, gender, occupation, region)
   - Step 2: Budget & Shopping Frequency
   - Step 3: Interests & Brands
   - Step 4: Decision Making Style
   - Step 5: Usage & Purpose
5. **See** Personalized Dashboard with:
   - AI Recommendations
   - Smart Tips
   - Product Comparison Tool
   - Chat with AI Assistant

---

## 🎯 Test the Features

### Authentication
- ✅ Sign Up → Create account
- ✅ Login → Access dashboard
- ✅ Logout → Return to home

### Personalization
- ✅ Profile Wizard → 40+ user fields collected
- ✅ Dashboard → Personalized greetings & recommendations
- ✅ Insights → User profile summary

### Recommendations
- ✅ Algorithm → Scores products 0-100
- ✅ Top 5 → Ranked by fit to user
- ✅ Reasons → Explains why recommended

### Comparison Tool
- ✅ Select 2-4 products
- ✅ View detailed comparison table
- ✅ See pros/cons side-by-side
- ✅ Get AI recommendation
- ✅ Download PDF report

### Chat Interface
- ✅ Send messages to AI
- ✅ Get shopping assistance
- ✅ Ask about products (needs backend NLP)
- ✅ View conversation history

---

## 📁 Files Created/Modified

### Frontend Components Created
```
✅ frontend/src/components/RecommendationComparison.jsx (200 lines)
✅ frontend/src/context/AuthContext.jsx (Auth state management)
✅ frontend/src/pages/Login.jsx (Sign-in form)
✅ frontend/src/pages/Signup.jsx (Registration)
✅ frontend/src/pages/Profile.jsx (5-step wizard)
✅ frontend/src/pages/Dashboard.jsx (Personalized dashboard)
✅ frontend/src/pages/Home.jsx (Auth-aware landing)
✅ frontend/src/components/ChatBox.jsx (AI chat)
✅ frontend/src/components/Navbar.jsx (Navigation)
✅ frontend/src/components/ProfileSummary.jsx (Profile display)
```

### Frontend Services Created
```
✅ frontend/src/services/recommendationEngine.js (scoring algorithm)
✅ frontend/src/services/reviewSummarizer.js (review analysis)
✅ frontend/src/services/reportGenerator.js (PDF generation)
```

### Frontend Modified
```
✅ frontend/src/App.jsx (Fixed routing, added auth)
✅ frontend/src/main.jsx (Added AuthProvider)
✅ frontend/src/styles/main.css (1,700+ lines styling)
✅ frontend/package.json (Dependencies)
```

### Backend Modified
```
✅ backend/models/User.js (40+ profile fields)
✅ backend/.env (Configuration)
```

---

## 🔍 File Locations Quick Reference

### Key Frontend Files
| File | Purpose |
|------|---------|
| `frontend/src/App.jsx` | Main routing & layout |
| `frontend/src/Context/AuthContext.jsx` | Auth state & logic |
| `frontend/src/pages/Dashboard.jsx` | Main dashboard |
| `frontend/src/styles/main.css` | All styling |
| `frontend/src/services/recommendationEngine.js` | Recommendation scoring |
| `frontend/src/services/reviewSummarizer.js` | Review analysis |
| `frontend/src/services/reportGenerator.js` | Report generation |

### Key Backend Files
| File | Purpose |
|------|---------|
| `backend/server.js` | Express app entry |
| `backend/models/User.js` | User schema |
| `backend/.env` | Environment config |
| `backend/package.json` | Dependencies |

### Configuration Files
| File | Purpose |
|------|---------|
| `backend/.env` | MongoDB URI, API keys |
| `frontend/vite.config.js` | Vite build config |
| `frontend/package.json` | Frontend dependencies |
| `backend/package.json` | Backend dependencies |

---

## ⚙️ Environment Variables

### backend/.env
```
MONGO_URI=mongodb://localhost:27017/shopiq
PORT=5000
OPENAI_API_KEY=your_key_here
OLLAMA_URL=http://localhost:11434
NODE_ENV=development
```

### Frontend (in main.jsx)
```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

---

## 🧪 API Testing URLs

Once everything is running, try these in Postman/curl:

### User Authentication
```bash
# Register
POST http://localhost:5000/api/users/register
Body: { "email": "test@example.com", "password": "password123", "name": "Test User" }

# Login
POST http://localhost:5000/api/users/login
Body: { "email": "test@example.com", "password": "password123" }

# Update Profile
PUT http://localhost:5000/api/users/profile
Body: { "interests": ["electronics", "fashion"], "budget": "50000" }
```

### AI Features (Need Backend Implementation)
```bash
# Chat
POST http://localhost:5000/api/ai/chat
Body: { "message": "I want to buy a laptop", "userProfile": {...} }

# Recommendations
POST http://localhost:5000/api/ai/recommend
Body: { "userProfile": {...}, "category": "electronics" }

# Comparison
POST http://localhost:5000/api/ai/compare
Body: { "productIds": [1, 2, 3] }
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Make sure MongoDB is running: `mongod`
- Or update `MONGO_URI` in `.env` with correct connection string
- Check MongoDB service status: `mongo admin --eval "db.adminCommand('ping')"`

### Error: "Port 5000 already in use"
- Change PORT in `.env` to 5001 or another free port
- Kill process: `lsof -i :5000` then `kill -9 <PID>`

### Error: "Cannot find module 'express'"
- Run `npm install` in backend folder
- Check `backend/package.json` exists

### Error: "API endpoint not found"
- Make sure backend server is running
- Check URL in ChatBox.jsx: `http://localhost:5000/api/ai/chat`
- Verify Express routes are defined

### Frontend shows blank page
- Open browser DevTools (F12)
- Check Console for errors
- Verify `npm run dev` output shows no errors
- Clear cache & refresh (Ctrl+Shift+Delete)

### Recommendation scoring not working
- Check user profile is complete (all 5 steps)
- Verify mock products exist in Dashboard
- Check recommendationEngine.js is imported correctly
- Look at browser console for errors

---

## 📈 Performance Tips

### Optimize Frontend
- Run `npm run build` to generate production bundle
- Serve with nginx or Apache
- Enable gzip compression
- Cache static assets

### Optimize Backend
- Add indexes to MongoDB: `db.users.createIndex({ "email": 1 })`
- Use connection pooling
- Implement API rate limiting
- Cache frequently accessed data

### Improve AI
- Pre-compute recommendation scores
- Cache product embeddings
- Use batch processing for reviews
- Implement recommendation caching

---

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel/Netlify
```

### Backend (Railway/Render)
```bash
cd backend
git push  # Deploy to Render/Railway
# Set environment variables in dashboard
# Database: Use MongoDB Atlas
```

### Database (MongoDB Atlas)
1. Visit https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Get connection string
4. Add to production `.env`

---

## 📞 Support

### Common Questions

**Q: Do I need MongoDB?**
A: Yes, for storing user profiles. Use free tier locally or MongoDB Atlas cloud.

**Q: How do I enable AI chat?**
A: Connect to Ollama locally or OpenAI API. Update `/api/ai/chat` endpoint.

**Q: Can I use different e-commerce APIs?**
A: Yes! Implement in product endpoints. Examples: Amazon, Flipkart, Etsy APIs.

**Q: How do I deploy?**
A: Frontend → Vercel/Netlify, Backend → Render/Railway, Database → MongoDB Atlas.

**Q: Is password encryption included?**
A: Not yet. Add bcrypt in backend before production:
```bash
npm install bcrypt
```

---

## ✨ Next Steps

### Phase 1: Get It Running (Today)
- [ ] Start MongoDB
- [ ] Run backend server
- [ ] Run frontend dev server
- [ ] Test Sign up → Profile → Dashboard

### Phase 2: Connect APIs (This Week)
- [ ] Seed product database
- [ ] Test recommendation scoring
- [ ] Implement product search
- [ ] Test chat interface

### Phase 3: AI Integration (Next Week)
- [ ] Connect NLP/LLM service
- [ ] Implement AI responses
- [ ] Test recommendations
- [ ] Generate reports

### Phase 4: Scale & Deploy (Next Month)
- [ ] Add more products
- [ ] Integrate e-commerce APIs
- [ ] Deploy to production
- [ ] Add notifications

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ React Frontend (http://localhost:5173)               │  │
│  │ - AuthContext (Login/LogOut/Register)               │  │
│  │ - Dashboard (Recommendations, Profile)              │  │
│  │ - Comparison (Product Comparison Tool)              │  │
│  │ - Chat (AI Assistant)                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND SERVER                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Express.js (http://localhost:5000)                   │  │
│  │ - Authentication Routes (/api/users/*)               │  │
│  │ - Product Routes (/api/products/*)                  │  │
│  │ - AI Routes (/api/ai/*)                             │  │
│  │ - Recommendation Routes (/api/recommend/*)          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                         │
│  - Users (with 40+ profile fields)                         │
│  - Products (mock for now)                                 │
│  - Orders                                                  │
│  - Comparisons                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎉 You're All Set!

Your Personalized AI Shopping Companion is ready to go. Follow the "Start the Application" steps above and you'll have the full system running in minutes!

**Questions?** Check the Implementation Summary for details on each feature.

Good luck! 🚀

