$(document).ready(function() {
    // Gallery Configuration
    let galleryConfig = {
        currentIndex: 0,
        totalImages: $('.main-image').length,
        autoplay: true,
        autoplaySpeed: 3000,
        isPlaying: false,
        progressInterval: null,
        autoplayInterval: null
    };

    // Product Data
    const productData = [
        {
            title: 'Premium Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: '$299.99'
        },
        {
            title: 'Smart Watch',
            description: 'Advanced fitness tracking and smart notifications',
            price: '$399.99'
        },
        {
            title: 'Wireless Speaker',
            description: 'Portable speaker with 360-degree sound technology',
            price: '$199.99'
        },
        {
            title: 'Gaming Mouse',
            description: 'Precision gaming mouse with RGB lighting',
            price: '$79.99'
        },
        {
            title: 'Tablet Pro',
            description: 'Professional tablet with pressure-sensitive stylus',
            price: '$899.99'
        }
    ];

    // Initialize Gallery
    function initGallery() {
        updateSlideCounter();
        setupSlider();
        updateProductInfo();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize autoplay if enabled
        if (galleryConfig.autoplay) {
            startAutoplay();
        }
        
        // Add loading effect to images
        $('.main-image').on('load', function() {
            $(this).removeClass('loading');
        }).addClass('loading');
    }

    // Setup jQuery UI Slider
    function setupSlider() {
        $('#autoplaySpeed').slider({
            range: 'min',
            value: galleryConfig.autoplaySpeed / 1000,
            min: 1,
            max: 10,
            step: 0.5,
            create: function() {
                $(this).find('.ui-slider-handle').text($(this).slider('value') + 's');
            },
            slide: function(event, ui) {
                galleryConfig.autoplaySpeed = ui.value * 1000;
                $('.speed-value').text(ui.value + 's');
                $(this).find('.ui-slider-handle').text(ui.value + 's');
                
                // Restart autoplay with new speed
                if (galleryConfig.isPlaying) {
                    stopAutoplay();
                    startAutoplay();
                }
            }
        });
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Navigation buttons
        $('#nextBtn').on('click', function() {
            if (!$(this).hasClass('disabled')) {
                nextSlide();
            }
        });
        
        $('#prevBtn').on('click', function() {
            if (!$(this).hasClass('disabled')) {
                prevSlide();
            }
        });
        
        // Play/Pause button
        $('#playPauseBtn').on('click', function() {
            toggleAutoplay();
        });
        
        // Thumbnail navigation
        $('.thumbnail').on('click', function() {
            const index = parseInt($(this).data('index'));
            if (index !== galleryConfig.currentIndex) {
                goToSlide(index);
            }
        });
        
        // Settings checkboxes
        $('#enableAutoplay').on('change', function() {
            galleryConfig.autoplay = $(this).is(':checked');
            if (galleryConfig.autoplay && !galleryConfig.isPlaying) {
                startAutoplay();
            } else if (!galleryConfig.autoplay && galleryConfig.isPlaying) {
                stopAutoplay();
            }
        });
        
        $('#showThumbnails').on('change', function() {
            $('.thumbnail-container').toggleClass('hidden', !$(this).is(':checked'));
        });
        
        // Keyboard navigation
        $(document).on('keydown', function(e) {
            switch(e.which) {
                case 37: // Left arrow
                    prevSlide();
                    e.preventDefault();
                    break;
                case 39: // Right arrow
                    nextSlide();
                    e.preventDefault();
                    break;
                case 32: // Spacebar
                    toggleAutoplay();
                    e.preventDefault();
                    break;
            }
        });
        
        // Touch/swipe support for mobile
        setupTouchEvents();
        
        // Add to cart button
        $(document).on('click', '.btn-primary', function() {
            const productTitle = productData[galleryConfig.currentIndex].title;
            showNotification(`${productTitle} added to cart!`, 'success');
        });
    }

    // Setup Touch Events for Mobile Swipe
    function setupTouchEvents() {
        let startX, startY, endX, endY;
        const minSwipeDistance = 50;
        
        $('.image-display').on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].clientX;
            startY = e.originalEvent.touches[0].clientY;
        });
        
        $('.image-display').on('touchend', function(e) {
            endX = e.originalEvent.changedTouches[0].clientX;
            endY = e.originalEvent.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is longer than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        prevSlide(); // Swipe right - go to previous
                    } else {
                        nextSlide(); // Swipe left - go to next
                    }
                }
            }
        });
    }

    // Navigation Functions
    function nextSlide() {
        const nextIndex = (galleryConfig.currentIndex + 1) % galleryConfig.totalImages;
        goToSlide(nextIndex, 'next');
    }
    
    function prevSlide() {
        const prevIndex = (galleryConfig.currentIndex - 1 + galleryConfig.totalImages) % galleryConfig.totalImages;
        goToSlide(prevIndex, 'prev');
    }
    
    function goToSlide(index, direction = 'next') {
        if (index === galleryConfig.currentIndex) return;
        
        const currentImage = $('.main-image').eq(galleryConfig.currentIndex);
        const nextImage = $('.main-image').eq(index);
        
        // Add animation classes
        currentImage.removeClass('active slide-in-left slide-in-right')
                   .addClass(direction === 'next' ? 'slide-out-left' : 'slide-out-right');
        
        nextImage.removeClass('slide-out-left slide-out-right')
                 .addClass(direction === 'next' ? 'slide-in-right' : 'slide-in-left')
                 .addClass('active');
        
        // Clean up animation classes after animation completes
        setTimeout(() => {
            currentImage.removeClass('active slide-out-left slide-out-right');
            nextImage.removeClass('slide-in-left slide-in-right');
        }, 600);
        
        galleryConfig.currentIndex = index;
        
        // Update UI elements
        updateThumbnails();
        updateSlideCounter();
        updateProductInfo();
        updateProductCard();
        
        // Reset progress bar if autoplay is active
        if (galleryConfig.isPlaying) {
            resetProgressBar();
        }
    }

    // Update Functions
    function updateThumbnails() {
        $('.thumbnail').removeClass('active').eq(galleryConfig.currentIndex).addClass('active');
    }
    
    function updateSlideCounter() {
        $('#currentSlide').text(galleryConfig.currentIndex + 1);
        $('#totalSlides').text(galleryConfig.totalImages);
    }
    
    function updateProductInfo() {
        const product = productData[galleryConfig.currentIndex];
        const productInfo = $('.product-info');
        
        // Animate product info update
        productInfo.fadeOut(200, function() {
            $('.product-title').text(product.title);
            $('.product-description').text(product.description);
            $('.product-price').text(product.price);
            productInfo.fadeIn(200);
        });
    }
    
    function updateProductCard() {
        $('.product-card').removeClass('active').eq(galleryConfig.currentIndex).addClass('active');
    }

    // Autoplay Functions
    function startAutoplay() {
        if (galleryConfig.isPlaying) return;
        
        galleryConfig.isPlaying = true;
        $('#playPauseBtn i').removeClass('fa-play').addClass('fa-pause');
        
        // Start progress bar animation
        animateProgressBar();
        
        // Start autoplay interval
        galleryConfig.autoplayInterval = setInterval(function() {
            nextSlide();
            animateProgressBar();
        }, galleryConfig.autoplaySpeed);
    }
    
    function stopAutoplay() {
        if (!galleryConfig.isPlaying) return;
        
        galleryConfig.isPlaying = false;
        $('#playPauseBtn i').removeClass('fa-pause').addClass('fa-play');
        
        // Clear intervals
        if (galleryConfig.autoplayInterval) {
            clearInterval(galleryConfig.autoplayInterval);
            galleryConfig.autoplayInterval = null;
        }
        
        if (galleryConfig.progressInterval) {
            clearInterval(galleryConfig.progressInterval);
            galleryConfig.progressInterval = null;
        }
        
        // Reset progress bar
        $('#progressBar').css('width', '0%');
    }
    
    function toggleAutoplay() {
        if (galleryConfig.isPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }
    
    function animateProgressBar() {
        $('#progressBar').css('width', '0%');
        
        let progress = 0;
        const increment = 100 / (galleryConfig.autoplaySpeed / 50);
        
        if (galleryConfig.progressInterval) {
            clearInterval(galleryConfig.progressInterval);
        }
        
        galleryConfig.progressInterval = setInterval(function() {
            progress += increment;
            $('#progressBar').css('width', Math.min(progress, 100) + '%');
            
            if (progress >= 100) {
                clearInterval(galleryConfig.progressInterval);
                galleryConfig.progressInterval = null;
            }
        }, 50);
    }
    
    function resetProgressBar() {
        if (galleryConfig.progressInterval) {
            clearInterval(galleryConfig.progressInterval);
            galleryConfig.progressInterval = null;
        }
        animateProgressBar();
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `);
        
        // Add notification styles if not already present
        if (!$('#notificationStyles').length) {
            $('head').append(`
                <style id="notificationStyles">
                    .notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: white;
                        padding: 15px 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        z-index: 1000;
                        transform: translateX(400px);
                        transition: transform 0.3s ease;
                        border-left: 4px solid #4ECDC4;
                    }
                    .notification.notification-success {
                        border-left-color: #4ECDC4;
                        color: #4ECDC4;
                    }
                    .notification.show {
                        transform: translateX(0);
                    }
                </style>
            `);
        }
        
        $('body').append(notification);
        
        // Animate in
        setTimeout(() => notification.addClass('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Utility Functions
    function preloadImages() {
        $('.main-image').each(function() {
            const img = new Image();
            img.src = $(this).attr('src');
        });
    }

    // Enhanced Features
    function setupEnhancedFeatures() {
        // Image zoom on hover
        $('.main-image').on('mouseenter', function() {
            if ($(this).hasClass('active')) {
                $(this).css('transform', 'scale(1.05)');
            }
        }).on('mouseleave', function() {
            if ($(this).hasClass('active')) {
                $(this).css('transform', 'scale(1)');
            }
        });
        
        // Thumbnail hover effects with jQuery UI
        $('.thumbnail').hover(
            function() {
                $(this).effect('bounce', { times: 1, distance: 5 }, 200);
            }
        );
        
        // Add drag and drop reordering for thumbnails (using jQuery UI Sortable)
        $('.thumbnails').sortable({
            items: '.thumbnail',
            cursor: 'move',
            opacity: 0.7,
            update: function(event, ui) {
                showNotification('Thumbnail order updated!', 'success');
            }
        });
        
        // Add resize functionality to gallery container
        $('.gallery-container').resizable({
            handles: 'se',
            minWidth: 400,
            minHeight: 300,
            aspectRatio: false
        });
    }

    // Fullscreen functionality
    function setupFullscreen() {
        // Add fullscreen button
        $('.gallery-controls').append(`
            <button class="control-btn" id="fullscreenBtn" title="Toggle Fullscreen">
                <i class="fas fa-expand"></i>
            </button>
        `);
        
        $('#fullscreenBtn').on('click', function() {
            const gallery = $('.main-gallery')[0];
            
            if (!document.fullscreenElement) {
                gallery.requestFullscreen().then(() => {
                    $(this).find('i').removeClass('fa-expand').addClass('fa-compress');
                    $('.main-gallery').addClass('fullscreen-mode');
                });
            } else {
                document.exitFullscreen().then(() => {
                    $(this).find('i').removeClass('fa-compress').addClass('fa-expand');
                    $('.main-gallery').removeClass('fullscreen-mode');
                });
            }
        });
        
        // Add fullscreen styles
        $('head').append(`
            <style>
                .main-gallery.fullscreen-mode {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: black;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .main-gallery.fullscreen-mode .image-container {
                    height: calc(100vh - 100px);
                }
            </style>
        `);
    }

    // Initialize everything when document is ready
    initGallery();
    preloadImages();
    setupEnhancedFeatures();
    setupFullscreen();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to our Product Gallery! Use arrow keys or swipe to navigate.', 'success');
    }, 1000);
    
    // Performance optimization - pause autoplay when tab is not visible
    $(document).on('visibilitychange', function() {
        if (document.hidden && galleryConfig.isPlaying) {
            stopAutoplay();
            galleryConfig.wasPlayingBeforeHide = true;
        } else if (!document.hidden && galleryConfig.wasPlayingBeforeHide) {
            startAutoplay();
            galleryConfig.wasPlayingBeforeHide = false;
        }
    });
});
