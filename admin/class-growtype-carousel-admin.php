<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Growtype_Carousel
 * @subpackage growtype_carousel/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Growtype_Carousel
 * @subpackage growtype_carousel/admin
 * @author     Your Name <email@example.com>
 */
class Growtype_Carousel_Admin
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
     * Traits
     */

    /**
     * Initialize the class and set its properties.
     *
     * @param string $growtype_carousel The name of this plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */
    public function __construct($growtype_carousel, $version)
    {
        $this->growtype_carousel = $growtype_carousel;
        $this->version = $version;

        if (is_admin()) {
            add_action('admin_menu', array ($this, 'add_options_page'));

            /**
             * Load methods
             */
            add_action('admin_init', array ($this, 'add_options_settings'));
        }
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in growtype_carousel as all of the hooks are defined
         * in that particular class.
         *
         * The growtype_carousel will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style($this->growtype_carousel, plugin_dir_url(__FILE__) . 'css/growtype-carousel-admin.css', array (), $this->version, 'all');

    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
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

        wp_enqueue_script($this->growtype_carousel, plugin_dir_url(__FILE__) . 'js/growtype-carousel-admin.js', array ('jquery'), $this->version, false);

    }

    /**
     * Register the options page with the Wordpress menu.
     */
    function add_options_page()
    {
        add_options_page(
            'Growtype - Carousel',
            'Growtype - Carousel',
            'manage_options',
            'growtype-carousel-settings',
            array ($this, 'growtype_carousel_settings'),
            1
        );
    }

    /**
     * @param $current
     * @return void
     */
    function growtype_carousel_settings_tabs($current = 'login')
    {
    }

    /**
     * @return void
     */
    function growtype_carousel_settings()
    {
    }

    /**
     * Load the required methods for this plugin.
     *
     */
    public function add_options_settings()
    {
    }
}
