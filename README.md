# Keegan Huxford — IT Portfolio

A personal portfolio website built with **React**, **React Router**, and **Tailwind CSS** for the IT709 Web Applications assignment.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
# 1. Clone the repository
git clone <your-github-repo-url>
cd keegan-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The site will be live at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar (React Router NavLink, scroll event)
│   ├── ProjectCard.jsx     # Reusable project card component
│   ├── SectionHeading.jsx  # Reusable section title component
│   ├── SkillBadge.jsx      # Reusable skill badge component
│   └── ScrollToTop.jsx     # Scroll-to-top on route change (useEffect)
├── pages/
│   ├── Home.jsx            # Hero, featured projects, stats
│   ├── About.jsx           # Bio, skills grid, timeline
│   └── Projects.jsx        # Full projects list with filter + search
├── App.jsx                 # Router setup
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind imports
```

## ⚙️ Advanced React Techniques Used

| Technique | Where Used | Purpose |
|---|---|---|
| `React Router (v6)` | `App.jsx`, `Navbar.jsx` | Multi-page navigation |
| `useState` | `Home.jsx`, `Projects.jsx`, `Navbar.jsx` | UI state management |
| `useEffect` | `Home.jsx`, `About.jsx`, `Projects.jsx`, `Navbar.jsx` | Side effects (scroll listener, data fetching, observers) |
| `useRef` | `Home.jsx`, `About.jsx` | DOM references for IntersectionObserver |
| `IntersectionObserver` | `Home.jsx`, `About.jsx` | Scroll-triggered animations |
| Custom Hook | `About.jsx` (`useVisible`) | Reusable scroll-visibility logic |
| Typing Animation | `Home.jsx` (`useTypingEffect`) | Dynamic text with custom hook |

## 🌐 Deployment

Deploy to **Vercel** (recommended):
1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Set Framework Preset to **Vite**
4. Deploy ✅

> For Vercel with React Router, add a `vercel.json` in the root:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
> ```
