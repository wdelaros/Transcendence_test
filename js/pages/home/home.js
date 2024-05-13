import { loadContent } from '../../api/fetch.js';

export function renderHome() {
	try {
		loadContent('content', '/js/pages/home/home.html');
	} catch (error) {
		console.error('Error fetching home.html:', error);
	}
}