# PC Station 🚀

PC Station is a premium, full-stack custom PC configurator web application. It allows users to visually select, compare, and verify the compatibility of various PC components, review a dynamically generated Build Intelligence dashboard, and sync their configurations to the cloud.

---

## 🌟 Key Features

### Frontend (PC Configurator & Intelligence)
- **Interactive Component Selection**: Visual selection of CPU, GPU, motherboard, RAM, storage, case, and power supply.
- **Dynamic Build Intelligence Review**:
  - **Tier Hero**: Automatically evaluates and classifies the build (Enthusiast, High-End, Mid-Range, Budget) based on estimated performance and cost.
  - **Live Spec-based Scoring**: Generates custom scores (0-100) for Gaming, Heavy Multitasking, Media Production, and 3D Rendering.
  - **PSU & Power Analysis**: Real-time wattage estimation with safety headroom checks and load alerts.
  - **Budget Breakdown**: Interactive percentage-based breakdown of cost allocation across components.
- **Local & Cloud Sync**: Seamlessly transitions configurations between local memory and cloud databases.
- **Aesthetic Dark Theme**: Tailored design featuring absolute charcoal cards, glassmorphism, sleek progress indicators, and custom Orbit/Zrnic typography.

### Backend (REST API & Database)
- **User Authentication**: Secure signup and login flows powered by JWT (JSON Web Tokens) and bcrypt password hashing.
- **Build Management (CRUD)**: Save, retrieve, and delete customized builds associated with verified user accounts.
- **Product Registry**: Unified inventory database of PC components mapped to specific technical specifications (VRAM, TDP, socket types, capacity, etc.).
- **Automatic Sync Hook**: Frontend context automatically triggers cloud synchronization when a logged-in user saves or updates a configuration.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18, Vite
- **Styling**: Vanilla CSS & Tailwind CSS
- **Icons & Animation**: Lucide React
- **UI Components**: Shadcn UI (Radix UI primitives)

### Backend & Database
- **Runtime**: Node.js & Express
- **Database**: MongoDB Atlas (via Mongoose ORM)
- **Security**: JWT, bcrypt, CORS setup, Joi validation schemas

---

## ⚙️ Project Structure

```
PC-Station/
├── backend/                  # Node.js + Express REST API
│   ├── config/               # Database connection config
│   ├── controllers/          # Request handlers (auth, builds, products)
│   ├── middleware/           # Token verification & route guards
│   ├── models/               # MongoDB Mongoose schemas (User, Product, Build)
│   ├── routes/               # API endpoint routing
│   ├── scripts/              # Database seeding, QA testing, and cleanup scripts
│   ├── server.js             # Express application entrypoint
│   └── .env.example          # Environment variable template
├── src/                      # Vite + React Frontend
│   ├── components/
│   │   ├── auth/             # Login/Register modal
│   │   ├── cards/            # Product selection cards & modals
│   │   ├── compare/          # Component comparison tables
│   │   ├── layout/           # Structure components (Header, Footer, Configurator)
│   │   ├── stepper/          # Configurator stepper navigation
│   │   ├── steps/            # Component grid and review step
│   │   └── summary/          # Sticky price/compatibility summary panel
│   ├── context/              # AuthContext & ConfiguratorContext
│   ├── hooks/                # Custom hooks (useCurrency, useConfigurator)
│   ├── lib/                  # Extracted business logic (buildAnalysis, sorting)
│   ├── services/             # Axios API service client
│   └── index.css             # Main styling system
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/nikhilverma29/PC-Station.git
cd PC-Station
```

### 2. Configure the Backend Environment
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `MONGO_URI` and `JWT_SECRET` variables inside `.env` with your Mongo cluster connection string and preferred JWT token secret.
5. (Optional) Seed the database with the core product registry:
   ```bash
   node scripts/seed.js
   ```
6. Start the backend server:
   ```bash
   npm run dev
   ```
   *The backend will boot up at `http://localhost:5000`.*

### 3. Start the Frontend
1. Navigate back to the workspace root:
   ```bash
   cd ..
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client app will launch at `http://localhost:5173`.*

---

## 🧪 Testing

A complete automated API integration test suite is located in the backend. To verify health check routes, authentication flows, product pagination, and build sync CRUD mechanics, run:

```bash
cd backend
node scripts/fullTest.mjs
```
