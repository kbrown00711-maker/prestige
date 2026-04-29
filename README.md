# Prestige Advisory Ltd - Professional Investment Advisory Website

A comprehensive, modern website for Prestige Advisory Ltd featuring professional design, responsive layout, and enhanced user experience.

## Features

### Modern Design
- **Professional aesthetic** with elegant typography (Cardo serif + Raleway sans-serif)
- **Responsive design** that works seamlessly across desktop, tablet, and mobile devices
- **Smooth animations** and micro-interactions for enhanced user experience
- **Corporate color scheme** with consistent branding throughout

### Complete Website Structure
- **Hero Section** with compelling messaging and clear call-to-actions
- **About Us** section showcasing company expertise and achievements
- **Services** section highlighting core advisory offerings
- **Enhanced Contact** system with global office locations and smart form handling
- **Professional Footer** with comprehensive links and legal information

### Advanced Functionality
- **Smooth scrolling navigation** with active section highlighting
- **Interactive office selection** with real-time form updates
- **Enhanced form validation** with real-time feedback and error handling
- **Mobile-first responsive design** with intuitive mobile navigation
- **Accessibility features** including keyboard navigation and ARIA labels

### Mobile Experience
- **Mobile-optimized navigation** with hamburger menu
- **Touch-friendly interactions** for office selection
- **Responsive layouts** that adapt to all screen sizes
- **Optimized typography** for mobile readability

### Technical Excellence
- **Modern CSS** with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript** with modular, maintainable code structure
- **SEO optimization** with proper meta tags and semantic HTML
- **Performance optimized** with efficient animations and lazy loading

## Project Structure

```
prestige-advisory-site/
├── index.html          # Main website with all sections
├── css/
│   └── styles.css      # Comprehensive styling system
├── js/
│   └── script.js       # Enhanced interactivity and functionality
├── package.json        # Project configuration
├── README.md          # Documentation
└── tests/             # Visual testing setup
```

## Getting Started

### Option 1: Direct Browser Access
1. Open `index.html` directly in your web browser
2. The website will load with all functionality available

### Option 2: Local Development Server
```bash
# Navigate to project directory
cd prestige-advisory-site

# Start local server (Python)
python -m http.server 8080

# Or use Node.js
npx serve .

# Open browser to http://localhost:8080
```

### Option 3: Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## Key Sections

### Hero Section
- **Compelling headline** with value proposition
- **Clear call-to-actions** for engagement
- **Professional background** with overlay effects

### About Section
- **Company story** and expertise showcase
- **Key statistics** highlighting achievements
- **Professional credibility** indicators

### Services Section
- **Six core service offerings** with descriptions
- **Icon-based visual design** for easy scanning
- **Hover effects** for interactive engagement

### Contact Section
- **Eight global office locations** with complete details
- **Interactive office selection** with visual feedback
- **Enhanced contact form** with validation and UX improvements
- **Professional form handling** with success/error states

## Customization

### Colors
Update CSS custom properties in `styles.css`:
```css
:root {
  --accent: #C41511;        /* Primary brand color */
  --accent-2: #E6A800;      /* Secondary accent */
  --dark: #4A1F1F;         /* Dark text color */
  --dark-blue: #002449;     /* Header/Footer background */
}
```

### Content
- Update company information in `index.html`
- Modify service descriptions and office details
- Customize form fields and validation rules

### Styling
- Modify CSS in `css/styles.css` for design changes
- Add custom animations in `js/script.js`
- Extend functionality with additional JavaScript modules

## Features in Detail

### Navigation System
- **Smooth scrolling** between sections
- **Active state management** showing current section
- **Mobile-responsive** hamburger navigation
- **Keyboard accessibility** with proper focus management

### Office Selection
- **Visual office cards** with hover effects
- **Click-to-select** functionality
- **Keyboard navigation** with arrow keys
- **Automatic form updates** when office is selected

### Form Enhancement
- **Real-time validation** with visual feedback
- **Field-level error messages** for better UX
- **Loading states** during form submission
- **Success animations** with modal overlays

### Performance Features
- **CSS animations** with hardware acceleration
- **Intersection Observer** for scroll-triggered animations
- **Debounced scroll events** for smooth performance
- **Optimized asset loading** for fast page speeds

## Browser Support

- **Modern browsers** (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- **Mobile browsers** (iOS Safari, Chrome Mobile, Samsung Internet)
- **Responsive breakpoints** at 480px, 768px, 1024px, and 1360px

## Testing

### Automated Visual Testing
```bash
# Install dependencies
npm install

# Run visual regression tests
npm run test:visual
```

### Manual Testing Checklist
- [ ] Navigation works on all screen sizes
- [ ] Office selection updates form correctly
- [ ] Form validation works for all fields
- [ ] Mobile navigation functions properly
- [ ] Animations play smoothly
- [ ] All links and buttons are functional

## Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Direct from repository
- **AWS S3**: Static website hosting

### Web Server
Configure any web server to serve static files:
- Apache, Nginx, or any HTTP server
- Enable gzip compression for better performance
- Set appropriate cache headers

## Support

For questions or enhancements:
1. Review the codebase structure
2. Check browser console for any errors
3. Validate HTML and CSS markup
4. Test responsive behavior across devices

## License

This project is developed for Prestige Advisory Ltd. All rights reserved.

---

**Built with ❤️ for professional investment advisory services**