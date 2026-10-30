function toggleMenu() {
    document
        .getElementById("menu")
        .classList
        .toggle("active");
}

document.getElementById("year").textContent =
    new Date().getFullYear();

let gaLoaded = false;

const banner =
    document.getElementById("cookie-banner");

const modal =
    document.getElementById("cookie-modal");

function loadGoogleAnalytics() {

    if (gaLoaded) return;

    gaLoaded = true;

    const script =
        document.createElement("script");

    script.async = true;

    script.src =
        "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";

    document.head.appendChild(script);

    gtag('js', new Date());

    gtag('config', 'G-XXXXXXXXXX');
}

function updateConsentMode(
    analytics,
    marketing
) {

    gtag('consent', 'update', {
        analytics_storage:
            analytics ? 'granted' : 'denied',

        ad_storage:
            marketing ? 'granted' : 'denied',

        ad_user_data:
            marketing ? 'granted' : 'denied',

        ad_personalization:
            marketing ? 'granted' : 'denied'
    });
}

function savePreferences(
    analytics,
    marketing
) {

    localStorage.setItem(
        'cookiePreferences',
        JSON.stringify({
            analytics,
            marketing
        })
    );

    updateConsentMode(
        analytics,
        marketing
    );

    if (analytics) {
        loadGoogleAnalytics();
    }

    banner.style.display = 'none';
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {

    const saved =
        localStorage.getItem(
            'cookiePreferences'
        );

    if (saved) {

        banner.style.display = 'none';

        const settings =
            JSON.parse(saved);

        updateConsentMode(
            settings.analytics,
            settings.marketing
        );

        if (settings.analytics) {
            loadGoogleAnalytics();
        }
    }
});

document.getElementById('accept-all')
.addEventListener('click', () => {
    savePreferences(true, true);
});

document.getElementById('reject-all')
.addEventListener('click', () => {
    savePreferences(false, false);
});

document.getElementById('customize-cookies')
.addEventListener('click', () => {
    modal.style.display = 'flex';
});

document.getElementById('cookie-settings-btn')
.addEventListener('click', () => {
    modal.style.display = 'flex';
});

document.getElementById('footer-cookie-settings')
.addEventListener('click', (e) => {

    e.preventDefault();
    modal.style.display = 'flex';

});

document.getElementById('saveCookies')
.addEventListener('click', () => {

    const analytics =
        document.getElementById(
            'analyticsCookies'
        ).checked;

    const marketing =
        document.getElementById(
            'marketingCookies'
        ).checked;

    savePreferences(
        analytics,
        marketing
    );
});