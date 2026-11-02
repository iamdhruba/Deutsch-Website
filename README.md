# Lernen — The 100% Free Open German Learning Platform

**Lernen** is a 100% free, open-source, full-spectrum German learning platform from CEFR **A1 to C2**. It combines a Vocabeo-style frequency dictionary + FSRS spaced-repetition trainer with a comprehensive grammar center, authentic listening, reading, speaking, writing feedback, and Goethe/telc exam preparation.

---

## 🌟 Core Principles & Rules
- **100% Free for Everyone**: No paywalls, no subscriptions, no ads, no locked content, and no paid APIs.
- **Plain JavaScript**: Simple, readable, well-commented code throughout (no TypeScript).
- **Open-Source Data**: Wiktionary / Kaikki.org (CC BY-SA), Tatoeba (CC BY), Leipzig Corpora (Academic / CC BY-NC), OpenThesaurus (LGPL / CC BY-SA), Common Voice (CC0 / CC BY-SA), and FSRS (MIT).
- **Internationalized Data Structure**: Every word and content record strictly has a `language` field (default: `'de'`) to support other target languages in the future.
- **Selectable UI Interface**: English by default, architected for German, Spanish, French, and beyond.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + React Router + Tailwind CSS + Lucide React + Recharts
- **Backend**: Node.js + Express.js REST API
- **Database**: MongoDB + Mongoose (MongoDB Atlas free tier M0 or local / in-memory fallback)
- **Auth**: Email + password, bcryptjs, JWT stored in secure `httpOnly` cookies
- **Spaced Repetition**: FSRS algorithm (Free Spaced Repetition Scheduler, same as Anki 23+)
- **Audio & Speech**: Browser-native Web Speech API (`de-DE`) for text-to-speech pronunciation & speech recognition

---

## 📁 Project Directory Structure
```
d:/NEW SWE/Deutsch Lernen/
├── package.json              # Root orchestration scripts
├── .env.example              # Root environment template
├── README.md                 # Complete documentation & setup guide
├── content/
│   ├── licenses.json         # Complete licenses & attribution catalog
│   └── grammar/              # Original lesson content
├── server/
│   ├── package.json          # Express server dependencies
│   ├── .env.example          # Server environment template
│   ├── index.js              # Express app entry point & auto-seed
│   ├── config/
│   │   └── db.js             # Mongoose connection with in-memory fallback
│   ├── models/               # 16 Mongoose Schemas (Word, User, GrammarTopic, etc.)
│   │   ├── User.js
│   │   ├── Word.js
│   │   ├── Sense.js
│   │   ├── ExampleSentence.js
│   │   ├── GrammarTopic.js
│   │   ├── Exercise.js
│   │   ├── Unit.js
│   │   ├── Lesson.js
│   │   ├── ReadingText.js
│   │   ├── ListeningClip.js
│   │   ├── UserProgress.js
│   │   ├── UserWord.js
│   │   ├── ReviewLog.js
│   │   ├── MistakeLog.js
│   │   ├── TestAttempt.js
│   │   ├── Achievement.js
│   │   └── index.js
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT cookie & header verification
│   │   └── errorMiddleware.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── wordController.js
│   │   └── grammarController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── wordRoutes.js
│   │   └── grammarRoutes.js
│   └── seed/
│       ├── sampleWords.js    # 100 sample German words with inflections & Tatoeba examples
│       ├── sampleGrammar.js  # 3 complete grammar topics with interactive exercises
│       └── seed.js           # Database seeder with demo account
└── client/
    ├── package.json          # React dependencies
    ├── vite.config.js        # Vite config with /api proxy
    ├── tailwind.config.js    # Custom theme: der (blue), die (red), das (green), cases
    ├── index.html            # SEO metadata & favicon
    └── src/
        ├── index.css         # Design system & font scale tokens
        ├── main.jsx          # React DOM root
        ├── App.jsx           # App routes & layout shell
        ├── context/
        │   ├── AuthContext.jsx   # Auth state, login, register, demo user
        │   └── ThemeContext.jsx  # Dark/Light mode, dyslexia font, text scale
        ├── components/
        │   ├── Navbar.jsx        # Responsive navigation with settings & user badge
        │   ├── Footer.jsx        # Manifesto, credits, open-source links
        │   ├── AuthModal.jsx     # Tabbed auth modal with 1-click demo login
        │   └── UI/
        │       ├── Button.jsx    # Custom button variants
        │       └── Badge.jsx     # Gender & CEFR badge variants
        ├── pages/
        │   ├── HomePage.jsx        # Landing hero, live search teaser, feature grid
        │   ├── DictionaryPage.jsx  # Frequency table with Tatoeba examples
        │   ├── GrammarPage.jsx     # Color-coded grammar topics & cheat sheets
        │   ├── LearnPage.jsx       # Vocabulary trainer queue preview
        │   ├── CoursePage.jsx      # A1-C2 curriculum roadmap
        │   ├── StatsPage.jsx       # Study analytics dashboard preview
        │   ├── AttributionPage.jsx # Full license attributions & dataset downloads
        │   └── NotFoundPage.jsx
        └── services/
            └── api.js              # Native fetch client with credentials: include
```

