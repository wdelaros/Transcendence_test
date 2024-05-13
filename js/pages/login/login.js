import { loadContent } from '../../api/fetch.js';

export function renderLogin() {
	try {
		loadContent('content', '/js/pages/login/login.html');
	} catch (error) {
		console.error('Error fetching login.html:', error);
	}
}