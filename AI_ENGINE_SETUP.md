# 🤖 ShopIQ AI Engine Setup Guide

The AI assistant, comparison engine, and report generator require the Python AI Engine to be running. Here's how to set everything up.

---

## 📋 Prerequisites

- **Python 3.8+** (with `pip`)
- **Ollama** with `llama3` model (for intelligent responses)
- **Node.js** (backend already running on port 5000)

---

## 🚀 Step 1: Install Ollama (Optional but Recommended)

For the most intelligent AI responses, install Ollama:

1. **Download Ollama** from [ollama.ai](https://ollama.ai)
2. **Install and run Ollama**
3. **Pull the llama3 model:**
   ```bash
   ollama pull llama3
   ```
4. **Keep Ollama running** (it will listen on `localhost:11434`)

> **Without Ollama**: The system will still work but with minimal AI capabilities. You can use mock responses or integrate a different LLM.

---

## ⚙️ Step 2: Set Up Python AI Engine

### 2a. Create & Activate Virtual Environment

```bash
# From shopiq directory
cd ai-engine
python -m venv venv

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# On macOS/Linux:
source venv/bin/activate
```

### 2b. Install Required Packages

```bash
pip install -r requirements.txt
```

**If `requirements.txt` doesn't exist**, install these packages:

```bash
pip install flask
pip install flask-cors
pip install pandas
pip install numpy
pip install faiss-cpu
pip install requests
pip install python-dotenv
```

### 2c. Verify Data & Models Are Ready

The system needs:
- ✅ Cleaned dataset: `ai-engine/data/cleaned/` (must exist with CSV files)
- ✅ Merged dataset: `ai-engine/data/merged/unified_products.csv`
- ✅ FAISS index: `ai-engine/vectorstore/product_index.faiss`
- ✅ Embeddings: `ai-engine/vectorstore/product_embeddings.npy`

If these don't exist, build them:

```bash
# From shopiq root directory
python scripts/run_cleaning.py
python scripts/build_embeddings.py
```

---

## 🌐 Step 3: Start the AI Engine API

```bash
# From ai-engine directory (with venv activated)
python api.py
```

**Expected output:**
```
🚀 Starting ShopIQ AI Engine API...
✓ Loaded 1000 products from dataset
✓ Loaded FAISS index
✓ Loaded 1000 embeddings
✓ Ollama client initialized

✓ AI Engine ready on http://localhost:5001
  - POST /chat - Chat with AI assistant
  - POST /recommend - Get recommendations
  - POST /compare - Compare products
  - POST /reviews - Summarize reviews
  - POST /report - Generate report
  - GET /health - Check status
```

---

## ✅ Step 4: Start the Full System

### Terminal 1: Backend (Node.js)
```bash
cd backend
npm run server
```

### Terminal 2: Frontend (React/Vite)
```bash
cd frontend
npm run dev
```

### Terminal 3: AI Engine (Python)
```bash
cd ai-engine
source venv/bin/activate  # or .\venv\Scripts\Activate.ps1 on Windows
python api.py
```

### Terminal 4 (Optional): Ollama
```bash
ollama serve
```

---

## 🧪 Testing the AI

### 1. Chat with Assistant
Visit `http://localhost:3000/` → **Assistant** tab
- Type: "I need a laptop under 50000"
- Expected: AI understands your query, finds relevant products

### 2. Check API Health
```bash
curl http://localhost:5001/health
```

---

## 🐛 Troubleshooting

### "AI Engine not available"
**Problem**: ChatBox shows "Make sure Python AI engine is running"

**Solutions**:
1. Verify Python API is running on `http://localhost:5001`:
   ```bash
   curl http://localhost:5001/health
   ```
2. Check backend logs for connection errors
3. Restart both backend and AI engine

### "Ollama not found"
**Problem**: Responses mention Ollama unavailable

**Solutions**:
1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull llama3: `ollama pull llama3`
3. Keep ollama running: `ollama serve`
4. Verify on `localhost:11434`:
   ```bash
   curl http://localhost:11434/api/generate -d {"model":"llama3","prompt":"test"}
   ```

### "FAISS index not found"
**Problem**: Python API fails to load

**Solutions**:
1. Build embeddings: `python scripts/build_embeddings.py`
2. Verify files exist in `ai-engine/vectorstore/`

### "Dataset not found"
**Problem**: Error loading products

**Solutions**:
1. Run data cleaning: `python scripts/run_cleaning.py`
2. Verify CSV files in `ai-engine/data/merged/`

---

## 📊 What Each Component Does

| Component | Port | Function |
|-----------|------|----------|
| **Frontend** (React) | 3000 | User interface |
| **Backend** (Node.js) | 5000 | API, auth, routes |
| **AI Engine** (Python) | 5001 | Recommendations, chat, analysis |
| **Ollama** (LLM) | 11434 | Language model inference |

---

## 🎯 Current AI Features

✅ **Chat**: Talk to ShopIQ assistant  
✅ **Recommendations**: Get personalized product suggestions  
✅ **Comparison**: Compare products based on profile  
✅ **Review Analysis**: Summarize customer reviews  
✅ **Report Generation**: Create detailed comparison reports  

⏳ **Coming Soon**:
- Voice input (Web Speech API)
- Cross-platform order tracking
- Real-time price updates
- Advanced filtering

---

## 📝 Notes

- The AI engine runs on a **separate process** from the backend for independence and scalability
- If Ollama isn't available, the system will use fallback responses
- The FAISS vector store uses pre-built embeddings (not real-time generation for performance)
- All cleaned datasets are merged into `unified_products.csv` for quick lookups

---

## 🤝 Need Help?

If the AI isn't working:
1. Check all 3 services are running (frontend, backend, AI engine)
2. Check browser console for errors
3. Check backend logs: `npm run server`
4. Check AI engine logs: `python api.py`
5. Verify no port conflicts (3000, 5000, 5001)
