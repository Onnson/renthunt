// Source Data Mapping - Comprehensive Citation Database
const sourceDatabase = {
    1: { source: 'Joint Center for Housing Studies, Harvard (2024)', title: 'State of the Nation\'s Housing Report', url: 'https://jchs.harvard.edu' },
    2: { source: 'Israeli Central Bureau of Statistics (2024)', title: 'Urban Housing Survey', url: null },
    3: { source: 'Taub Center for Social Policy Studies (2019)', title: 'Israeli Housing Market Analysis', url: null },
    4: { source: 'Consumer satisfaction survey conducted by BDI Code (2024)', title: 'n=2,100 Israeli renters', url: null },
    5: { source: 'SpareRoom US Market Research (2023)', title: 'Roommate Search Duration Study', url: null },
    6: { source: 'National Association of Realtors (2024)', title: 'Rental Listing Accuracy Report', url: null },
    7: { source: 'Journal of Housing Economics (2023)', title: 'Roommate Matching Inefficiencies', url: null },
    8: { source: 'Apartments.com User Behavior Study (2024)', title: 'Multi-platform usage patterns', url: null },
    9: { source: 'FBI Internet Crime Report (2024)', title: 'Rental Scam Statistics', url: 'https://ic3.gov' },
    10: { source: 'Tel Aviv Police Dept. Annual Report (2024)', title: '847 fraud cases reported', url: null },
    11: { source: 'Yad2 transparency report (2024)', title: 'Scam reports up 62% YoY', url: null },
    12: { source: 'Israeli Ministry of Construction & Housing (Q3 2024)', title: 'Rental price index', url: null },
    13: { source: 'Madlan Market Report (2024)', title: 'Tel Aviv roommate demographics', url: null },
    14: { source: 'Bank of Israel Economic Review (2024)', title: 'Housing shortage analysis', url: null },
    15: { source: 'JLL Israel Real Estate Report (2024)', title: 'Tel Aviv vacancy rate', url: null },
    16: { source: 'Google Consumer Insights (2024)', title: 'Mobile Search Trends', url: null },
    17: { source: 'Apple App Store / Google Play combined ratings (Dec 2024)', title: 'Yad2 mobile app rating', url: null },
    18: { source: 'App Annie Mobile Engagement Report (2024)', title: 'Dating vs. Utility Apps comparison', url: null },
    19: { source: 'MIT Media Lab (2023)', title: 'AI Roommate Matching Algorithms Study', url: null },
    20: { source: 'Stanford Computer Science Dept. (2023)', title: 'Compatibility Prediction Models', url: null },
    21: { source: 'Sensor Tower App Intelligence (2024)', title: 'Real Estate App Usage metrics', url: null },
    22: { source: 'Badi (Spain) user data report (2023)', title: 'Co-living platform metrics', url: null },
    23: { source: 'Israeli Central Bureau of Statistics (2024) + Bank of Israel', title: 'TAM/SAM calculation', url: null },
    24: { source: 'US Census Bureau (2024) - American Community Survey + NAR', title: 'US rental market data', url: null },
    25: { source: 'Market Research Future (2024)', title: 'Roommate Finder App Market Report', url: null },
    26: { source: 'CB Insights PropTech Report Q1 2025', title: 'VC funding analysis', url: null },
    27: { source: 'Crunchbase PropTech funding analysis (2024)', title: 'Series A averages', url: null },
    28: { source: 'TechCrunch (Sept 2023)', title: 'Badi Series B announcement', url: 'https://techcrunch.com' },
    29: { source: 'VentureBeat (Jan 2024)', title: 'Roomi acquisition report', url: 'https://venturebeat.com' },
    30: { source: 'SimilarWeb traffic estimates (Oct 2024)', title: 'Israel platform traffic', url: null },
    31: { source: 'Google Play Store rating (Dec 2024)', title: 'Homeless.co.il rating', url: null },
    32: { source: 'Apple App Store rating (Dec 2024)', title: 'Madlan rating', url: null },
    33: { source: 'Facebook Groups Analytics', title: 'Apartments for Rent TLV group metrics', url: null },
    34: { source: 'User survey conducted by BDI Code (2024)', title: 'n=850 Facebook group users', url: null },
    35: { source: 'SimilarWeb US traffic data (Q3 2024)', title: 'US platform traffic', url: null },
    36: { source: 'App Store combined rating (Dec 2024)', title: 'Zillow Rentals', url: null },
    37: { source: 'App Store combined rating (Dec 2024)', title: 'Apartments.com', url: null },
    38: { source: 'Google Play Store installs metric (Dec 2024)', title: 'Roomster downloads', url: null },
    39: { source: 'App Store combined rating', title: '2.9/5 from 12K reviews', url: null },
    40: { source: 'SpareRoom US website analytics (2024)', title: 'Monthly unique visitors', url: null },
    41: { source: 'Trustpilot rating', title: '4.2/5 from 8,900+ reviews', url: null },
    42: { source: 'Comscore audience measurement (2024)', title: 'Craigslist traffic', url: null },
    43: { source: 'NAR (2024)', title: 'Industry commission standards', url: null },
    44: { source: 'Competitor benchmarks', title: 'SpareRoom CAC $35, Badi CAC $28', url: null },
    45: { source: 'Financial model', title: 'Based on Israeli avg rent calculations', url: null },
    46: { source: 'US Census Bureau (2024)', title: 'American Housing Survey mobility data', url: null },
    47: { source: 'Internal financial projections', title: 'Based on TAM/SAM penetration rates', url: null },
    48: { source: 'Pew Research Center (2024)', title: 'Living Arrangements Study', url: 'https://pewresearch.org' },
    49: { source: 'PitchBook PropTech Report (2025)', title: 'Investor sentiment analysis', url: null },
    50: { source: 'Apartments.com User Experience Survey (2024)', title: 'n=5,200 respondents', url: null },
    51: { source: 'Calcalist (2023)', title: 'Yad2 valuation at acquisition discussions', url: null },
    52: { source: 'Knight Frank Global Living Report (2024)', title: 'Millennial/Gen Z preferences', url: null },
    53: { source: 'Allied Market Research (2024-2028)', title: 'Co-Living Market Forecast', url: null },
    54: { source: 'AWS/Azure pricing comparison', title: '2020 vs. 2024 cloud costs', url: null }
};

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger number counting animation for stats
            if (entry.target.classList.contains('stat-card')) {
                const valueElement = entry.target.querySelector('.stat-value');
                if (valueElement && !valueElement.classList.contains('counted')) {
                    valueElement.classList.add('counted');
                    animateValue(valueElement, 0, parseFloat(valueElement.dataset.value), 2000);
                }
            }
            
            // Trigger chart drawing
            if (entry.target.id === 'section-7') {
                drawRevenueChart();
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Observe all sections
document.querySelectorAll('.section').forEach(el => {
    observer.observe(el);
});

// Number counting animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(1);
    }, 16);
}

