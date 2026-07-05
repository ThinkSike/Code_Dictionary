# jQuery Image Gallery / Product Slider

A modern, responsive image gallery/slider built with jQuery and jQuery UI, perfect for showcasing products or any collection of images.

## 🌟 Features

### Core Functionality
- **Smooth Image Transitions**: CSS3 animations with slide effects
- **Responsive Design**: Works seamlessly on all devices
- **Auto-play**: Configurable automatic slideshow
- **Manual Navigation**: Arrow buttons, thumbnails, and keyboard controls
- **Touch Support**: Swipe gestures for mobile devices

### jQuery Widgets Used
- **Slider**: Speed control for autoplay timing
- **Sortable**: Drag and drop reordering of thumbnails
- **Resizable**: Resize gallery container
- **Effects**: Bounce effects and smooth transitions

### Advanced Features
- **Product Information**: Overlay with product details and pricing
- **Progress Bar**: Visual progress indicator for autoplay
- **Settings Panel**: Customize autoplay and visibility options
- **Fullscreen Mode**: Toggle fullscreen viewing
- **Notification System**: User feedback messages
- **Keyboard Navigation**: Arrow keys and spacebar controls
- **Performance Optimization**: Pauses when tab is not visible

## 🎮 Controls

### Mouse/Touch
- **Click arrows**: Navigate between images
- **Click thumbnails**: Jump to specific image
- **Hover image**: Show product information overlay
- **Swipe left/right**: Navigate on mobile devices

### Keyboard
- **Left Arrow**: Previous image
- **Right Arrow**: Next image
- **Spacebar**: Play/pause autoplay

### Settings Panel
- **Autoplay Speed Slider**: Adjust timing (1-10 seconds)
- **Enable Autoplay**: Toggle automatic progression
- **Show Thumbnails**: Hide/show thumbnail navigation

## 🏗️ Structure

```
image-gallery.html      # Main HTML file
gallery-styles.css      # Styling and animations
gallery-script.js       # jQuery functionality
README.md              # Documentation
```

## 🎨 Customization

### Adding New Images
1. Add new `<img>` element in `.image-container` with:
   - Unique `data-index` attribute
   - Descriptive `alt` text
   - `main-image` class

2. Add corresponding thumbnail in `.thumbnails` with matching `data-index`

3. Update `productData` array in `gallery-script.js` with product information

### Styling
- Colors are defined using CSS custom properties
- Responsive breakpoints at 768px and 480px
- Smooth animations use `cubic-bezier` timing functions

### Configuration
Modify the `galleryConfig` object in `gallery-script.js`:
```javascript
let galleryConfig = {
    currentIndex: 0,
    autoplay: true,
    autoplaySpeed: 3000, // milliseconds
    // ... other options
};
```

## 📱 Responsive Design

- **Desktop**: Full layout with all controls
- **Tablet (768px and below)**: Adjusted layout, repositioned navigation
- **Mobile (480px and below)**: Optimized for touch interaction

## 🛠️ Dependencies

- jQuery 3.6.0+
- jQuery UI 1.13.2+
- Font Awesome 6.0.0 (for icons)

## 🚀 Getting Started

1. Open `image-gallery.html` in a web browser
2. The gallery will automatically start playing
3. Interact with controls to explore features
4. Customize images and content as needed

## 💡 Use Cases

Perfect for:
- Product showcases
- Portfolio galleries
- Image carousels
- Advertisement banners
- Photo galleries
- E-commerce product displays

## 🔧 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers with touch support

## 📄 License

This project is open source and available under the MIT License.