---

## 🚀 Step-by-Step Local Setup

### 1. Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm (v9+)

### 2. Install Dependencies
Run the install command in both client and server:
```bash
# In project root:
npm run install:all
```
*(Or manually run `npm install` in root, `/server`, and `/client`)*

### 3. Configure Environment Variables
Copy `.env.example` in `/server`:
```bash
cp server/.env.example server/.env
```
Default `.env` configuration:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lernen
JWT_SECRET=your_jwt_secret_change_in_production
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
> **Note on Database**: If you do not have MongoDB running locally or an Atlas connection string, Lernen will **automatically spin up an in-memory MongoDB instance** and auto-seed it on startup! You can also connect to any free MongoDB Atlas cluster by setting `MONGODB_URI`.

### 4. Seed the Database
Populate the database with the initial 100 frequency words, 3 complete grammar topics, exercises, and the demo learner account:
```bash
npm run seed
```
**Demo Account Credentials**:
- **Email**: `demo@lernen.org`
- **Password**: `Lernen123!`
*(Or use the instant **"1-Click Demo Account"** button in the Sign In modal)*

### 5. Run the Application
Start both the Express backend and React Vite client concurrently:
```bash
npm run dev
```
- **Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`

---

## ☁️ Free Tier Deployment Guide

### Client (Vercel / Netlify)
1. Push the repository to GitHub.
2. Create a new project on **Vercel** or **Netlify**.
3. Set **Root Directory** to `client`.
4. Build command: `npm run build`, Output directory: `dist`.
5. Set environment variable: `VITE_API_URL=https://your-server-app.onrender.com/api`.

### Server (Render.com Free Tier)
1. In Render dashboard, click **New > Web Service**.
2. Connect your GitHub repository.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`.
5. Start Command: `npm start`.
6. Environment Variables:
   - `PORT=5000`
   - `MONGODB_URI=mongodb+srv://...` (your free MongoDB Atlas M0 cluster)
   - `JWT_SECRET=your_production_secure_secret`
   - `CLIENT_URL=https://your-client-app.vercel.app`
   - `NODE_ENV=production`

### Database (MongoDB Atlas Free Tier M0)
1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a free M0 cluster.
3. Add a database user with read/write privileges.
4. In **Network Access**, allow access from anywhere (`0.0.0.0/0`) or your Render outgoing IPs.
5. Copy the connection string to `MONGODB_URI`.

---

## 📚 Build Phases Roadmap
- [x] **Phase 1**: Project setup, MongoDB models (16 schemas), auth system (bcrypt + JWT in httpOnly cookie), seed script (100 words, 3 grammar topics), basic layout, responsive navbar, dark/light theme, and attribution page.
- [ ] **Phase 2**: Dictionary + Vocabulary Trainer with FSRS algorithm, exercises, audio, and leech detection.
- [ ] **Phase 3**: Grammar Center (first 15 topics + interactive exercise engine).
- [ ] **Phase 4**: Learning Path A1-A2 with units + adaptive placement test.
- [ ] **Phase 5**: Stats dashboard + Recharts visualizations + dedicated Mistakes Notebook.
- [ ] **Phase 6**: Graded reading & listening comprehension modules.
- [ ] **Phase 7**: Speaking & writing with LanguageTool feedback.
- [ ] **Phase 8**: Remaining grammar topics and B1-C2 curriculum path.
- [ ] **Phase 9**: Exam preparation (Goethe/telc/ÖSD/TestDaF styles), culture, learn-from-text, import/export, PWA, and final polish.
