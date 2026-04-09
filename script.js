document.addEventListener("DOMContentLoaded", () => {
    // Scroll based animation for Hero Section
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const context = canvas.getContext('2d');
        const frameCount = 383;
        const currentFrame = index => (
            `Images/_MConverter.eu_smooth_flowing_animation_2026040309099/${index.toString().padStart(5, '0')}.png`
        );

        canvas.width = 1920;
        canvas.height = 1080;

        const imageCache = {};
        
        let preloadIndex = 1;
        function preloadNextBatch() {
            const batchSize = 10;
            for(let i=0; i<batchSize && (preloadIndex + i) <= frameCount; i++) {
                const idx = preloadIndex + i;
                const image = new Image();
                image.src = currentFrame(idx);
                imageCache[idx] = image;
            }
            preloadIndex += batchSize;
            if (preloadIndex <= frameCount) {
                setTimeout(preloadNextBatch, 20);
            }
        }
        
        // Initial draw
        const img = new Image();
        img.src = currentFrame(1);
        img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            imageCache[1] = img;
            preloadIndex = 2;
            preloadNextBatch(); // Start preloading rest after first load
        }

        const updateImage = index => {
            if (imageCache[index] && imageCache[index].complete) {
                context.drawImage(imageCache[index], 0, 0, canvas.width, canvas.height);
            } else {
                const image = new Image();
                image.src = currentFrame(index);
                image.onload = () => {
                   context.drawImage(image, 0, 0, canvas.width, canvas.height);
                }
            }
        }

        window.addEventListener('scroll', () => {  
            const scrollTop = window.scrollY;
            const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight); // Spans the entire page
            
            let scrollFraction = scrollTop / maxScroll;
            if (scrollFraction > 1) scrollFraction = 1;
            if (scrollFraction < 0) scrollFraction = 0;
            
            const frameIndex = Math.min(
                frameCount - 1,
                Math.ceil(scrollFraction * frameCount)
            );
            
            requestAnimationFrame(() => updateImage(frameIndex + 1));
        }, { passive: true });
    }

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
                    features: '<li>Single Video Asset (16:9 & 9:16)</li><li>Essential Narrative Assembly</li><li>Dynamic Animated Captions</li><li>Standard Delivery Time</li>',
                    badge: false
                },
                { 
                    title: 'Standard Plan',
                    price: '₹699<span class="price-unit">/ video</span>', 
                    subtitle: 'Growth-focused editing for serious creators.',
                    features: '<li>Retention-Optimized Editing</li><li>Premium Transitions & Overlays</li><li>AI-Enhanced Voice Isolation</li><li>Generative AI B-Roll</li>',
                    badge: true
                },
                { 
                    title: 'Premium Plan',
                    price: '₹1199<span class="price-unit">/ video</span>', 
                    subtitle: 'Dominate every platform with studio quality.',
                    features: '<li>Up to 3 Minutes Runtime</li><li>Color Grading (Log/Raw)</li><li>Custom Motion Graphics</li><li>Full length Ai Video</li>',
                    badge: false
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
                    badge: false
                },
                { 
                    title: 'Premium Social Creatives',
                    price: '₹499<span class="price-unit">/ unit</span>', 
                    subtitle: 'Designs that build trust and look like a million-dollar brand',
                    features: '<li>Platform-Optimized Layouts</li><li>Hyper-Realistic Manipulation</li><li>Brand-Consistent Aesthetics</li><li>Project Files Included</li>',
                    badge: false
                },
                { 
                    title: 'Strategic Brand Identity',
                    price: '₹1199<span class="price-unit">/ package</span>', 
                    subtitle: "Creating a 'look' that allows you to charge more for your own products.",
                    features: '<li>Core Logo Design</li><li>Signature Color Palette</li><li>Typography System</li><li>Social Media Kit</li><li>Full Source Files</li>',
                    badge: false
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

});
