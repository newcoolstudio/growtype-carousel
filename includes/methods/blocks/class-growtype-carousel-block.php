<?php

/**
 *
 */
class Growtype_Carousel_Block
{
    function __construct()
    {
        add_action('init', array ($this, 'create_block_growtype_carousel_block_init'));
    }

    function create_block_growtype_carousel_block_init()
    {
        register_block_type_from_metadata(GROWTYPE_CAROUSEL_PATH . 'build', [
            'render_callback' => array ($this, 'render_callback_growtype_carousel'),
        ]);
    }

    /**
     * @param $block_attributes
     * @param $content
     * @return mixed
     */
    function render_callback_growtype_carousel($attr, $content)
    {
        $hasArrows = isset($attr['arrows']) && $attr['arrows'] == 'true' ? true : false;

        $parameters['id'] = isset($attr['sliderId']) && !empty($attr['sliderId']) ? $attr['sliderId'] : 'growtype-carousel-' . md5(rand());
        $parameters['type'] = $attr['carouselType'];
        $parameters['overflow'] = $attr['overflowInitial'] ? 'initial' : 'hidden';
        $parameters['counter'] = isset($attr['counter']) && filter_var($attr['counter'], FILTER_VALIDATE_BOOLEAN) ? true : false;
        $parameters['dots'] = isset($attr['dots']) && filter_var($attr['dots'], FILTER_VALIDATE_BOOLEAN) ? true : false;
        $parameters['showDotLabel'] = isset($attr['showDotLabel']) && filter_var($attr['showDotLabel'], FILTER_VALIDATE_BOOLEAN) ? true : false;

        $content = '<div id="' . $parameters['id'] . '" 
        class="growtype-carousel-wrapper ' . ($hasArrows ? "has-arrows" : "") . '" 
        data-type="' . $parameters['type'] . '"
        data-dots="' . ($parameters['dots'] ? 'true' : 'false') . '"
        data-slides-amount="' . substr_count($content, 'wp-block-growtype-carousel-slide') . '" 
        data-overflow="' . $parameters['overflow'] . '"
        >' . $content . ($parameters['counter'] ? '<div class="growtype-carousel-counter"></div>' : '') . '</div>';

        /**
         * Standard settings
         */
        $parameters['settings'] = [
            'infinite' => isset($attr['infinite']) && $attr['infinite'] == 'true' ? true : false,
            'centerMode' => isset($attr['centerMode']) && $attr['centerMode'] == 'true' ? true : false,
            'arrows' => $hasArrows,
            'dots' => $parameters['dots'],
            'autoplay' => isset($attr['autoplay']) && $attr['autoplay'] == 'true' ? true : false,
            'vertical' => isset($attr['vertical']) && $attr['vertical'] == 'true' ? true : false,
            'slidesToShow' => (int)$attr['slidesToShow'],
            'slidesToScroll' => (int)$attr['slidesToScroll'],
            'autoplaySpeed' => (int)$attr['autoplaySpeed'],
            'speed' => (int)$attr['speed'],
            'cssEase' => $attr['cssEase'],
            'pauseOnHover' => isset($attr['pauseOnHover']) && $attr['pauseOnHover'] == 'true' ? true : false,
            'fade' => isset($attr['transitionStyle']) && $attr['transitionStyle'] == 'fade' ? true : false,
            'draggable' => isset($attr['draggable']) && $attr['draggable'] == 'true' ? true : false,
            'responsive' => [
                [
                    'breakpoint' => (int)$attr['responsiveTabletWidth'],
                    'settings' => [
                        'slidesToShow' => (int)$attr['responsiveTabletSlidesToShow'],
                        'slidesToScroll' => (int)$attr['responsiveTabletSlidesToScroll'],
                        'centerMode' => $attr['responsiveTabletCenterMode'] == 'true' ? true : false,
                        'arrows' => $attr['responsiveTabletArrows'] == 'true' ? true : false,
                        'dots' => $attr['responsiveTabletDots'] == 'true' ? true : false,
                    ]
                ],
                [
                    'breakpoint' => (int)$attr['responsiveMobileWidth'],
                    'settings' => [
                        'slidesToShow' => (int)$attr['responsiveMobileSlidesToShow'],
                        'slidesToScroll' => (int)$attr['responsiveMobileSlidesToScroll'],
                        'centerMode' => $attr['responsiveMobileCenterMode'] == 'true' ? true : false,
                        'arrows' => $attr['responsiveMobileArrows'] == 'true' ? true : false,
                        'dots' => $attr['responsiveMobileDots'] == 'true' ? true : false,
                        'swipe' => $attr['responsiveMobileSwipe'] == 'true' ? true : false,
                    ]
                ]
            ],
        ];

        /**
         * Pass values to frontend
         */
        add_action('wp_footer', function () use ($parameters) { ?>
            <script type="text/javascript">
                window.growtypeCarousel['<?php echo $parameters['id'] ?>'] = {
                    parameters: JSON.parse('<?php echo json_encode($parameters) ?>')
                };
            </script>
        <?php }, 100);

        return $content;
    }
}
