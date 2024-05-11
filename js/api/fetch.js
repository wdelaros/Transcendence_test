export const getContent = async (id, filePath) => {
	try {
		const html = await (await fetch(filePath)).text();
		let container = document.getElementById(id).innerHTML += html
	} catch (error) {
		console.error(`Error : ${filePath} -> `, error);
	}
}