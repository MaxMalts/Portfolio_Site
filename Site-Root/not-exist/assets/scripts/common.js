function EaseInOutSine(x) {
	return -(Math.cos(Math.PI * x) - 1) / 2;
}


function Animate(Timing, Draw, Duration, OnFinish = null) {

	let start = performance.now();

	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / Duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = Timing(timeFraction);

		Draw(progress); // отрисовать её

		if (timeFraction < 1)
			requestAnimationFrame(animate);
		else
			if (OnFinish != null)
				OnFinish();
	});
}


function CssAnimationIteration(element) {
	var listener = function () {
		element.style.animationPlayState = "paused";
		
		element.removeEventListener("animationiteration", listener);
	}
	element.addEventListener("animationiteration", listener);

	element.style.animationPlayState = "running";
}


function FitImage(image) {
	var imgRatio = image.naturalWidth / image.naturalHeight;

	var contStyle = getComputedStyle(image.parentElement, null);
	var contRatio = parseInt(contStyle.width, 10) / parseInt(contStyle.height, 10);

	if (imgRatio > contRatio) {
		image.style.width = "100%";
		image.style.height = "auto";

	} else {
		image.style.width = "auto";
		image.style.height = "100%";
	}
}