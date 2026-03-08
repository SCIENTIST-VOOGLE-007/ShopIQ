# 🚀 Getting ShopIQ Working - Quick Start

## The Problem
- AI assistant was just echoing (placeholder)
- Comparisons weren't working
- Voice was missing
- Cleaned dataset wasn't being used

## What Was Fixed
- ✅ Connected backend to Python AI Engine
- ✅ Integrated FAISS vector search with product data
- ✅ Added Ollama (llama3) for intelligent responses
- ✅ Enhanced recommendation scoring based on user profile
- ✅ Improved comparison analysis
- ✅ Set up modular Python API
- ✅ Voice UI ready (needs Web Speech API)

---

## ⚡ Get It Running in 3 Steps

### Step 1: Install Python Dependencies
```bash
cd shopiq
pip install -r requirements.txt
```

### Step 2: Start All Services
**Windows (Easiest):**
```bash
# Double-click: START_SHOPIQ.bat
```

**Manual (All Platforms):**
```bash
# Terminal 1
cd backend
npm run server

# Terminal 2
cd frontend
npm run dev

# Terminal 3
cd ai-engine
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
python api.py
```

### Step 3: Try It Out
1. Open http://localhost:3000
2. Login/Signup
3. Complete your profile (interests, budget, etc.)
4. Go to **Assistant** tab
5. Type: "I need a laptop"
6. AI returns personalized recommendations!

---

## 🔧 Optional: Enable Better AI Responses

### Install Ollama (Recommended)
For intelligent AI responses, install Ollama:

1. Download from [ollama.ai](https://ollama.ai)
2. Run: `ollama pull llama3`
3. Keep running: `ollama serve` (or let it run in background)

**Without Ollama**: AI still works with simpler fallback responses.

---

## 📋 What Works Now

| Feature | Status | How to Use |
|---------|--------|-----------|
| Chat Assistant | ✅ Live | Go to Assistant tab, type queries |
| Recommendations | ✅ Live | Assistant shows matching products |
| Comparison | ✅ Ready | Backend supports `/api/ai/compare` |
| Reviews Analysis | ✅ Ready | Backend supports `/api/ai/reviews` |
| Reports | ✅ Ready | Backend supports `/api/ai/report` |
| Voice Input | ⏳ UI Ready | Click 🎤 (browser speech needed) |

---

## 🧪 Quick Test

```bash
# Test if AI Engine is running
curl http://localhost:5001/health

# Expected response:
# {"api":"ready","dataset_loaded":true,"faiss_loaded":true,"embeddings_loaded":true,"ollama_available":true}
```

---

## 📂 Main Files Created/Modified

**Python AI Engine:**
- `ai-engine/api.py` - Flask API that powers recommendations
- `ai-engine/modules/recommender.py` - Scoring algorithm
- `ai-engine/modules/report_generator.py` - Report generation

**Backend:**
- `backend/controllers/aiController.js` - Calls Python API
- `backend/routes/aiRoutes.js` - New endpoints

**Frontend:**
- `frontend/src/components/ChatBox.jsx` - Shows recommendations properly
- `frontend/src/services/api.js` - Passes profile to AI

**Startup Scripts:**
- `START_SHOPIQ.bat` - One-click startup for Windows
- `AI_ENGINE_SETUP.md` - Detailed setup guide
- `AI_INTEGRATION_SUMMARY.md` - Architecture & details

---

## 🎯 How the AI Works

1. **You ask**: "I need a phone under 30000 for gaming"
2. **Frontend** sends: message + your profile (budget, interests)
3. **Backend** calls Python API on port 5001
4. **Python API**:
   - Finds products using FAISS vector search
   - Scores them based on your budget, interests, rating
   - Calls Ollama to generate explanation
5. **Frontend** shows: AI response + 3 best products + suggestions

---

## 🎤 About Voice

**Status**: UI ready, needs implementation

To add voice:
```javascript
// In ChatBox, when user clicks 🎤:
const recognition = new webkitSpeechRecognition();
recognition.onstart = () => { /* listening */ };
recognition.onresult = (event) => {
  const userSaid = event.results[0][0].transcript;
  // Send like normal message
  sendMessage({ text: userSaid });
};
```

This is frontend-only, no backend changes needed.

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| "AI Engine not available" | Run `python ai-engine/api.py` in new terminal |
| Port 5001 already in use | Kill other Python process on that port |
| Ollama error | Install Ollama or AI uses fallback responses |
| FAISS index not found | Run `python scripts/build_embeddings.py` |
| "Cannot find module" | Run `pip install -r requirements.txt` |

---

## 📚 Documentation

- **Full Setup**: See `AI_ENGINE_SETUP.md`
- **Architecture**: See `AI_INTEGRATION_SUMMARY.md`
- **This File**: Quick reference

---

## 🎉 You're All Set!

Your ShopIQ AI is now:
- **Smart** (uses Ollama + vector search)
- **Fast** (FAISS indexing)
- **Personalized** (based on your profile)
- **Modular** (backend + Python + frontend work independently)

**Next time**, just run `START_SHOPIQ.bat` and start using it! 🚀

For questions, check `AI_ENGINE_SETUP.md` → **Troubleshooting** section.
