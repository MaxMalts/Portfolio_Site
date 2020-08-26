window.addEventListener("load", function () {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			document.querySelector(anchor.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
});