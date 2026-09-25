<?php
/**
 * Plugin Name: Kihlströms Core
 * Description: Strukturerad data, lagerbilar, kampanjer, personal och anläggningar.
 * Version: 0.1.0
 * Requires at least: 6.7
 * Requires PHP: 8.1
 * Text Domain: kihlstroms
 */
if (!defined('ABSPATH')) exit;
define('KIHL_CORE_VERSION','0.1.0');
define('KIHL_CORE_PATH',plugin_dir_path(__FILE__));
require_once KIHL_CORE_PATH.'includes/class-content-model.php';
require_once KIHL_CORE_PATH.'includes/class-meta.php';
add_action('plugins_loaded',static function(){\Kihlstroms\Content_Model::init();\Kihlstroms\Meta::init();});
register_activation_hook(__FILE__,static function(){\Kihlstroms\Content_Model::register();flush_rewrite_rules();});
register_deactivation_hook(__FILE__,static function(){flush_rewrite_rules();});
