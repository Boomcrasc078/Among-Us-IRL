const errorScreenwElement = document.getElementById('error');
const errorTextElement = document.getElementById('error-text');

function error(enable, message) {
	if (enable) {
		errorScreenwElement.style.display = 'block';
		errorTextElement.textContent = message;
	} else {
		errorScreenwElement.style.display = 'none';
		errorTextElement.textContent = '';
	}
}
