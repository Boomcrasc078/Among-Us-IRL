const loadingElement = document.getElementById('loading');
const loadingTextElement = document.getElementById('loading-text');

function loadingScreen(enable, message) {
	if (enable) {
		loadingElement.style.display = 'block';
		loadingTextElement.textContent = message;
	} else {
		loadingElement.style.display = 'none';
		loadingTextElement.textContent = 'Laddar...';
	}
}
