<?php
/**
 * Plugin Name: WebWeCreate Share
 * Description: Web Share API + clipboard fallback for .pf-share-btn
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function wwc_share_enqueue() {
    wp_enqueue_script(
        'wwc-share',
        plugin_dir_url( __FILE__ ) . 'assets/js/share.js',
        [],          // ไม่พึ่ง jQuery
        '1.0.0',
        true         // load ใน footer
    );
}
add_action( 'wp_enqueue_scripts', 'wwc_share_enqueue' );
?>