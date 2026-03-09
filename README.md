# ShopIQ  
### Next-Gen AI-Powered E-Commerce Discovery Platform

<p align="center">

![AI](https://img.shields.io/badge/AI-Powered-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node](https://img.shields.io/badge/Backend-Node.js-339933)
![Python](https://img.shields.io/badge/AI-Engine-Python-yellow)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![FAISS](https://img.shields.io/badge/VectorSearch-FAISS-orange)
![Ollama](https://img.shields.io/badge/LLM-Ollama-black)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

</p>

<p align="center">
An intelligent AI shopping companion that transforms online shopping  
from endless searching into confident decision-making.
</p>

---

# Table of Contents

- Overview
- Problem
- Solution
- Key Features
- Architecture
- Technology Stack
- AI Capabilities
- Data Pipeline
- Project Structure
- Installation
- Usage
- Screenshots
- Future Roadmap
- Contributors
- License

---

# Overview

**ShopIQ** is a next-generation AI-powered e-commerce discovery platform designed to simplify online shopping decisions.

Instead of manually browsing products, comparing specifications, and reading thousands of reviews, users interact with an **AI shopping companion** that understands their needs and recommends the most suitable products.

The system combines **LLMs, semantic search, review intelligence, and recommendation systems** to provide explainable and personalized shopping decisions.

---

# Problem

Modern e-commerce platforms create several challenges:

• Too many product choices leading to **decision fatigue**  
• **Generic recommendations** that ignore personal context  
• Manual **product comparison across multiple tabs**  
• Thousands of **unstructured reviews**  
• Technical specs that **non-experts cannot interpret**  
• Difficulty **sharing product decisions** with friends or family  
• **Local sellers buried under large brands**

Current systems are **search-centric** instead of **decision-centric**.

---

# Solution

ShopIQ introduces a **Personal AI Shopping Companion**.

Users simply describe their requirement:

```
"I need a laptop under ₹70,000 for college that will last 4 years."
```

The AI system then:

• Understands the **user’s context and intent**  
• Retrieves **relevant products** using semantic search  
• Performs **intelligent product comparisons**  
• Converts complex specifications into **human explanations**  
• Summarizes **thousands of product reviews**  
• Generates **shareable decision reports**

The result is **clear, personalized product recommendations**.

---

# Key Features

## Conversational Shopping

Users interact naturally:

```
"I'm a student who codes sometimes and needs long battery life."
```

The AI understands the request and provides **context-aware recommendations**.

---

## Personalized Recommendation Engine

ShopIQ recommends **best-fit products**, not just best-selling ones.

It evaluates:

• User needs  
• Budget constraints  
• Product longevity  
• Review sentiment  
• Real-world usability

---

## Intelligent Product Comparison

ShopIQ compares relevant products and explains the differences in simple language.

Example explanation:

```
Laptop A has higher processing power but the difference will not be noticeable for coding tasks.

Laptop B has slightly lower performance but significantly better battery life for daily campus usage.
```

---

## Review Intelligence

Instead of dumping thousands of reviews, ShopIQ:

• Detects common complaints  
• Identifies genuine long-term issues  
• Flags deal breakers  
• Highlights most praised features

Users understand product reputation **within seconds**.

---

## Downloadable Decision Reports

ShopIQ generates **structured PDF reports** including:

• User requirement summary  
• Compared products  
• Personalized pros and cons  
• Review insights  
• Final AI recommendation

These reports can be shared with:

• Parents  
• Friends  
• Mentors  
• Colleagues

---

## Cart & Order Assistance

ShopIQ helps users:

• Organize carts  
• Track abandoned items  
• Monitor price changes  
• Manage order updates

It acts as a **smart shopping assistant** across the purchase journey.

---

## Discover Local & Small Sellers

The platform intelligently surfaces **relevant local or regional sellers**, enabling:

• discovery beyond big brands  
• faster deliveries  
• support for local businesses

---

# System Architecture

```
                ┌────────────────────┐
                │    User Interface  │
                │      React App     │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │    Node.js API     │
                │      Express       │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │     AI Engine      │
                │   Python + Flask   │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Semantic Search    │
                │       FAISS        │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │   Local LLM Model  │
                │      Ollama        │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │      MongoDB       │
                │    Data Storage    │
                └────────────────────┘
```

---

# Technology Stack

## Frontend

- React
- Vite
- React Router
- Axios
- JavaScript (ES6)

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## AI / Machine Learning

- Python
- Flask
- Sentence Transformers
- FAISS Vector Search
- Scikit-Learn
- NumPy
- Pandas

---

## LLM Runtime

- Ollama

Supported models:

- TinyLlama
- Llama 3
- Phi-3
- Mistral

Embedding model:

- Nomic Embed Text

---

# Data Sources

ShopIQ uses multiple large-scale e-commerce datasets:

• Amazon Reviews Dataset  
• Brazilian E-commerce Dataset (Olist)  
• Instacart Dataset  
• RetailRocket Dataset  

These datasets power the **recommendation system and review intelligence module**.

---

# AI Capabilities

ShopIQ integrates several AI modules:

• Conversational shopping assistant  
• Semantic product search  
• Intelligent comparison engine  
• Review summarization  
• Recommendation system  
• PDF report generator  
• Dynamic user profiling  

All AI inference runs **locally using Ollama**, eliminating external API costs.

---

# Data Processing Pipeline

```
Raw Datasets
      │
      ▼
Data Cleaning
      │
      ▼
Dataset Normalization
      │
      ▼
Unified Product Dataset
      │
      ▼
Embedding Generation
      │
      ▼
FAISS Vector Index
```

This pipeline enables **fast semantic product discovery across millions of items**.

---

# Project Structure

```
ShopIQ
│
├── frontend
│   ├── React UI
│   └── Product discovery interface
│
├── backend
│   ├── Express APIs
│   ├── Authentication
│   └── Business logic
│
├── ai-engine
│   ├── AI modules
│   ├── recommendation system
│   ├── comparison engine
│   └── review summarizer
│
├── datasets
│   └── cleaned product datasets
│
└── scripts
    └── ETL and preprocessing
```

---

# Installation

## Clone the repository

```
git clone https://github.com/SCIENTIST-VOOGLE-007/ShopIQ.git
cd ShopIQ
```

---

## Start Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

## Start Backend

```
cd backend
npm install
npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

## Start AI Engine

```
cd ai-engine
python -m venv venv
pip install -r requirements.txt
python app.py
```

AI engine runs at

```
http://localhost:5001
```

---

## Install Ollama Models

```
ollama pull tinyllama
ollama pull nomic-embed-text
```

Ollama runs at

```
http://localhost:11434
```

---

# Screenshots

Add screenshots of your platform here.

Example sections:

```
Homepage Interface
AI Chat Shopping Assistant
Product Comparison Dashboard
PDF Report Generation
```

---

# Future Roadmap

• Voice-based AI shopping assistant  
• Mobile application  
• Browser extension for shopping sites  
• Multi-language support  
• Real-time price tracking  
• Reinforcement learning personalization  

---

# Contributors

Built with passion by the **ShopIQ Team**

---

# License

This project is licensed under the **MIT License**

---

<p align="center">
Shop smarter. Decide faster. ShopIQ.
</p>
