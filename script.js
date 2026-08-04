document.addEventListener("DOMContentLoaded", () => {


    // Navigations & Views
    const btnViewPlans = document.getElementById('btn-view-plans');
    const btnBuildBundle = document.getElementById('btn-build-bundle');
    const btnBackHome = document.getElementById('btn-back-home');
    const defaultView = document.getElementById('default-view');
    const bundleView = document.getElementById('bundle-view');
    const pricingSection = document.getElementById('pricing');

    // Smooth scroll to Pricing
    if (btnViewPlans) {
        btnViewPlans.addEventListener('click', () => {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

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
            const phone = "9539856350";
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
                const phone = "9048856350";
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
                    portfolioUrl: 'essential-editing-styles.html'
                },
                { 
                    title: 'Standard Plan',
                    price: '₹799<span class="price-unit">/ video</span>', 
                    subtitle: 'Growth-focused editing for serious creators.',
                    features: '<li>20-60 Seconds Runtime</li><li>Retention-Optimized Editing</li><li>Premium Transitions & Overlays</li><li>Custom Motion Graphics</li><li>Generative AI B-Roll</li>',
                    badge: true,
                    portfolioUrl: 'standard-editing-styles.html'
                },
                { 
                    title: 'Premium Plan',
                    price: '₹1199<span class="price-unit">/ video</span>', 
                    subtitle: 'Dominate every platform with studio quality.',
                    features: '<li>Up to 1 Minutes Runtime</li><li>Color Grading (Log/Raw)</li><li>Cinematic B-roll</li><li>Voice-over narration</li><li>cinematic sound design</li><li>Full length Ai Video</li>',
                    badge: false,
                    portfolioUrl: 'premium-editing-styles.html'
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
                    portfolioUrl: 'graphic-portfolio.html'
                },
                { 
                    title: 'Premium Social Creatives',
                    price: '₹499<span class="price-unit">/ unit</span>', 
                    subtitle: 'Designs that build trust and look like a million-dollar brand',
                    features: '<li>Platform-Optimized Layouts</li><li>Hyper-Realistic Manipulation</li><li>Brand-Consistent Aesthetics</li><li>Project Files Included</li>',
                    badge: false,
                    portfolioUrl: 'graphic-portfolio.html'
                },
                { 
                    title: 'Strategic Brand Identity',
                    price: '₹1199<span class="price-unit">/ package</span>', 
                    subtitle: "Creating a 'look' that allows you to charge more for your own products.",
                    features: '<li>Core Logo Design</li><li>Signature Color Palette</li><li>Typography System</li><li>Social Media Kit</li><li>Full Source Files</li>',
                    badge: false,
                    portfolioUrl: 'graphic-portfolio.html'
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

            if (currentCategory === 'Motion Graphics') {
                pricingGrid.classList.add('hidden');
                pricingWide.classList.remove('hidden');
            } else {
                pricingGrid.classList.remove('hidden');
                pricingWide.classList.add('hidden');
                
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
            const phone = "9048856350";
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
            const phone = "9048856350";
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

    // Service Overview Mobile Dots Pagination Sync & Click
    const servicesGrid = document.getElementById('services-grid');
    const serviceDots = document.querySelectorAll('.service-dot');

    if (servicesGrid && serviceDots.length > 0) {
        servicesGrid.addEventListener('scroll', () => {
            const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
            if (maxScroll > 0) {
                const ratio = servicesGrid.scrollLeft / maxScroll;
                let activeIdx = 0;
                if (ratio >= 0.7) {
                    activeIdx = 2;
                } else if (ratio >= 0.3) {
                    activeIdx = 1;
                }
                serviceDots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === activeIdx);
                });
            }
        });

        serviceDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
                const targetScroll = (idx / (serviceDots.length - 1)) * maxScroll;
                servicesGrid.scrollTo({ left: targetScroll, behavior: 'smooth' });
            });
        });
    }

});
