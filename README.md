# i6ER Admin Panel

Admin dashboard for the **i6ER (i6 Emergency Response)** platform — built with React 18, Redux Toolkit, and Ant Design.

## 🔗 Repository

[https://github.com/accesssolid/i6er-admin.git](https://github.com/accesssolid/i6er-admin.git)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/accesssolid/i6er-admin.git

# Navigate into the project directory
cd i6er-admin

# Install dependencies
npm install
```

---

## ⚙️ Environment Setup

The project uses environment-specific `.env` files. Create the following files in the root directory:

| File | Purpose |
|------|---------|
| `.env` | Default / fallback |
| `.env.development` | Development environment |
| `.env.production` | Production environment |

### Required Variables

```env
REACT_APP_BASE_URL=https://api.i6emergency.com/api/v1/
REACT_APP_FILE_URL=https://d1clwt64tkflwy.cloudfront.net/
```

> **Note:** All `.env` files are gitignored and should never be committed.

---

## 📜 Available Scripts

### Development

```bash
# Start with default env
npm start

# Start with development env
npm run start:dev

# Start with production env
npm run start:prod
```

### Build

```bash
# Build with default env
npm run build

# Build for development
npm run build:dev

# Build for production
npm run build:prod
```

### Other

```bash
# Run tests
npm test

# Lint source files
npm run lint
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| State Management | Redux Toolkit + Redux Persist |
| UI Library | Ant Design 5 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Charts | Highcharts |
| Rich Text Editor | Jodit React |
| Styling | Tailwind CSS + Vanilla CSS |
| Date Utilities | Day.js / Moment.js |
| Env Management | env-cmd |

---

## 📁 Project Structure

```
i6er-admin/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, icons, fonts
│   ├── components/     # Reusable UI components
│   ├── Hook/           # Custom React hooks
│   ├── layouts/        # Page layout wrappers
│   ├── redux/          # Redux store, slices, actions
│   ├── Routes/         # App routing configuration
│   ├── screen/         # Page-level screen components
│   ├── utils/          # Helper functions & utilities
│   ├── db/             # Static/mock data
│   ├── App.js          # Root app component
│   └── index.js        # App entry point
├── .env                # Default env (gitignored)
├── .env.development    # Dev env (gitignored)
├── .env.production     # Prod env (gitignored)
├── amplify.yml         # AWS Amplify CI/CD config
├── tailwind.config.js  # Tailwind configuration
└── package.json
```

---

## ☁️ Deployment

The project is configured for **AWS Amplify** via `amplify.yml`. Push to the configured branch to trigger an automated build and deploy.

---

## 📄 License

Private — All rights reserved.