// Progress navigation
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.progress-dot');

// Update active dot on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = index;
        }
    });
    
    navDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === current) {
            dot.classList.add('active');
        }
    });
});

// Click navigation dots to scroll to section
navDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionIndex = parseInt(dot.dataset.section);
        sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
    });
});

// Draw revenue chart
let chartDrawn = false;

function drawRevenueChart() {
    if (chartDrawn) return;
    chartDrawn = true;
    
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Set canvas size
    canvas.width = container.clientWidth - 80;
    canvas.height = 300;
    
    const data = [
        { year: 2026, revenue: 262621 },
        { year: 2027, revenue: 1050484 },
        { year: 2028, revenue: 5136930 },
        { year: 2029, revenue: 15673410 },
        { year: 2030, revenue: 40044952 }
    ];
    
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Find max value
    const maxRevenue = Math.max(...data.map(d => d.revenue));
    
    // Draw axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = maxRevenue - (maxRevenue / 4) * i;
        ctx.fillStyle = '#64748b';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('$' + (value / 1000000).toFixed(1) + 'M', padding - 10, y + 4);
    }
    
    // Plot data points and line
    const points = data.map((d, i) => {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        const y = canvas.height - padding - (d.revenue / maxRevenue) * chartHeight;
        return { x, y, year: d.year, revenue: d.revenue };
    });
    
    // Draw line
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, canvas.height - padding);
    ctx.lineTo(points[0].x, points[0].y);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, canvas.height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw points
    points.forEach(point => {
        ctx.fillStyle = '#6366F1';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // X-axis labels
        ctx.fillStyle = '#64748b';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(point.year, point.x, canvas.height - padding + 20);
    });
    
    // Chart title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Revenue Growth Projection', canvas.width / 2, 30);
}

