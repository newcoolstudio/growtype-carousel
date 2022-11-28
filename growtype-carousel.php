<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://growtype.com/
 * @since             1.0.0
 * @package           Growtype_Carousel
 *
 * @wordpress-plugin
 * Plugin Name:       Growtype - Carousel
 * Plugin URI:        http://growtype.com/
 * Description:       Advanced carousel functionality for modern websites.
 * Version:           1.0.0
 * Author:            Growtype
 * Author URI:        http://growtype.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       growtype-carousel
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('GROWTYPE_CAROUSEL_VERSION', '1.0.0');

/**
 * Plugin base name
 */
define('GROWTYPE_CAROUSEL_BASE_NAME', 'growtype-carousel');

/**
 * Plugin dir path
 */
define('GROWTYPE_CAROUSEL_PATH', plugin_dir_path(__FILE__));

/**
 * Plugin url
 */
define('GROWTYPE_CAROUSEL_URL', plugin_dir_url(__FILE__));

/**
 * Plugin url public
 */
define('GROWTYPE_CAROUSEL_URL_PUBLIC', plugin_dir_url(__FILE__) . 'public/');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-growtype-carousel-activator.php
 */
function activate_growtype_carousel()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-growtype-carousel-activator.php';
    Growtype_Carousel_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-growtype-carousel-deactivator.php
 */
function deactivate_growtype_carousel()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-growtype-carousel-deactivator.php';
    Growtype_Carousel_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_growtype_carousel');
register_deactivation_hook(__FILE__, 'deactivate_growtype_carousel');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-growtype-carousel.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_growtype_carousel()
{
    $plugin = new Growtype_Carousel();
    $plugin->run();
}

run_growtype_carousel();
