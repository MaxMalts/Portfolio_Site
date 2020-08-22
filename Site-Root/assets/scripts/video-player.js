var VideoPlayer_namespace = function () {

	function AddVideoElement(playerInsights, playerElem) {
		var videos = playerElem.getElementsByClassName("video-player__video");
		if (videos.length == 0) {
			console.warn("No video element on video player. (%o)", playerElem);
			playerInsights.video = null;

		} else {
			playerInsights.video = videos[0];
		}
	}


	function AddMuteBtn(playerInsights, playerElem) {
		var muteBtns = playerElem.getElementsByClassName("video-player__mute-btn");
		if (muteBtns.length == 0) {
			playerInsights.muteBtn = null;
			playerInsights.muteBtn_unmuted = null;
			playerInsights.muteBtn_muted = null;

		} else {
			playerInsights.muteBtn = muteBtns[0];

			var unmutedElems = playerInsights.muteBtn.getElementsByClassName("video-player__mute-btn_unmuted");
			if (unmutedElems.length == 0) {
				console.warn("Mute button is without unmuted element inside. (%o)", playerElem);
				playerInsights.muteBtn_unmuted = null;

			} else {
				playerInsights.muteBtn_unmuted = unmutedElems[0];
			}

			var mutedElems = playerInsights.muteBtn.getElementsByClassName("video-player__mute-btn_muted");
			if (mutedElems.length == 0) {
				console.warn("Mute button is without muted element inside. (%o)", playerElem);
				playerInsights.muteBtn_muted = null;

			} else {
				playerInsights.muteBtn_muted = mutedElems[0];
			}
		}
	}


	function AddPlayBtn(playerInsights, playerElem) {
		var playBtns = playerElem.getElementsByClassName("video-player__play-btn");
		if (playBtns.length == 0) {
			playerInsights.playBtn = null;
			playerInsights.playBtn_play = null;

		} else {
			playerInsights.playBtn = playBtns[0];

			var playElems = playerInsights.playBtn.getElementsByClassName("video-player__play-btn_play");
			if (playElems.length == 0) {
				console.warn("Play button is without play element inside. (%o)", playerElem);
				playerInsights.playBtn_play = null;

			} else {
				playerInsights.playBtn_play = playElems[0];
			}

			/* You can add the pause element here similary. */
		}
	}


	function CreateVideoPlayer(playerElem) {
		var res = { player: playerElem };
		AddVideoElement(res, playerElem);
		AddPlayBtn(res, playerElem);
		AddMuteBtn(res, playerElem);

		return res;
	}



	function HandlePlayerClick(playerInsights) {
		if (playerInsights.video == null) {
			console.error("Player (%o) doesn't have video element.", playerInsights.player);
			return;
		}

		if (playerInsights.video.paused)
			playerInsights.video.play();
		else
			playerInsights.video.pause();
	}


	function HandleVideoPlay(playerInsights) {
		if (playerInsights.playBtn != null) {
			playerInsights.playBtn.style.opacity = 0;

			let TransEndListener = function () {
				playerInsights.playBtn.style.display = "none";

				TransCancelListener();
			}
			let TransCancelListener = function () {
				playerInsights.playBtn.removeEventListener("transitionend", TransEndListener);
				playerInsights.playBtn.removeEventListener("transitioncancel", TransCancelListener);
			}
			playerInsights.playBtn.addEventListener("transitionend", TransEndListener);
			playerInsights.playBtn.addEventListener("transitioncancel", TransCancelListener);
		}
	}

	function HandleVideoPause(playerInsights) {
		if (playerInsights.playBtn != null) {
			playerInsights.playBtn.style.opacity = 1;
			playerInsights.playBtn.style.display = null;
		}
	}


	function HandleMuteBtnClick(playerInsights) {
		if (playerInsights.video == null) {
			console.error("Player (%o) doesn't have video element.", playerInsights.player);
			return;

		} else {
			if (playerInsights.muteBtn_unmuted == null) {
				console.error("Mute button is without unmuted element inside. (%o)", playerElem);
				return;
			}
			if (playerInsights.muteBtn_muted == null) {
				console.error("Mute button is without muted element inside. (%o)", playerElem);
				return;
			}
		}


		if (!playerInsights.video.muted) {
			playerInsights.video.muted = true;
			playerInsights.muteBtn_muted.style.display = null;
			playerInsights.muteBtn_unmuted.style.display = "none";

		} else {
			playerInsights.video.muted = false;
			playerInsights.muteBtn_muted.style.display = "none";
			playerInsights.muteBtn_unmuted.style.display = null
			;
		}
	}


	function InitPlayer(playerInsights) {
		if (playerInsights.video == null) {
			console.error("Player (%o) doesn't have video element.", playerInsights.player);
			return;
		}

		if (playerInsights.playBtn != null) {
			playerInsights.video.addEventListener("play", function () {
				HandleVideoPlay(playerInsights);
			});
			playerInsights.video.addEventListener("pause", function () {
				HandleVideoPause(playerInsights);
			})
		}

		playerInsights.player.addEventListener("click", function () {
			HandlePlayerClick(playerInsights);
		});

		if (playerInsights.muteBtn != null) {
			playerInsights.muteBtn.addEventListener("click", function (event) {
				HandleMuteBtnClick(playerInsights);
				event.stopPropagation();
			});
			playerInsights.video.muted = !playerInsights.video.muted;
			HandleMuteBtnClick(playerInsights);  // To hide one of the buttons
		}
	}


	var players = document.getElementsByClassName("video-player");
	for (curPlayer of players) {
		if (!(curPlayer.getAttribute("data-initialized") == "true")) {
			var playerInsides = CreateVideoPlayer(curPlayer);
			InitPlayer(playerInsides);
			curPlayer.setAttribute("data-initialized", "true");
		}
	}

}

VideoPlayer_namespace();