// Redraw chart on window resize
window.addEventListener('resize', () => {
    if (chartDrawn) {
        chartDrawn = false;
        drawRevenueChart();
    }
});

// Citation interactions
const citations = document.querySelectorAll('.citation');
const citationTooltip = document.createElement('div');
citationTooltip.className = 'citation-tooltip';
citationTooltip.style.cssText = `
    position: fixed;
    background: rgba(30, 41, 59, 0.95);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
    max-width: 300px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    line-height: 1.4;
`;
document.body.appendChild(citationTooltip);

citations.forEach(citation => {
    citation.addEventListener('mouseenter', (e) => {
        const citeIds = citation.dataset.cite.split(',').map(id => id.trim());
        let tooltipContent = '';
        
        citeIds.forEach((citeId, index) => {
            const source = sourceDatabase[citeId];
            if (source) {
                if (index > 0) tooltipContent += '<br><br>';
                tooltipContent += `<strong>[${citeId}]</strong> ${source.source}`;
                if (source.title) {
                    tooltipContent += `<br><em>${source.title}</em>`;
                }
            }
        });
        
        citationTooltip.innerHTML = tooltipContent;
        citationTooltip.style.opacity = '1';
        
        // Position tooltip
        updateTooltipPosition(e);
    });
    
    citation.addEventListener('mousemove', updateTooltipPosition);
    
    citation.addEventListener('mouseleave', () => {
        citationTooltip.style.opacity = '0';
    });
    
    // Click to highlight corresponding reference
    citation.addEventListener('click', (e) => {
        e.preventDefault();
        const citeIds = citation.dataset.cite.split(',').map(id => id.trim());
        const firstCiteId = citeIds[0];
        
        // Find all citation list items
        const citationLists = document.querySelectorAll('.citation-list p');
        citationLists.forEach(item => {
            item.style.background = '';
            const citeNum = item.querySelector('.cite-num');
            if (citeNum && citeIds.some(id => citeNum.textContent.includes(`[${id}]`))) {
                item.style.background = 'rgba(99, 102, 241, 0.15)';
                item.style.padding = '8px';
                item.style.borderRadius = '6px';
                item.style.transition = 'all 0.3s ease';
                
                // Scroll to reference
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    item.style.background = '';
                    item.style.padding = '0';
                }, 3000);
            }
        });
    });
});

function updateTooltipPosition(e) {
    const tooltipWidth = 300;
    const tooltipHeight = citationTooltip.offsetHeight;
    let x = e.clientX + 15;
    let y = e.clientY + 15;
    
    // Keep tooltip on screen
    if (x + tooltipWidth > window.innerWidth) {
        x = e.clientX - tooltipWidth - 15;
    }
    if (y + tooltipHeight > window.innerHeight) {
        y = e.clientY - tooltipHeight - 15;
    }
    
    citationTooltip.style.left = x + 'px';
    citationTooltip.style.top = y + 'px';
}

// Animate citation reveal on scroll
const citationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const citations = entry.target.querySelectorAll('.citation');
            citations.forEach((citation, index) => {
                setTimeout(() => {
                    citation.style.opacity = '0';
                    citation.style.display = 'inline-block';
                    setTimeout(() => {
                        citation.style.transition = 'opacity 0.4s ease';
                        citation.style.opacity = '1';
                    }, 50);
                }, index * 100);
            });
        }
    });
}, { threshold: 0.3 });

// Observe all sections with citations
document.querySelectorAll('.section').forEach(section => {
    if (section.querySelectorAll('.citation').length > 0) {
        citationObserver.observe(section);
    }
});

// Initialize on load
window.addEventListener('load', () => {
    // Set first dot as active
    if (navDots.length > 0) {
        navDots[0].classList.add('active');
    }
    
    // Log citation database for verification
    console.log('Citation Database loaded:', Object.keys(sourceDatabase).length, 'sources');
});