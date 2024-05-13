import { loadContent } from '../../api/fetch.js';

export function renderAbout() {
	try {
		loadContent('content', '/js/pages/about/about.html');
	} catch (error) {
		console.error('Error fetching about.html:', error);
	}
}