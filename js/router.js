import { getContent } from "./api/fetch.js";
import { renderHome } from "./pages/home/home.js";
import { renderHeader } from "./components/header/header.js";

function renderTemplate() {
	getContent('content', '/js/pages/template/template.html');
}

function renderNotFound() {
	getContent('content', '/js/pages/error/pageNotFound.html');
}

function handleRoutes() {
	const hash = window.location.hash;
	document.getElementById('content').innerHTML = ``;
	switch(hash) {
		case '':
			renderTemplate();
			break;
		case '#/':
			renderHome();
			break;
		// case '#/about':
		// 	renderAbout();
		// 	break;
		case '#/login':
			renderLogin();
			break;
			// Add more routes as needed
		default:
			renderNotFound();
	}
}

renderHeader();

window.addEventListener('hashchange', handleRoutes);
window.addEventListener('DOMContentLoaded', handleRoutes);
