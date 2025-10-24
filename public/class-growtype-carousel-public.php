<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Growtype_Carousel
 * @subpackage growtype_carousel/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Growtype_Carousel
 * @subpackage growtype_carousel/public
 * @author     Your Name <email@example.com>
 */
class Growtype_Carousel_Public
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $growtype_carousel The ID of this plugin.
     */
    private $growtype_carousel;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @param string $growtype_carousel The name of the plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */
    public function __construct($growtype_carousel, $version)
    {
        $this->growtype_carousel = $growtype_carousel;
        $this->version = $version;

        add_action('wp_footer', array ($this, 'growtype_carousel_add_scripts_to_footer'));
    }

    /***
     *
     */
    function growtype_carousel_add_scripts_to_footer()
    {
        ?>
        <script type="text/javascript">
            window.growtypeCarousel = {};
        </script>
        <?php
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {
        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Growtype_Carousel_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Growtype_Carousel_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        wp_enqueue_style($this->growtype_carousel, GROWTYPE_CAROUSEL_URL_PUBLIC . 'styles/growtype-carousel.css', array (), $this->version, 'all');
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {
        /**
         * Slick-carousel
         */
        wp_enqueue_script('slick.min.js', GROWTYPE_CAROUSEL_URL_PUBLIC . 'vendor/slick-carousel/slick/slick.min.js', ['jquery'], null, true);
        wp_enqueue_style('slick.css', GROWTYPE_CAROUSEL_URL_PUBLIC . 'vendor/slick-carousel/slick/slick.css', false, null);
        wp_enqueue_style('slick-theme.css', GROWTYPE_CAROUSEL_URL_PUBLIC . 'vendor/slick-carousel/slick/slick-theme.css', false, null);

        if (!is_admin()) {
            wp_enqueue_script($this->growtype_carousel, GROWTYPE_CAROUSEL_URL_PUBLIC . 'scripts/growtype-carousel.js', array ('jquery'), $this->version, true);
        }
    }
}
