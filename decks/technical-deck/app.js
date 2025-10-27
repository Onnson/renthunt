// Technical Source Database
const sourceDatabase = {
    1: { source: 'React 19 Release Notes (2024)', title: 'Official performance benchmarks', url: 'https://react.dev' },
    2: { source: 'React Compiler Documentation (2024)', title: 'Re-render optimization metrics', url: 'https://react.dev/compiler' },
    3: { source: 'Microsoft TypeScript Study (2023)', title: 'Error reduction in production', url: null },
    4: { source: 'Bundlephobia analysis (2024)', title: 'State management library sizes', url: 'https://bundlephobia.com' },
    5: { source: 'State Management Performance Benchmark (2024)', title: 'JS Perf tests', url: null },
    6: { source: 'Zustand vs Redux comparison', title: 'Community analysis', url: 'https://github.com' },
    7: { source: 'Vite Benchmarks (2024)', title: 'Official documentation', url: 'https://vitejs.dev' },
    8: { source: 'Web Dev Performance Report (2024)', title: 'HMR speed measurements', url: null },
    9: { source: 'hover.dev documentation', title: 'Performance specifications', url: null },
    10: { source: 'Brad Frost - Atomic Design', title: 'Component methodology', url: 'https://atomicdesign.bradfrost.com' },
    11: { source: 'Israel Startup Salary Survey (2024)', title: 'TechAviv, Startup Nation Central', url: null },
    12: { source: 'Stanford CS229 (2023)', title: 'Compatibility Scoring Algorithms', url: null },
    13: { source: 'Google Testing Blog (2024)', title: 'Code coverage best practices', url: 'https://testing.googleblog.com' },
    14: { source: 'Component Reusability Study', title: 'React patterns efficiency', url: null },
    15: { source: 'LocalStorage Persistence Study (2024)', title: 'User retention metrics', url: null },
    16: { source: 'Google Web Vitals (2024)', title: 'Performance best practices', url: 'https://web.dev/vitals' },
    17: { source: 'Israel Backend Developer Salary Survey (2024)', title: 'TechAviv benchmarks', url: null },
    18: { source: 'Vercel & Supabase pricing (2024)', title: 'Official pricing pages', url: null },
    19: { source: 'AWS Cost Calculator (2024)', title: 'EC2/RDS estimates', url: 'https://calculator.aws' },
    20: { source: 'React Native Code Reuse Study (2023)', title: 'Airbnb Engineering Blog', url: null },
    21: { source: 'GitHub Pricing (2024)', title: 'Team plan costs', url: 'https://github.com/pricing' },
    22: { source: 'RentHunt Financial Model (2024)', title: 'Internal projections', url: null },
    23: { source: 'SaaS Capital LTV:CAC Benchmarks (2024)', title: 'Industry standards', url: null }
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
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

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

// Draw budget chart
let budgetChartDrawn = false;

function drawBudgetChart() {
    if (budgetChartDrawn) return;
    
    const canvas = document.getElementById('budgetChart');
    if (!canvas) return;
    
    budgetChartDrawn = true;
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Set canvas size
    canvas.width = container.clientWidth - 80;
    canvas.height = 300;
    
    const categories = [
        { name: 'Team Salaries', value: 191000, color: '#10b981' },
        { name: 'Marketing', value: 54000, color: '#3b82f6' },
        { name: 'Operations', value: 22500, color: '#f59e0b' },
        { name: 'Software/Tools', value: 2800, color: '#8b5cf6' },
        { name: 'Hardware', value: 8000, color: '#ec4899' }
    ];
    
    const total = categories.reduce((sum, cat) => sum + cat.value, 0);
    
    // Draw pie chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    
    let currentAngle = -Math.PI / 2;
    
    categories.forEach((category, index) => {
        const sliceAngle = (category.value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.fillStyle = category.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw label
        const midAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(midAngle) * (radius + 40);
        const labelY = centerY + Math.sin(midAngle) * (radius + 40);
        
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(category.name, labelX, labelY);
        
        const percentage = ((category.value / total) * 100).toFixed(1);
        ctx.fillText(percentage + '%', labelX, labelY + 15);
        
        currentAngle += sliceAngle;
    });
    
    // Draw center circle for donut effect
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw total in center
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('$' + (total / 1000).toFixed(0) + 'K', centerX, centerY - 10);
    
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Annual Budget', centerX, centerY + 10);
}

// Observe budget section for chart drawing
const budgetSection = document.getElementById('section-9');
if (budgetSection) {
    const budgetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => drawBudgetChart(), 300);
            }
        });
    }, { threshold: 0.3 });
    
    budgetObserver.observe(budgetSection);
}

