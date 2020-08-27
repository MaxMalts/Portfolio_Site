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


function FitMedia(media, mediaRatio) {
	var contStyle = getComputedStyle(media.parentElement, null);
	var contRatio = parseInt(contStyle.width, 10) / parseInt(contStyle.height, 10);

	if (mediaRatio > contRatio) {
		media.style.width = "100%";
		media.style.height = "auto";

	} else {
		media.style.width = "auto";
		media.style.height = "100%";
	}
}

function FitImage(image) {
	var Process = function () {
		var imgRatio = image.naturalWidth / image.naturalHeight;

		FitMedia(image, imgRatio);
	}

	if (image.naturalWidth > 0) {
		Process();

	} else {
		let interval = setInterval(function () {
			console.log("there");
			if (image.naturalWidth > 0) {
				Process();
				clearInterval(interval);
				image.removeEventListener("error", ErrListener);
				image.removeEventListener("load", LoadListener);
			}
		}, 500);

		let LoadListener = function () {
			Process();
			clearInterval(interval);
			image.removeEventListener("error", ErrListener);
			image.removeEventListener("load", LoadListener);
		}
		image.addEventListener("load", LoadListener);

		let ErrListener = function () {
			clearInterval(interval);
			image.removeEventListener("error", ErrListener);
			image.removeEventListener("load", LoadListener);
		}
		image.addEventListener("error", ErrListener);
	}

}

function FitVideo(video) {
	const HAVE_METADATA = 1;

	var Process = function () {
		var videoRatio = video.videoWidth / video.videoHeight;

		FitMedia(video, videoRatio);
	}

	if (video.readyState >= HAVE_METADATA) {
		Process();
	
	} else {
		let Listener = function () {
			Process();
			video.removeEventListener("loadedmetadata", Listener);
		}

		video.addEventListener("loadedmetadata", Listener);
	}
}