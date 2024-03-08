document.addEventListener('DOMContentLoaded', function() {
    var sliderVideoList = document.querySelector('.series-videos-carousel');
    var visibleVideoSlidesDesktop = 3;
    var currentSlide = 0;

    // Initialize video slider
    var videoWrappers = document.querySelectorAll('.single-video-wrapper');
    var videoSlides = document.querySelectorAll('.single-video-wrapper.visible');
    var totalSlides = videoSlides.length;
    var slideWidth = videoSlides[0].offsetWidth;
    var sliderWidth = totalSlides * slideWidth;
    sliderVideoList.style.width = sliderWidth + 'px';
    sliderVideoList.style.transform = 'translateX(0px)';

    // Toggle active class for video slider
    videoWrappers.forEach(function(wrapper) {
        wrapper.addEventListener('click', function() {
            videoWrappers.forEach(function(wrapper) {
                wrapper.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Sorting categories function
    var videoCategories = document.querySelectorAll('ul.series-categories-list li.video-cat');
    videoCategories.forEach(function(category) {
        category.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                var categoryClass = this.getAttribute('data-category');
                videoCategories.forEach(function(category) {
                    category.classList.remove('active');
                });
                this.classList.add('active');

                videoSlides.forEach(function(slide) {
                    slide.classList.remove('visible');
                    if (categoryClass === 'all-videos') {
                        slide.classList.add('visible');
                    } else if (slide.getAttribute('data-category').includes(categoryClass)) {
                        slide.classList.add('visible');
                    }
                });

                // Reset video slider
                currentSlide = 0;
                sliderVideoList.style.transform = 'translateX(0px)';
            }
        });
    });

    // Handle disabled arrows
    var prevArrow = document.querySelector('.series-videos-carousel .slick-prev');
    var nextArrow = document.querySelector('.series-videos-carousel .slick-next');

    function updateArrows() {
        if (currentSlide === 0) {
            prevArrow.classList.add('slick-disabled');
        } else {
            prevArrow.classList.remove('slick-disabled');
        }

        if (currentSlide >= totalSlides - visibleVideoSlidesDesktop) {
            nextArrow.classList.add('slick-disabled');
        } else {
            nextArrow.classList.remove('slick-disabled');
        }
    }

    updateArrows();

    // Handle video click
    videoWrappers.forEach(function(wrapper) {
        wrapper.addEventListener('click', function() {
            var videoID = this.getAttribute('data-youtube-id');
            var episodeItem = document.querySelector('.episode-wrapper .episode-item');
            episodeItem.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoID + '?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
            episodeItem.querySelector('iframe').src += "&autoplay=1&showinfo=0";
            window.scrollTo({
                top: document.querySelector('.episode-wrapper').offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Handle arrow clicks
    prevArrow.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            var slideOffset = -currentSlide * slideWidth;
            sliderVideoList.style.transform = 'translateX(' + slideOffset + 'px)';
            updateArrows();
        }
    });

    nextArrow.addEventListener('click', function() {
        if (currentSlide < totalSlides - visibleVideoSlidesDesktop) {
            currentSlide++;
            var slideOffset = -currentSlide * slideWidth;
            sliderVideoList.style.transform = 'translateX(' + slideOffset + 'px)';
            updateArrows();
        }
    });
});
