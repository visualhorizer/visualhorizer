document.addEventListener("DOMContentLoaded", () => {


    // Navigations & Views
    const btnBuildBundle = document.getElementById('btn-build-bundle');
    const btnBackHome = document.getElementById('btn-back-home');
    const defaultView = document.getElementById('default-view');
    const bundleView = document.getElementById('bundle-view');

    // Smooth scroll for all internal anchor links (Home, Services, Portfolio, Pricing, About) preventing hash addition to URL
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();

                // If bundle view is open, switch back to main default view first
                if (bundleView && !bundleView.classList.contains('hidden')) {
                    bundleView.classList.add('hidden');
                    if (defaultView) defaultView.classList.remove('hidden');
                }

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }

                // Close mobile overlay menu if active
                if (mobileOverlay && mobileOverlay.classList.contains('active')) {
                    mobileOverlay.classList.remove('active');
                }
            }
        });
    });

    // Switch between default view and bundle view
    if (btnBuildBundle) {
        btnBuildBundle.addEventListener('click', () => {
            defaultView.classList.add('hidden');
            bundleView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (btnBackHome) {
        btnBackHome.addEventListener('click', () => {
            bundleView.classList.add('hidden');
            defaultView.classList.remove('hidden');
        });
    }

    // Mobile Menu
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && closeBtn && mobileOverlay) {
        menuBtn.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
        });
        closeBtn.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('active');
            });
        });
    }

    // Navbar Contact Us WhatsApp
    const navContactBtn = document.querySelector('.nav-contact');
    if (navContactBtn) {
        navContactBtn.addEventListener('click', () => {
            const phone = "919048856350";
            const message = "Hi, I am reaching out from your website. I'd like to discuss a project with Visual Horizer.";
            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
        });
    }

    // Pricing Footer Contact Us (Event Delegation)
    const pricingFooterContainer = document.querySelector('.pricing-footer');
    if (pricingFooterContainer) {
        pricingFooterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('highlight-text')) {
                const phone = "919048856350";
                const message = "Hi, I am interested in custom deliverables. I'd like to discuss a project with Visual Horizer.";
                const encodedMsg = encodeURIComponent(message);
                window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
            }
        });
    }
    
    // Bundle Builder Logic
    const bundleStyle = document.getElementById('bundle-style');
    const bundleQty = document.getElementById('bundle-qty');
    const qtyDisplay = document.getElementById('qty-display');
    const extraCheckboxes = document.querySelectorAll('.extra-checkbox');
    
    // Summary elements
    const summaryQty = document.getElementById('summary-qty');
    const summaryBase = document.getElementById('summary-base');
    const summaryExtras = document.getElementById('summary-extras');
    const summaryTotal = document.getElementById('summary-total');
    
    const BASE_PRICE_PER_ITEM = 100;

    function calculateBundlePrice() {
        const qty = parseInt(bundleQty.value);
        let extrasTotal = 0;
        let extrasNames = [];

        extraCheckboxes.forEach(cb => {
            if (cb.checked) {
                extrasTotal += parseInt(cb.value);
                extrasNames.push(cb.getAttribute('data-name'));
            }
        });

        const baseTotal = qty * BASE_PRICE_PER_ITEM;
        const finalTotal = baseTotal + extrasTotal;

        // Update UI
        if(qtyDisplay) qtyDisplay.textContent = qty;
        if(summaryQty) summaryQty.textContent = qty;
        if(summaryBase) summaryBase.textContent = `$${baseTotal}`;
        if(summaryExtras) summaryExtras.textContent = `$${extrasTotal}`;
        if(summaryTotal) summaryTotal.textContent = `$${finalTotal}`;

        return {
            qty,
            style: bundleStyle.options[bundleStyle.selectedIndex].text,
            extras: extrasNames.length > 0 ? extrasNames.join(', ') : 'None',
            total: finalTotal
        };
    }

    if(bundleQty) bundleQty.addEventListener('input', calculateBundlePrice);
    if(bundleStyle) bundleStyle.addEventListener('change', calculateBundlePrice);
    extraCheckboxes.forEach(cb => cb.addEventListener('change', calculateBundlePrice));

    // Initial calculation
    calculateBundlePrice();

    // Initiate Order WhatsApp
    const btnInitiateOrder = document.getElementById('btn-initiate-order');
    if (btnInitiateOrder) {
        btnInitiateOrder.addEventListener('click', () => {
            const details = calculateBundlePrice();
            const phone = "919048856350";
            // Message format: "I want to build a bundle. Qty: [X], Style: [Y], Extras: [Z], Est. Total: [Price]."
            const message = `I want to build a bundle. Qty: ${details.qty}, Style: ${details.style}, Extras: ${details.extras}, Est. Total: $${details.total}.`;
            const encodedMsg = encodeURIComponent(message);
            const whatappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
            window.open(whatappUrl, '_blank');
        });
    }

    // Spotlight mouse tracking effect for all interactive cards
    const glowCards = document.querySelectorAll('.scard, .card, .video-card, .glass-card, .value-box, .extra-item, .wide-card, .summary-box, .btn-primary, .scard-btn, .nav-contact, .btn-contact-sales, .wide-btn, .dropdown-content a, .mobile-link');
    glowCards.forEach(c => {
        c.addEventListener('mousemove', (e) => {
            const rect = c.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            c.style.setProperty('--mouse-x', `${x}px`);
            c.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Intersection Observer for scroll animations (.reveal system)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Also activate staggered children
                const staggered = entry.target.querySelectorAll('.stagger-item');
                staggered.forEach(item => item.classList.add('active'));
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .animate-slide-up, .animate-fade-in').forEach(el => {
        scrollObserver.observe(el);
    });

    // Service Overview Mobile Cards Auto-Swipe & Dots Sync
    const servicesGrid = document.getElementById('services-grid');
    const serviceDots = document.querySelectorAll('.service-dot');

    if (servicesGrid && serviceDots.length > 0) {
        let currentCardIndex = 0;
        let autoSwipeInterval = null;
        let isUserInteracting = false;
        let pauseTimeout = null;

        const updateDots = (index) => {
            serviceDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === index);
            });
        };

        const scrollToCard = (index) => {
            if (servicesGrid.children[index]) {
                const targetLeft = servicesGrid.children[index].offsetLeft - servicesGrid.offsetLeft - 24;
                servicesGrid.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
                updateDots(index);
            }
        };

        const nextCard = () => {
            if (isUserInteracting) return;
            currentCardIndex = (currentCardIndex + 1) % serviceDots.length;
            scrollToCard(currentCardIndex);
        };

        const startAutoSwipe = () => {
            stopAutoSwipe();
            autoSwipeInterval = setInterval(nextCard, 2200);
        };

        const stopAutoSwipe = () => {
            if (autoSwipeInterval) clearInterval(autoSwipeInterval);
        };

        const handleUserInteraction = () => {
            isUserInteracting = true;
            stopAutoSwipe();
            if (pauseTimeout) clearTimeout(pauseTimeout);
            pauseTimeout = setTimeout(() => {
                isUserInteracting = false;
                startAutoSwipe();
            }, 4000);
        };

        // Scroll listener to update dots when manually swiped
        servicesGrid.addEventListener('scroll', () => {
            const firstCard = servicesGrid.children[0];
            if (firstCard) {
                const step = firstCard.offsetWidth + 16;
                const index = Math.round(servicesGrid.scrollLeft / step);
                if (index >= 0 && index < serviceDots.length) {
                    currentCardIndex = index;
                    updateDots(currentCardIndex);
                }
            }
        });

        // Touch & Mouse events for user interaction
        servicesGrid.addEventListener('touchstart', handleUserInteraction, { passive: true });
        servicesGrid.addEventListener('mousedown', handleUserInteraction);

        // Click dots to scroll directly
        serviceDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                handleUserInteraction();
                currentCardIndex = idx;
                scrollToCard(currentCardIndex);
            });
        });

        // Start auto-swipe loop on mobile screens
        if (window.innerWidth <= 768) {
            startAutoSwipe();
        }
    }



    // Testimonials Display
    const testimonialCards = document.querySelectorAll('.testimonials-unified-box .testimonial-content');
    if (testimonialCards.length > 0) {
        testimonialCards.forEach(card => {
            card.style.display = 'flex';
            card.style.opacity = '1';
        });
    }

});