// Redraw chart on window resize
window.addEventListener('resize', () => {
    if (budgetChartDrawn) {
        budgetChartDrawn = false;
        drawBudgetChart();
    }
});

// Citation interactions
const citations = document.querySelectorAll('.citation');
const citationTooltip = document.createElement('div');
citationTooltip.className = 'citation-tooltip';
citationTooltip.style.cssText = `
    position: fixed;
    background: rgba(15, 23, 42, 0.98);
    color: #10b981;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 12px;
    max-width: 320px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    line-height: 1.5;
    border: 1px solid rgba(16, 185, 129, 0.4);
    font-family: 'SF Mono', monospace;
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
                tooltipContent += `<strong style="color: #10b981">[${citeId}]</strong> <span style="color: #e2e8f0">${source.source}</span>`;
                if (source.title) {
                    tooltipContent += `<br><em style="color: #94a3b8; font-size: 11px">${source.title}</em>`;
                }
            }
        });
        
        citationTooltip.innerHTML = tooltipContent;
        citationTooltip.style.opacity = '1';
        
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
        
        // Find all citation list items
        const citationLists = document.querySelectorAll('.citation-list p');
        citationLists.forEach(item => {
            item.style.background = '';
            item.style.padding = '';
            const citeNum = item.querySelector('.cite-num');
            if (citeNum && citeIds.some(id => citeNum.textContent.includes(`[${id}]`))) {
                item.style.background = 'rgba(16, 185, 129, 0.15)';
                item.style.padding = '8px';
                item.style.borderRadius = '6px';
                item.style.transition = 'all 0.3s ease';
                
                // Scroll to reference
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    item.style.background = '';
                    item.style.padding = '';
                }, 3000);
            }
        });
    });
});

function updateTooltipPosition(e) {
    const tooltipWidth = 320;
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

// Number counting animation for hero metrics
const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('K')) {
            element.textContent = '$' + Math.floor(current) + 'K-' + Math.floor(current * 1.67) + 'K';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Animate hero metrics on load
const heroMetrics = document.querySelectorAll('.hero-metrics .metric-value');
if (heroMetrics.length > 0) {
    setTimeout(() => {
        heroMetrics.forEach((metric, index) => {
            const text = metric.textContent;
            if (text.includes('weeks')) {
                animateValue(metric, 0, 12, 1500);
                setTimeout(() => { metric.textContent = '12 weeks'; }, 1500);
            } else if (text.includes('-')) {
                metric.textContent = '$0K-0K';
                animateValue(metric, 0, 150, 2000);
            } else if (text.includes('2-3')) {
                metric.textContent = '0';
                setTimeout(() => { metric.textContent = '2-3'; }, 1000);
            }
        });
    }, 500);
}

// Interactive stack card hover effects
const stackCards = document.querySelectorAll('.stack-card');
stackCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        stackCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        stackCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Phase card expand/collapse on mobile
const phaseCards = document.querySelectorAll('.phase-card');
if (window.innerWidth < 768) {
    phaseCards.forEach(card => {
        const header = card.querySelector('.phase-header');
        const tasks = card.querySelector('.phase-tasks');
        
        // Start collapsed on mobile
        if (tasks) {
            tasks.style.maxHeight = '0';
            tasks.style.overflow = 'hidden';
            tasks.style.transition = 'max-height 0.3s ease';
        }
        
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                if (tasks.style.maxHeight === '0px' || tasks.style.maxHeight === '') {
                    tasks.style.maxHeight = tasks.scrollHeight + 'px';
                } else {
                    tasks.style.maxHeight = '0';
                }
            });
        }
    });
}

// Table row hover highlighting
const tables = document.querySelectorAll('table');
tables.forEach(table => {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.background = 'rgba(16, 185, 129, 0.1)';
        });
        row.addEventListener('mouseleave', () => {
            row.style.background = '';
        });
    });
});

// Smooth scroll to top button (appears after scrolling)
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: 1px solid rgba(16, 185, 129, 0.4);
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
`;
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'scale(1)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'scale(0.8)';
    }
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
});

// Initialize on load
window.addEventListener('load', () => {
    // Set first dot as active
    if (navDots.length > 0) {
        navDots[0].classList.add('active');
    }
    
    // Log citation database for verification
    console.log('Citation Database loaded:', Object.keys(sourceDatabase).length, 'technical sources');
    console.log('Technical Development Plan - Ready');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const currentSection = Math.floor(window.pageYOffset / window.innerHeight);
        if (currentSection < sections.length - 1) {
            sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const currentSection = Math.floor(window.pageYOffset / window.innerHeight);
        if (currentSection > 0) {
            sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        sections[0].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'End') {
        e.preventDefault();
        sections[sections.length - 1].scrollIntoView({ behavior: 'smooth' });
    }
});
