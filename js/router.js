import { loadContent, loadContentLang } from "./api/fetch.js";
import { renderHome } from "./pages/home/home.js";
import { renderAbout } from "./pages/about/about.js";
import { renderLogin } from "./pages/login/login.js";
import { renderHeader } from "./components/header/header.js";
import { renderFooter } from "./components/footer/footer.js";
import { renderSidebar } from "./components/sidebar/sidebar.js";

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function renderTemplate() {
	loadContent('content', '/js/pages/template/template.html');
}

function renderNotFound() {
	loadContent('content', '/js/pages/error/pageNotFound.html');
}
const routeHandlers = {
	'': renderTemplate,
	'#/': renderHome,
	'#/about': renderAbout,
	'#/login': renderLogin,
	'default': renderNotFound
};

function handleRoutes() {
	const hash = window.location.hash || '';
	const handler = routeHandlers[hash] || routeHandlers['default'];
	document.getElementById('content').innerHTML = '';
	handler();
}

window.addEventListener('DOMContentLoaded', () => {
	renderHeader();
	renderFooter();
	handleRoutes();
	loadContentLang('body', document.documentElement.lang, () => {
		attachEventListeners();
	}); 
});

window.addEventListener('hashchange', handleRoutes);

function changeLanguage(lang) {
	debouncedChangeLanguage(lang);
}

const debouncedChangeLanguage = debounce((lang) => {
	loadContentLang('body', lang, () => {
		attachEventListeners();
	});
}, 300);

function attachEventListeners() {
	const langButtons = document.querySelectorAll('.lang-btn');
	langButtons.forEach(button => {
		button.addEventListener('click', () => {
			changeLanguage(button.dataset.lang);
		});
	});
}