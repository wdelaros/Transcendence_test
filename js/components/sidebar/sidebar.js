import { loadContent } from '../../api/fetch.js';

export function renderSidebar() {
	try {
		loadContent('sidebar', '/js/components/sidebar/sidebar.html');
	} catch (error) {
		console.error('Error fetching sidebar.html:', error);
	}
}

