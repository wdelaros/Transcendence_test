export const loadContent = async (id, filePath) => {
	try {
		const html = await (await fetch(filePath)).text();
		let container = document.getElementById(id).innerHTML += html
	} catch (error) {
		console.error(`Error : ${filePath} -> `, error);
	}
}

const translationsCache = {};
let isLanguageChangePending = false;

export const loadContentLang = async (id, lang, callback) => {
    if (isLanguageChangePending) {
        return;
    }
    isLanguageChangePending = true;
    try {
        if (translationsCache[lang]) {
            applyTranslations(id, translationsCache[lang]);
            if (callback && typeof callback === 'function') {
                callback();
            }
            return;
        }
        try {
            const response = await fetch(`/js/lang/${lang}.json`);
        } catch (error) {
            throw new error(`Failed to load translation file for language '${lang}'.`);
        }
        const response = await fetch(`/js/lang/${lang}.json`);
        if (!response.ok) {
            throw new error(`Failed to load translation file for language '${lang}'.`);
        }
        const translations = await response.json();
        translationsCache[lang] = translations;
        applyTranslations(id, translations);
        if (callback && typeof callback === 'function') {
            callback();
        }
    } catch (error) {
        console.error(`Error loading content for language '${lang}': `, error);
    } finally {
        isLanguageChangePending = false;
    }
};

const applyTranslations = (id, translations) => {
    const container = document.getElementById(id);
    if (!container) {
        console.error(`Container element with ID '${id}' not found.`);
        return;
    }
    const elements = container.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
};

