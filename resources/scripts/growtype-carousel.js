$ = jQuery;

$(document).ready(function () {
    Object.entries(window.growtypeCarousel).map(function (element) {
        let id = element[0];
        let parameters = element[1]['parameters'];
        let type = element[1]['type'];
        let counterIsActive = element[1]['counter'];

        let slickSlider = $('#' + id + ' .growtype-carousel');

        let slidesAmount = slickSlider.find('.wp-block-growtype-carousel-slide').length;
        let sliderIsValid = true;

        if (type === 'growtype/carousel-growtype-post') {
            slickSlider = $('#' + id + ' .growtype-post-container');
        } else if (type === 'growtype/carousel-growtype-gallery') {
            slickSlider = $('#' + id + ' .wp-block-growtype-gallery');
        } else if (type === 'growtype/carousel-slide') {
            if (parameters['slidesToShow'] >= slidesAmount) {
                sliderIsValid = false;
            }
        }

        if (slickSlider.length > 0 && sliderIsValid) {
            let counterElement = $('#' + id + '.growtype-carousel-wrapper .growtype-carousel-counter');
            let slidesAmount = slickSlider.children().length;

            slickSlider.slick(parameters);

            if (counterIsActive) {
                growtype_carousel_update_counter(counterElement, 0, slidesAmount);

                slickSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                    growtype_carousel_update_counter(counterElement, currentSlide, slick.slideCount);
                });
            }
        }
    });
});

function growtype_carousel_update_counter(counterElement, currentSlide, totalSlides) {
    let i = (currentSlide ? currentSlide : 0) + 1;
    counterElement.html('<span class="growtype-carousel-counter-slide">' + i + '</span> / <span class="growtype-carousel-counter-total"> ' + totalSlides + '</span>');
}
