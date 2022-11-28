<?php

/**
 * Class Growtype_Carousel_In_Gallery
 */
class Growtype_Carousel_Shortcode
{
    public function __construct()
    {
        if (!is_admin() && !wp_is_json_request()) {
            add_shortcode('growtype_carousel', array ($this, 'growtype_carousel_shortcode'));
        }
    }

    /**
     *
     */
    function growtype_carousel_shortcode($attributes)
    {
        return '';
    }
}
