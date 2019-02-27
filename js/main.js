// init
document.addEventListener('DOMContentLoaded', function() {
	let form = document.querySelector('.subscribe-form');
	let input = form.querySelector('input[type="email"]');
	let btn = form.querySelector('.btn');
	let regExp = /^[a-z]+[a-z0-9_\.-]*\@\w+\.[a-z]{2,8}$/i;

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
		message.classListList.add('thank-message');
		message.innerHTML = 'Thank you!';
		form.appendChild(message);
	};

	function sendForm() {
		let data = new FormData();
		data.append('value', input.value);
		let request = fetch('url', {
			method: 'post',
			body: data.get('value')
		})
		.then((response) => response.ok)
		.then(() => {
			console.log(response);
		});
	};
});
