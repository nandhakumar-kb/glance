# GlanceRead - Premium Book Collection Platform 📚

> Discover handpicked premium books that shape successful minds. A modern, SEO-optimized React application for curating and showcasing book collections.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://glanceread.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

### 📊 SEO & Performance Optimized
- ✅ **Complete SEO Implementation** - Meta tags, Open Graph, Twitter Cards
- ✅ **Structured Data (JSON-LD)** - Rich snippets for better search visibility
- ✅ **Dynamic SEO** - Page-specific meta tags and schema
- ✅ **XML Sitemap** - Optimized for search engine crawling
- ✅ **Robots.txt** - Proper crawl directives
- ✅ **Performance Headers** - Caching and security optimizations
- ✅ **Mobile-First Design** - Responsive across all devices
- ✅ **Progressive Web App (PWA)** - Installable with offline support

### 🎨 User Experience
- 🔍 **Smart Search** - Real-time search with suggestions
- 💾 **Favorites System** - Save and manage favorite books
- 🏷️ **Category Filtering** - Filter by productivity, finance, self-help, etc.
- 🔄 **Sorting Options** - Sort by title, author, or category
- 📱 **Share Functionality** - Web Share API integration
- ⚡ **Skeleton Loading** - Smooth loading experience
- 🎯 **Empty States** - Helpful UI for empty results
- 🔔 **Toast Notifications** - User feedback system

### 🛡️ Technical Excellence
- ⚛️ **React 19** - Latest features and performance
- 🚀 **Vite** - Lightning-fast development and builds
- 🎯 **React Router** - Client-side routing
- 📦 **Component-Based** - Modular and reusable architecture
- 🔒 **Error Boundaries** - Graceful error handling
- 🎨 **Modern UI** - Clean, minimal design
- 📊 **Analytics Ready** - Google Analytics integration

## 📁 Project Structure

