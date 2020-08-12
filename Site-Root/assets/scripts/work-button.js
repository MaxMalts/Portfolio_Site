const transitionDuration = 800;  // in milliseconds

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


var ButtonStatus = {
	loadMore: 0,
	showLess: 1
};

var button = document.getElementById("work__button");
var extraImages = document.getElementsByClassName("work__item_extra");
var buttonText = document.getElementById("button__text");
var workContent = document.getElementById("work__content");

var startHeight, endHeight, curScrollY;
function SetHeight(progress) {	
	let curHeight = startHeight + progress * (endHeight - startHeight);
	workContent.style.height = curHeight + "px";
	
	if (button.status == ButtonStatus.loadMore)
		window.scrollTo(window.scrollX, curScrollY);
}

function UpdateScroll() {
	curScrollY = window.scrollY;
}

function AnimateWorkHeight(OnFinish = null) {
	workContent.style.height = startHeight + "px";

	window.addEventListener("scroll", UpdateScroll);

	Animate(EaseInOutSine, SetHeight, transitionDuration, function () {
		workContent.style.height = "auto";
		if (OnFinish != null)
			OnFinish();
	});
}

function LoadMoreWork() {
	for (let image of extraImages) {
		image.style.display = "block";
	}
}

function ShowLessWork() {
	for (let image of extraImages) {
		image.style.display = "none";
	}
}

function OnButtonClick() {
	if (button.status == ButtonStatus.loadMore) {
		curScrollY = window.scrollY;

		startHeight = workContent.scrollHeight;
		LoadMoreWork();
		endHeight = workContent.scrollHeight;

		AnimateWorkHeight(function () {
			buttonText.innerHTML = "show less";
			button.status = ButtonStatus.showLess;
		});

	} else {
		{
			let t = startHeight;
			startHeight = endHeight;
			endHeight = t;
		}

		AnimateWorkHeight(function () {
			buttonText.innerHTML = "load more work";
			button.status = ButtonStatus.loadMore;

			ShowLessWork();
		});
	}

}


button.status = ButtonStatus.loadMore;
button.addEventListener("click", OnButtonClick);