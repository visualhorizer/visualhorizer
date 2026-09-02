document.addEventListener("DOMContentLoaded", () => {


    // Navigations & Views
    const btnViewPlans = document.getElementById('btn-view-plans');
    const btnBuildBundle = document.getElementById('btn-build-bundle');
    const btnBackHome = document.getElementById('btn-back-home');
    const defaultView = document.getElementById('default-view');
    const bundleView = document.getElementById('bundle-view');
    const pricingSection = document.getElementById('pricing');

    // Smooth scroll to Pricing
    if (btnViewPlans && pricingSection) {
        btnViewPlans.addEventListener('click', () => {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

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
    
    // Pricing Category Toggle
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const capsulePill = document.getElementById('capsule-pill');
    let currentCategory = 'Video Editing'; // Default

    const pricingData = {
        'Video Editing': {
            footer: "Don't see exactly what you need? <span class=\"highlight-text pulsate\">Contact us</span> to discuss custom deliverables and flexible pricing.",
            plans: [
                { 
                    title: 'Essential Plan',
                    price: '₹399<span class="price-unit">/ video</span>', 
                    subtitle: 'Perfect for consistent weekly uploads.',
                    features: '<li>20-60 Seconds Runtime</li><li>Single Video Asset (16:9 & 9:16)</li><li>Essential Narrative Assembly</li><li>Dynamic Animated Captions</li><li>Standard Delivery Time</li>',
                    badge: false,
                    portfolioUrl: 'essential-editing-styles'
                },
                { 
                    title: 'Growth Plan',
                    price: '₹799<span class="price-unit">/ video</span>', 
                    subtitle: 'Growth-focused editing for serious creators.',
                    features: '<li>20-60 Seconds Runtime</li><li>Retention-Optimized Editing</li><li>Premium Transitions & Overlays</li><li>Custom Motion Graphics</li><li>Generative AI B-Roll</li>',
                    badge: true,
                    portfolioUrl: 'standard-editing-styles'
                },
                { 
                    title: 'Premium Plan',
                    price: '₹1199<span class="price-unit">/ video</span>', 
                    subtitle: 'Dominate every platform with studio quality.',
                    features: '<li>Up to 1 Minutes Runtime</li><li>Color Grading (Log/Raw)</li><li>Cinematic B-roll</li><li>Voice-over narration</li><li>cinematic sound design</li><li>Full length Ai Video</li>',
                    badge: false,
                    portfolioUrl: 'premium-editing-styles'
                }
            ]
        },
        'Graphic Design': {
            footer: "Scaling a brand? We offer tailored packages and volume-based pricing for long-term partners. <span class=\"highlight-text pulsate\">Let’s build a custom creative workflow for you.</span>",
            plans: [
                { 
                    title: 'High-CTR Thumbnails',
                    price: '₹299<span class="price-unit">/ unit</span>', 
                    subtitle: 'Maximum Click-Through Rate for YouTube & Social Media.',
                    features: '<li>Click-Logic Composition</li><li>Custom Typography</li><li>Psychological Framing</li><li>24-Hour Express Delivery</li>',
                    badge: false,
                    portfolioUrl: 'graphic-portfolio'
                },
                { 
                    title: 'Premium Social Creatives',
                    price: '₹499<span class="price-unit">/ unit</span>', 
                    subtitle: 'Designs that build trust and look like a million-dollar brand',
                    features: '<li>Platform-Optimized Layouts</li><li>Hyper-Realistic Manipulation</li><li>Brand-Consistent Aesthetics</li><li>Project Files Included</li>',
                    badge: false,
                    portfolioUrl: 'graphic-portfolio'
                },
                { 
                    title: 'Strategic Brand Identity',
                    price: '₹1199<span class="price-unit">/ package</span>', 
                    subtitle: "Creating a 'look' that allows you to charge more for your own products.",
                    features: '<li>Core Logo Design</li><li>Signature Color Palette</li><li>Typography System</li><li>Social Media Kit</li><li>Full Source Files</li>',
                    badge: false,
                    portfolioUrl: 'graphic-portfolio'
                }
            ]
        },
        'Motion Graphics': {
            footer: "",
            plans: [] // Motion Graphics uses the wide card instead of the grid
        }
    };

    const priceElements = document.querySelectorAll('.pricing-cards .price');
    const featureElements = document.querySelectorAll('.pricing-cards .features');
    const subtitleElements = document.querySelectorAll('.pricing-cards .plan-subtitle');
    const titleElements = document.querySelectorAll('.pricing-cards h3');
    const pricingFooter = document.querySelector('.pricing-footer p');
    const pricingGrid = document.getElementById('pricing-grid');
    const pricingWide = document.getElementById('pricing-wide');

    toggleOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            // Remove active from all
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            // Add active to clicked
            option.classList.add('active');
            
            // Move the pill
            capsulePill.style.transform = `translateX(${index * 100}%)`;

            currentCategory = option.getAttribute('data-category');
            const data = pricingData[currentCategory];

            // Trigger animation on container
            const container = document.querySelector('.pricing-container');
            if (container) {
                container.classList.remove('pricing-switch-anim');
                void container.offsetWidth; // Trigger reflow
                container.classList.add('pricing-switch-anim');
            }

            if (data && pricingFooter) {
                pricingFooter.innerHTML = data.footer;
                const footerContainer = pricingFooter.closest('.pricing-footer');
                if (footerContainer) {
                    footerContainer.style.display = data.footer ? 'block' : 'none';
                }
            }

            const pricingScrollbarContainer = document.querySelector('.pricing-scrollbar-container');
            if (currentCategory === 'Motion Graphics') {
                if (pricingGrid) pricingGrid.classList.add('hidden');
                if (pricingWide) pricingWide.classList.remove('hidden');
                if (pricingScrollbarContainer) pricingScrollbarContainer.style.setProperty('display', 'none', 'important');
            } else {
                if (pricingGrid) pricingGrid.classList.remove('hidden');
                if (pricingWide) pricingWide.classList.add('hidden');
                if (pricingScrollbarContainer) pricingScrollbarContainer.style.setProperty('display', '', '');
                // Reset scroll position, thumb position, and auto-swipe loop on category switch
                if (window.resetPricingAutoSwipe) {
                    window.resetPricingAutoSwipe();
                } else if (pricingGrid) {
                    pricingGrid.scrollLeft = 0;
                    const pricingThumb = document.querySelector('.pricing-scrollbar-thumb');
                    if (pricingThumb) pricingThumb.style.transform = 'translateX(0%)';
                }
            }
                
                // Update grid UI dynamically
                if(data && priceElements.length === 3) {
                    for(let i = 0; i < 3; i++) {
                        // Handle Badge visibility
                        const card = priceElements[i].closest('.card');
                        const badge = card.querySelector('.badge');
                        if (data.plans[i].badge) {
                            if (badge) badge.style.display = 'block';
                        } else {
                            if (badge) badge.style.display = 'none';
                        }

                        titleElements[i].textContent = data.plans[i].title;
                        priceElements[i].innerHTML = data.plans[i].price;
                        featureElements[i].innerHTML = data.plans[i].features;
                        if (subtitleElements[i]) {
                            subtitleElements[i].innerHTML = data.plans[i].subtitle || '';
                        }

                        // Dynamically update Visit Portfolio button URLs
                        const visitBtn = card.querySelector('.btn-visit-portfolio');
                        if (visitBtn && data.plans[i].portfolioUrl) {
                            visitBtn.setAttribute('href', data.plans[i].portfolioUrl);
                        }
                    }
                }
            }
        });
    });

    // WhatsApp Direct URLs for Contact Sales
    const contactSalesBtns = document.querySelectorAll('.btn-contact-sales');
    contactSalesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            const phone = "919048856350";
            const message = `Hi, I am interested in the ${plan} plan for ${currentCategory}.`;
            const encodedMsg = encodeURIComponent(message);
            const whatappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
            window.open(whatappUrl, '_blank');
        });
    });

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
        threshold: 0.01,
        rootMargin: "50px 0px 50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'is-visible');
                
                // Also activate staggered children
                const staggered = entry.target.querySelectorAll('.stagger-item');
                staggered.forEach(item => item.classList.add('active', 'is-visible'));
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal, .animate-slide-up, .animate-fade-in');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Immediate check on load to reveal elements already in view or on desktop screens
    const triggerInitialVisibility = () => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
                el.classList.add('active', 'is-visible');
            }
        });
    };
    triggerInitialVisibility();
    setTimeout(triggerInitialVisibility, 200);

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

    // Pricing Cards Mobile Auto-Swipe & Scrollbar Sync
    const pricingGridElement = document.getElementById('pricing-grid');
    const pricingThumb = document.querySelector('.pricing-scrollbar-thumb');

    if (pricingGridElement) {
        let currentPricingIndex = 0;
        let pricingAutoSwipeInterval = null;
        let isPricingUserInteracting = false;
        let pricingPauseTimeout = null;

        const getPricingCards = () => {
            return pricingGridElement.querySelectorAll('.card');
        };

        const updatePricingScrollbar = () => {
            if (pricingThumb) {
                const maxScroll = pricingGridElement.scrollWidth - pricingGridElement.clientWidth;
                if (maxScroll > 0) {
                    const ratio = Math.min(Math.max(pricingGridElement.scrollLeft / maxScroll, 0), 1);
                    pricingThumb.style.transform = `translateX(${ratio * 200}%)`;
                }
            }
        };

        const scrollToPricingCard = (index) => {
            const cards = getPricingCards();
            if (cards[index]) {
                const targetLeft = cards[index].offsetLeft - pricingGridElement.offsetLeft - 24;
                pricingGridElement.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
                updatePricingScrollbar();
            }
        };

        const nextPricingCard = () => {
            if (isPricingUserInteracting) return;
            const cards = getPricingCards();
            if (cards.length > 0) {
                currentPricingIndex = (currentPricingIndex + 1) % cards.length;
                scrollToPricingCard(currentPricingIndex);
            }
        };

        const startPricingAutoSwipe = () => {
            stopPricingAutoSwipe();
            pricingAutoSwipeInterval = setInterval(nextPricingCard, 2200);
        };

        const stopPricingAutoSwipe = () => {
            if (pricingAutoSwipeInterval) clearInterval(pricingAutoSwipeInterval);
        };

        const handlePricingUserInteraction = () => {
            isPricingUserInteracting = true;
            stopPricingAutoSwipe();
            if (pricingPauseTimeout) clearTimeout(pricingPauseTimeout);
            pricingPauseTimeout = setTimeout(() => {
                isPricingUserInteracting = false;
                startPricingAutoSwipe();
            }, 4000);
        };

        // Scroll listener to update scrollbar thumb & tracking index
        pricingGridElement.addEventListener('scroll', () => {
            updatePricingScrollbar();
            const cards = getPricingCards();
            if (cards.length > 0) {
                const step = cards[0].offsetWidth + 16;
                const index = Math.round(pricingGridElement.scrollLeft / step);
                if (index >= 0 && index < cards.length) {
                    currentPricingIndex = index;
                }
            }
        });

        // Touch & Mouse events for user interaction
        pricingGridElement.addEventListener('touchstart', handlePricingUserInteraction, { passive: true });
        pricingGridElement.addEventListener('mousedown', handlePricingUserInteraction);

        // Global reset helper when category changes
        window.resetPricingAutoSwipe = () => {
            currentPricingIndex = 0;
            if (pricingGridElement) pricingGridElement.scrollLeft = 0;
            if (pricingThumb) pricingThumb.style.transform = 'translateX(0%)';
            if (window.innerWidth <= 768) {
                startPricingAutoSwipe();
            }
        };

        // Start auto-swipe loop on mobile screens
        if (window.innerWidth <= 768) {
            startPricingAutoSwipe();
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
