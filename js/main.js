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
	};

	function sendForm() {
		let data = new FormData();
		data.append('email', input.value);
        let request = new XMLHttpRequest();
        try {
			request.open('POST', 'http://sereda.in.ua/mail.php');
			request.send(data);
			request.onload = function() {
				if(request.status === 200 && request.readyState === 4) {
					showThankYouMessage();
				}
			};
        }
        catch(error) {
			form.classList.add('error');
			form.querySelector('.validation-message').innerHTML = error.message;
		}
	};
});
