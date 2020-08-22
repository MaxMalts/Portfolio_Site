var WorkPopup_namespace = function () {

	var popup = document.getElementById("work__popup");
	var container = document.getElementById("work__popup__container");
	var popupImage = document.getElementById("work__popup__image");
	var content = document.getElementById("work__content");


	function ThumbnailSrc(element) {
		var error = new Error("element does not match a thumbnail template");
		error.name = "NotThumbnailError";

		var workItem = element.closest(".work__item");
		if (!workItem)
			throw error;
		
		var workImage = workItem.getElementsByClassName("work__image")[0];
		if (!workImage)
			throw error;
		
		return workImage.getAttribute("src");
	}


	function MatchedPopupSrc(thumbSrc) {
		const postfix = "-large";  // added to end of file name

		if (typeof thumbSrc != "string" || thumbSrc == "") {
			throw new TypeError("bad thumbSrc argument");
		}
		
		var dotInd = thumbSrc.indexOf('.');
		if (dotInd == -1)
			var res = thumbSrc + postfix;
		else
			var res = thumbSrc.slice(0, dotInd) + postfix + thumbSrc.slice(dotInd);

		return res;
	}


	function ShowPopup(imgSrc) {
		popupImage.setAttribute("src", imgSrc);

		popup.style.display = "block";
		CssAnimationIteration(popup);
		CssAnimationIteration(container);

		popupImage.addEventListener("load", function () {
			FitImage(popupImage);
		});
	}


	function HandleThumbClick(event) {
		var clickedThumb = event.target;
		var thumbSrc = ThumbnailSrc(clickedThumb);
		if (!thumbSrc)
			throw new Error("Bad src attribute on thumbnail");
		
		var popupSrc = MatchedPopupSrc(thumbSrc);

		ShowPopup(popupSrc);
	}



	function HandlePopupClick() {
		if (getComputedStyle(popup).animationPlayState == "paused") {
			var listener = function () {
				popup.style.display = "none";

				popup.removeEventListener("animationiteration", listener);
			}
			popup.addEventListener("animationiteration", listener);

			CssAnimationIteration(popup);
			CssAnimationIteration(container);
		}
	}


	content.addEventListener("click", HandleThumbClick);
	popup.addEventListener("click", HandlePopupClick);

}

WorkPopup_namespace();