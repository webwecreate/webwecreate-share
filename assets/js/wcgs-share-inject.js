( function () {
    'use strict';

    // เปลี่ยน icon ที่นี่ที่เดียว
    const SHARE_ICON_URL = '/wp-content/uploads/2026/04/upload.png';

    function injectShareButtons() {
        const slides = document.querySelectorAll(
            '.wcgs-carousel .spswiper-slide .wcgs-slider-image'
        );

        slides.forEach( ( wrapper ) => {
            if ( wrapper.parentElement.querySelector( '.wcgs-share-bar' ) ) return;

            const img = wrapper.querySelector( 'img[data-image]' );
            if ( ! img ) return;

            const btn = document.createElement( 'button' );
            btn.className  = 'wwc-share-btn';
            btn.setAttribute( 'aria-label', 'Share this image' );
            btn.dataset.url   = img.dataset.image;
            btn.dataset.title = document.title;
            btn.dataset.image = img.dataset.image;

            btn.innerHTML = `<img src="${SHARE_ICON_URL}" alt="Share" width="20" height="20" style="display:block">`;

            const bar = document.createElement( 'div' );
            bar.className = 'wcgs-share-bar';
            bar.appendChild( btn );

            // แก้: inject เข้า .spswiper-slide (parent) แทน .wcgs-slider-image
            wrapper.parentElement.appendChild( bar );
        } );
    }

    document.addEventListener( 'DOMContentLoaded', () => {
        setTimeout( injectShareButtons, 500 );
    } );

} )();