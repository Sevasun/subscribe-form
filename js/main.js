// init
document.addEventListener('DOMContentLoaded', function() {
	let form = document.querySelector('.subscribe-form');
	let input = form.querySelector('input[type="email"]');
	let regExp = /^[a-z]+[a-z0-9_\.-]*@\w+\.[a-z]{2,8}$/i;

	form.setAttribute('novalidate', 'novalidate');

	input.addEventListener('input', () => {
		form.classList.remove('error');
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if(input['value'].match(regExp) === null) {
			form.classList.add('error');
		} else {
			sendForm();
		}
		return false;
	});

	function showThankYouMessage() {
		let message = document.createElement('div');
		message.classList.add('thank-message');
		message.innerHTML = 'Thank you!';
		form.appendChild(message);
		form.classList.add('success');
	};

	function clearForm() {
		input.value = "";
		return input.value;
	}

	function sendForm() {
		let data = new FormData();
		data.append('email', input.value);
		let request = fetch('http://sereda.in.ua/mail.php', {
			method: 'POST',
			body: data
		})
		.then(() => clearForm())
		.then(() => showThankYouMessage())
		.catch((error) => console.log(error));
	};
});
