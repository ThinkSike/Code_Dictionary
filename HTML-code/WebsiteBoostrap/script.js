// Initialize all tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });

        // Initialize all popovers
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            } else {
                navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            }
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading spinner
            document.getElementById('loadingSpinner').classList.remove('d-none');
            document.getElementById('loadingSpinner').classList.add('d-flex');
            
            // Simulate form submission
            setTimeout(() => {
                // Hide spinner
                document.getElementById('loadingSpinner').classList.add('d-none');
                document.getElementById('loadingSpinner').classList.remove('d-flex');
                
                // Show success toast
                const toast = new bootstrap.Toast(document.getElementById('successToast'));
                toast.show();
                
                // Reset form
                this.reset();
            }, 1500);
        });

        // Modal signup
        function submitSignup() {
            const form = document.getElementById('signupForm');
            if (form.checkValidity()) {
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
                modal.hide();
                
                // Show success toast
                const toast = new bootstrap.Toast(document.getElementById('successToast'));
                document.querySelector('.toast-body').textContent = 'Welcome to FitLife Pro! Check your email for next steps.';
                toast.show();
                
                // Reset form
                form.reset();
            } else {
                form.reportValidity();
            }
        }

        // Active navigation link highlighting
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Pagination functionality (demo)
        document.querySelectorAll('.pagination .page-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all
                document.querySelectorAll('.pagination .page-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active to clicked
                this.parentElement.classList.add('active');
                
                // In a real app, this would load different testimonials
                console.log('Loading page:', this.textContent);
            });
        });

        // Demo button to show offcanvas
        document.addEventListener('DOMContentLoaded', function() {
            // Add a button to show offcanvas (for demo purposes)
            const navbar = document.querySelector('.navbar-nav');
            const offcanvasBtn = document.createElement('li');
            offcanvasBtn.className = 'nav-item';
            offcanvasBtn.innerHTML = '<a class="nav-link" href="#" data-bs-toggle="offcanvas" data-bs-target="#infoOffcanvas">Info</a>';
            navbar.appendChild(offcanvasBtn);
        });
