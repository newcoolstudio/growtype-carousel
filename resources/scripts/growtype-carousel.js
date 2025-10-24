$ = jQuery;

$(document).ready(function () {
    Object.entries(window.growtypeCarousel).map(function (element) {
        renderSlider(element[0], element[1]);
    });

    function renderSlider(id, details) {
        let parameters = details['parameters'];
        let settings = parameters['settings'];
        let type = parameters['type'];
        let counterIsActive = parameters['counter'];
        let slickSlider = $('#' + id + ' .growtype-carousel');
        let slidesAmount = slickSlider.find('.wp-block-growtype-carousel-slide').length;
        let sliderIsValid = true;

        if (type === 'growtype/carousel-growtype-post') {
            slickSlider = $('#' + id + ' .growtype-post-container');
        } else if (type === 'growtype/carousel-growtype-gallery') {
            slickSlider = $('#' + id + ' .wp-block-growtype-gallery');
        } else if (type === 'growtype/carousel-slide') {
            let slidesToShow = settings['slidesToShow'] ?? '';
            settings['responsive'].map(function (element, index) {
                if ($(window).width() < element['breakpoint']) {
                    slidesToShow = element['settings']['slidesToShow'] ?? '';
                }
            });

            if (slidesToShow >= slidesAmount) {
                sliderIsValid = false;
            }
        }

        settings['customPaging'] = function (slider, i) {
            var slideElement = $(slider.$slides[i]);
            var slideName = slideElement.data('slide-name');
            var defaultLabel = (i + 1);
            var label = slideName ? slideName : defaultLabel;
            let showDotLabel = parameters['showDotLabel'];

            if (!showDotLabel) {
                label = '';
            }

            return '<button type="button" data-show-dot-label="' + showDotLabel + '" aria-label="' + label + '">' + label + '</button>';
        }

        if (slickSlider.length > 0 && sliderIsValid) {
            let counterElement = $('#' + id + '.growtype-carousel-wrapper .growtype-carousel-counter');
            let slidesAmount = slickSlider.children().length;

            if (slickSlider.closest('.growtype-carousel-wrapper').length > 1) {
                slickSlider.slick(settings);
            } else {
                setTimeout(function () {
                    slickSlider.slick(settings);
                }, 10);
            }

            if (counterIsActive) {
                growtype_carousel_update_counter(counterElement, 0, slidesAmount);

                slickSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                    growtype_carousel_update_counter(counterElement, currentSlide, slick.slideCount);
                });
            }
        }
    }

    document.addEventListener('growtypePostAjaxLoadContent', function (params) {
        let sliderId = $(params['detail']['wrapper']).closest('.growtype-carousel-wrapper').attr('id')
        let sliderDetails = window.growtypeCarousel[sliderId] ?? '';
        if (sliderDetails) {
            renderSlider(sliderId, sliderDetails);
        }
    })
});

function growtype_carousel_update_counter(counterElement, currentSlide, totalSlides) {
    let i = (currentSlide ? currentSlide : 0) + 1;
    counterElement.html('<span class="growtype-carousel-counter-slide">' + i + '</span> / <span class="growtype-carousel-counter-total"> ' + totalSlides + '</span>');
}
