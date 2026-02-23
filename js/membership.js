/**
 * KAA - Membership Page JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initPlanToggle();
    initAdvancedCalculator();
    initTierSelector();
});


// ═══════════════════════════════════
// PLAN VIEW TOGGLE (CARDS / TABLE)
// ═══════════════════════════════════
function initPlanToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const cardView = document.getElementById('cardView');
    const tableView = document.getElementById('tableView');

    if (!toggleBtns.length || !cardView || !tableView) return;

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view;
            if (view === 'cards') {
                cardView.style.display = '';
                tableView.style.display = 'none';
            } else {
                cardView.style.display = 'none';
                tableView.style.display = '';
            }
        });
    });
}


// ═══════════════════════════════════
// TIER SELECTOR
// ═══════════════════════════════════
function initTierSelector() {
    const tierBtns = document.querySelectorAll('.tier-btn');
    if (!tierBtns.length) return;

    tierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tierBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Recalculate
            if (typeof calcUpdate === 'function') calcUpdate();
        });
    });
}


// ═══════════════════════════════════
// ADVANCED SAVINGS CALCULATOR
// ═══════════════════════════════════
function initAdvancedCalculator() {
    const kmRange = document.getElementById('calcKmRange');
    const priceRange = document.getElementById('calcPriceRange');
    const kmDisplay = document.getElementById('kmDisplay');
    const priceDisplay = document.getElementById('priceDisplay');
    const fuelSavingsEl = document.getElementById('fuelSavings');
    const gifticonSavingsEl = document.getElementById('gifticonSavings');
    const insuranceSavingsEl = document.getElementById('insuranceSavings');
    const totalSavingsEl = document.getElementById('totalSavings');

    if (!kmRange || !priceRange) return;

    window.calcUpdate = function () {
        const km = parseInt(kmRange.value);
        const price = parseInt(priceRange.value);

        // Get active tier
        const activeTier = document.querySelector('.tier-btn.active');
        const fuelDiscount = activeTier ? parseInt(activeTier.dataset.fuel) / 100 : 0.1;
        const giftDiscount = activeTier ? parseInt(activeTier.dataset.gift) / 100 : 0.2;

        // Display
        if (kmDisplay) kmDisplay.textContent = km.toLocaleString() + ' km';
        if (priceDisplay) priceDisplay.textContent = '₩' + price.toLocaleString();

        // Calculations
        const fuelEfficiency = 12; // km per liter
        const monthlyFuel = km / fuelEfficiency;
        const monthlyFuelCost = monthlyFuel * price;
        const annualFuelSavings = Math.round(monthlyFuelCost * fuelDiscount * 12);

        const monthlyGifticonSpend = 50000; // ₩50,000/month average
        const annualGifticonSavings = Math.round(monthlyGifticonSpend * giftDiscount * 12);

        const annualInsurance = activeTier && activeTier.dataset.tier === 'silver' ? 0 :
            activeTier && activeTier.dataset.tier === 'gold' ? 70000 : 100000;

        const total = annualFuelSavings + annualGifticonSavings + annualInsurance;

        // Animate values
        animateValue(fuelSavingsEl, annualFuelSavings);
        animateValue(gifticonSavingsEl, annualGifticonSavings);
        animateValue(insuranceSavingsEl, annualInsurance);
        animateValue(totalSavingsEl, total);
    };

    let animationFrames = {};

    function animateValue(element, target) {
        if (!element) return;

        const id = element.id;
        if (animationFrames[id]) cancelAnimationFrame(animationFrames[id]);

        const currentText = element.textContent.replace(/[^0-9]/g, '');
        const start = parseInt(currentText) || 0;
        const diff = target - start;
        const duration = 500;
        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(start + diff * eased);
            element.textContent = '₩' + value.toLocaleString();

            if (progress < 1) {
                animationFrames[id] = requestAnimationFrame(update);
            }
        }

        animationFrames[id] = requestAnimationFrame(update);
    }

    // Event listeners
    kmRange.addEventListener('input', calcUpdate);
    priceRange.addEventListener('input', calcUpdate);

    // Initial calculation
    calcUpdate();
}