```
glance/
├── public/                     # Static assets
│   ├── favicon.png            # Site favicon
│   ├── logo.png               # Brand logo
│   ├── hero.png               # Hero section image
│   ├── hero-bg.png            # Hero background
│   ├── robots.txt             # SEO robots file
│   └── sitemap.xml            # SEO sitemap
│
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── AffiliateProductCard.jsx   # Affiliate product display
│   │   ├── ProductCard.jsx            # Book card component
│   │   ├── EmptyState.jsx             # Empty state UI
│   │   ├── ErrorBoundary.jsx          # Error handling
│   │   ├── LoadingSpinner.jsx         # Loading indicators
│   │   ├── SkeletonLoader.jsx         # Skeleton screens
│   │   └── Toast.jsx                  # Toast notifications
│   │
│   ├── pages/                 # Page components
│   │   ├── Home.jsx           # Main landing page
│   │   ├── Products.jsx       # Affiliate products page
│   │   ├── Admin.jsx          # Admin dashboard
│   │   └── NotFound.jsx       # 404 page
│   │
│   ├── context/               # React Context providers
│   │   └── ToastContext.jsx   # Toast notification context
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useShare.js        # Sharing functionality hook
│   │
│   ├── data/                  # Data files
│   │   ├── ProductData.js     # Books data
│   │   └── AffiliateProductData.js  # Affiliate products data
│   │
│   ├── styles/                # CSS files
│   │   ├── index.css          # Global styles
│   │   ├── components.css     # Shared component styles
│   │   ├── ErrorBoundary.css  # Error boundary styles
│   │   ├── Admin.css          # Admin page styles
│   │   └── NotFound.css       # 404 page styles
│   │
│   ├── utils/                 # Utility functions
│   │   └── localStorage.js    # LocalStorage helpers
│   │
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # App entry point
│   └── constants.js           # App configuration constants
│
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── eslint.config.js           # ESLint configuration
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies and scripts
├── index.html                 # HTML entry point
└── README.md                  # This file

```

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **React Router 7.11.0** - Client-side routing
- **Vite 7.2.4** - Build tool and dev server
- **Lucide React** - Icon library
- **PropTypes** - Runtime type checking

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment template
copy .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_ADMIN_PASSWORD=your_secure_password_here
```

## 📚 Features

### User Features
- **Book Collection**: Browse curated book collection
- **Search & Filter**: Search by title/author with autocomplete
- **Favorites**: Save favorite books to local storage
- **Responsive Design**: Mobile-first responsive layout
- **Share**: Share books and website via native share API
- **Affiliate Products**: Browse additional affiliate products
- **Skeleton Loading**: Smooth loading states
- **Dark Theme**: Modern dark mode interface

### Admin Features
- **Secure Dashboard**: Password-protected admin panel
- **CRUD Operations**: Manage books and affiliate products
- **Form Validation**: Real-time validation with error messages
- **Image Preview**: Preview images before saving
- **Dual Management**: Separate tabs for books and products
- **Toast Notifications**: User feedback for all operations

## 🎨 Code Organization

### Components
All UI components follow a consistent pattern:
- PropTypes validation
- Functional components with hooks
- Separate CSS files for complex components
- Shared styles in `components.css`

### Custom Hooks
- **useShare**: Handles native share API with clipboard fallback

### Constants
All magic numbers and configuration in `constants.js`:
- Timing constants (debounce, loading delays)
- Storage keys
- UI thresholds
- Admin configuration

### State Management
- Local state with React hooks
- Context API for toast notifications
- localStorage for persistence

## 🚀 Performance Optimizations

- **useMemo**: Memoized expensive filtering operations
- **Lazy Loading**: Images loaded lazily
- **Code Splitting**: Route-based code splitting
- **Skeleton Screens**: Perceived performance improvement
- **Debounced Search**: Optimized search input

## 🔒 Security

- Environment variables for sensitive data
- Admin password validation
- URL validation for form inputs
- XSS protection through React
- .env files excluded from git

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES6+ features required

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🔗 Links

- **Pinterest**: https://in.pinterest.com/glanceread/
- **LinkedIn**: https://www.linkedin.com/company/glanceread
- **Instagram**: https://www.instagram.com/glanceread/
- **Threads**: https://www.threads.com/@glanceread

## 🐛 Known Issues

None currently. Please report issues via GitHub issues.

## 📊 Project Stats

- **Components**: 11
- **Pages**: 4
- **Custom Hooks**: 1
- **Lines of Code**: ~2500
- **Dependencies**: 10+ (see package.json)

## 🎯 Quick Start

### Add a New Book

1. Open `src/data/ProductData.js`
2. Add your book:
```javascript
{
  id: nextId,
  title: "Book Title",
  author: "Author Name",
  image: "https://image-url.jpg",
  affiliateLinkIN: "https://amzn.to/...",
  affiliateLinkUS: "https://amzn.to/..."
}
```
3. Increment version in `src/constants.js`: `BOOKS_VERSION: '1.3'`

### Use Toast Notifications

```javascript
import { useToast } from '../ToastContext';

const { showToast } = useToast();
showToast('Success!', 'success');
```

### Key Constants (`src/constants.js`)

```javascript
TIMINGS.TOAST_DURATION           // 3000ms
TIMINGS.SEARCH_DEBOUNCE          // 300ms
STORAGE_KEYS.BOOKS               // 'glanceread_books'
STORAGE_KEYS.FAVORITES           // 'glanceread_favorites'
ADMIN_PASSWORD                   // From .env
```

## 💡 Code Standards

All code is documented with JSDoc comments. Hover over any function in your IDE to see:
- Parameter types and descriptions
- Return values
- Usage examples

**Component Pattern:**
```jsx
/**
 * Component description
 * @param {Object} props - Component props
 * @returns {React.Component} Component
 */
const MyComponent = ({ prop1, prop2 }) => {
  // Implementation
};

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
};
```

## 🐛 Troubleshooting

**Books not updating?**
- Increment `BOOKS_VERSION` in `constants.js`

**Admin password not working?**
- Check `.env` file exists
- Ensure variable starts with `VITE_`

**Images not loading?**
- Use absolute paths: `/image.jpg` (not `image.jpg`)

## 🎯 Future Enhancements

- [ ] TypeScript migration
- [ ] Unit tests with Jest/Vitest
- [ ] E2E tests with Playwright
- [ ] Backend API integration
- [ ] User authentication system
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] PWA capabilities

---

**Made with ❤️ by the GlanceRead team**
