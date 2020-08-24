var Reviews_namespace = function () {
	
	var swiper = new Swiper(".swiper-container", {
		simulateTouch: false,
		loop: true,
		speed: 400,
		resistance: false,

		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				var res = `<span class="${className}">
					<span class="${className}__inner"></span>
				</span>`;

				return res;
			}
		},

		autoplay: {
			delay: 3000,
			disableOnIteraction: true
		}
	});

	var reviewsCont = document.getElementById("reviews__swiper-container");

	reviewsCont.addEventListener("click", function () {
		swiper.slideNext();
	})

}

Reviews_namespace();