# 🌱 Okuani Adamfo: Hyper-Localized Agricultural Disease and Pest Identifier

## 📌 Problem Statement

Smallholder farmers in Ghana face serious challenges in identifying and managing crop diseases and pests due to limited access to agricultural experts and language barriers. Most existing solutions require fluency in English, excluding many farmers who speak Twi, Ewe, Ga, and other Ghanaian languages. This leads to late diagnoses, crop losses, and reduced yields.

## 🌍 Context and Background

With climate change intensifying and food demand rising, maintaining crop health is more crucial than ever. Agriculture employs over 50% of Ghana’s workforce, and up to 40% of crops are lost to pests and diseases annually. Existing tools exclude farmers without literacy or digital access in English — threatening food security and the achievement of SDG Goal 2 (Zero Hunger).

## 🎯 Scope

This solution is focused solely on **disease and pest identification and diagnosis** — via **voice input in local languages** and **image recognition** of affected crops. It does not cover general farming advice, crop pricing, or logistics.

---

## 💡 Solution Overview

Okuani Adamfo allows smallholder farmers to:

- **Speak symptoms** in their local language (Twi, Ewe, Ga)
- **Upload images** of diseased crops
- Receive a **diagnosis and treatment advice** — in their native language, as **text and speech**

This tool combines **speech recognition**, **NLP**, and **computer vision** to improve early intervention and reduce crop loss.

---

## ✨ Key Features

- 🎙 **Voice Input** – Record symptoms in Twi, Ewe, or Ga
- 🖼 **Image Upload** – Send crop photos for visual analysis
- 🔍 **Multi-Modal Diagnosis** – Combines voice and image to improve accuracy
- 🗣 **Localized Output** – Responds in the user’s local language via **text and audio**
- 📱 **Mobile-Friendly UI** – Simple interface for non-technical and low-literacy users

---

## 🔬 Technical Architecture

| Component          | Technology                     |
|--------------------|---------------------------------|
| Frontend UI        | React                           |
| Backend API        | Node.js, Express.js             |
| Database           | MongoDB                         |
| AI/ML              | Ghana NLP API (ASR, NLP, TTS), Crop Disease Image Classifier |
| Hosting (optional) | Vercel / Render / Heroku        |

---

## 🚀 Development Phases

### **Phase 1: Planning & Setup (May 19–20)**
- Team organization and role definition
- GitHub repo setup, environment config
- Initial research and data gathering

### **Phase 2: Core Feature Development (May 21–24)**
- 🔊 Voice input + ASR integration
- 🧠 NLP symptom classification
- 🖼 Crop image recognition (pre-trained model)
- 🔗 Merge multi-modal inputs for diagnosis

### **Phase 3: Output & Localization (May 24–25)**
- Translate outputs via Ghana NLP
- Generate voice feedback using TTS

### **Phase 4: UI & User Experience (May 21–26)**
- Voice record button
- Image upload UI
- Result display (text/audio)
- Accessibility features (icons, audio prompts)

### **Phase 5: Testing & Feedback (May 26–27)**
- Test input combinations (voice-only, image-only, both)
- Cross-device testing
- Farmer feedback if possible

### **Phase 6: Final Polish & Presentation (May 28)**
- UI finalization, speed tuning
- Presentation slide deck + demo
- Video walkthrough (if applicable)

---

## 📊 Impact Goals

- ✅ Reduce crop misdiagnosis
- 📈 Boost farmer yield and food security
- 🧠 Empower non-literate farmers with voice-first tools
- 🌍 Contribute toward SDG 2: Zero Hunger

---

## 👥 Team

| Name                  | Role                                 |
|-----------------------|--------------------------------------|
| Emmanuella B. Afoakwah | Frontend Developer / AI Integrations |
| Busola Tom       | Backend Developer / Project Manager |
| Dan Sidsaya           | Full Stack Developer / Team Lead     |

---

## 🔧 Setup Instructions

To run locally:

```bash
# Clone the repo
git clone https://github.com/AkuaAdanfu/okuaniadamfo.git

# Backend setup
cd akuaadanfu-api
npm install
npm start

# Frontend setup
cd akuaadanfu-app
npm install
npm start
