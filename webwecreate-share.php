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

function wwc_share_shortcode( $atts ) {
    $atts = shortcode_atts( [
        'url'   => get_permalink(),
        'title' => get_the_title(),
        'image' => get_the_post_thumbnail_url( null, 'large' ) ?: '',
        'label' => '',        // ข้อความในปุ่ม (optional)
        'class' => '',        // class เพิ่มเติม (optional)
    ], $atts, 'wwc_share' );

    $classes = trim( 'wwc-share-btn ' . esc_attr( $atts['class'] ) );

    ob_start(); ?>
    <button class="<?php echo $classes; ?>"
            data-url="<?php echo esc_url( $atts['url'] ); ?>"
            data-title="<?php echo esc_attr( $atts['title'] ); ?>"
            data-image="<?php echo esc_url( $atts['image'] ); ?>"
            aria-label="Share">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <?php if ( $atts['label'] ) echo '<span>' . esc_html( $atts['label'] ) . '</span>'; ?>
    </button>
    <?php
    return ob_get_clean();
}
add_shortcode( 'wwc_share', 'wwc_share_shortcode' );
?>