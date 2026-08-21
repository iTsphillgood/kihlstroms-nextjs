<?php
if(!defined('ABSPATH'))exit;
add_action('wp_enqueue_scripts',static function(){wp_enqueue_style('kihlstroms-enterprise',get_stylesheet_directory_uri().'/assets/css/site.css',[],'0.1.0');},20);
add_action('after_setup_theme',static function(){add_theme_support('editor-styles');add_editor_style('assets/css/site.css');add_theme_support('responsive-embeds');});
