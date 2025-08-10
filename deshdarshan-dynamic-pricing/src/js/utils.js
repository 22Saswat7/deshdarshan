export function formatPrice(amount) {
    return `₹${amount.toFixed(2)}`;
}

export function isMobileView() {
    return window.innerWidth <= 768;
}

export function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}