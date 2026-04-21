( function () {
    'use strict';

    // ---- Platform config — เพิ่ม/ลดได้ตามต้องการ ----
    const PLATFORMS = [
        {
            id:    'facebook',
            label: 'Facebook',
            color: '#1877F2',
            icon:  'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
            fill:  false,
            url:   ( u ) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
        },
        {
            id:    'twitter',
            label: 'X (Twitter)',
            color: '#000',
            icon:  'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.985l4.265 5.658zm-1.161 17.52h1.833L7.084 4.126H5.117z',
            fill:  true,
            url:   ( u, t ) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
        },
        {
            id:    'threads',
            label: 'Threads',
            color: '#000',
            icon:  'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.934.256-2.642 1.175l-1.607-1.283c.92-1.197 2.367-1.897 4.255-1.954h.044c3.337.017 5.188 1.986 5.568 5.38.026.226.042.455.047.688.019.823-.085 1.51-.31 2.047.508.474.904 1.032 1.175 1.661.733 1.677.773 4.404-1.425 6.556-1.764 1.726-3.931 2.496-7.02 2.52zm.029-9.26c-.093 0-.189.003-.284.009-1.973.114-2.881.971-2.842 1.98.04 1.02.952 1.595 2.404 1.514 1.2-.064 2.06-.509 2.558-1.32.35-.573.532-1.344.537-2.29a11.51 11.51 0 0 0-2.373-.893z',
            fill:  true,
            url:   ( u, t ) => `https://www.threads.net/intent/post?text=${t}%20${u}`,
        },
        {
            id:    'line',
            label: 'LINE',
            color: '#06C755',
            icon:  'M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.437-6.959C23.368 13.458 24 12.02 24 10.314',
            fill:  true,
            url:   ( u, t ) => `https://social-plugins.line.me/lineit/share?url=${u}&text=${t}`,
        },
        {
            id:    'whatsapp',
            label: 'WhatsApp',
            color: '#25D366',
            icon:  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413',
            fill:  true,
            url:   ( u, t ) => `https://api.whatsapp.com/send?text=${t}%20${u}`,
        },
        {
            id:      'instagram',
            label:   'Instagram',
            color:   '#E1306C',
            icon:    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
            fill:    true,
            action:  'copy-open',   // special type
            appUrl:  'instagram://', // deep link เปิด app
            copyMsg: 'คัดลอก link แล้ว! เปิด Instagram แล้ววางได้เลย',
        },
        {
            id:      'tiktok',
            label:   'TikTok',
            color:   '#010101',
            icon:    'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z',
            fill:    true,
            action:  'copy-open',
            appUrl:  'snssdk1233://',
            copyMsg: 'คัดลอก link แล้ว! เปิด TikTok แล้ววางได้เลย',
        },
        {
            id:    'copy',
            label: 'Copy Link',
            color: '#6B7280',
            icon:  'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
            fill:  false,
            url:   null,
        },
    ];

    function showToast( msg ) {
        document.querySelector( '.wwc-toast' )?.remove();
        const toast = document.createElement( 'div' );
            toast.className = 'wwc-toast';
            toast.textContent = msg;
                document.body.appendChild( toast );
                setTimeout( () => toast.remove(), 3000 );
    }

    // ---- Build SVG icon ----
    function buildIcon( pathD, fill = false ) {
        return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            style="fill:${fill ? '#fff' : 'none'};stroke:${fill ? 'none' : '#fff'};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;width:26px;height:26px">
            <path d="${pathD}"/>
        </svg>`;
    }

    // ---- Show fallback modal ----
    function showModal( shareUrl, shareTitle ) {
        injectStyles();

        // ลบ modal เก่าถ้ามี
        document.getElementById( 'wwc-share-overlay' )?.remove();

        const enc = encodeURIComponent;

        const overlay = document.createElement( 'div' );
        overlay.id = 'wwc-share-overlay';

        const modal = document.createElement( 'div' );
        modal.id = 'wwc-share-modal';
        modal.innerHTML = `<h3>แชร์</h3>`;

        // Grid ปุ่ม platform
        const grid = document.createElement( 'div' );
        grid.className = 'wwc-share-grid';

        PLATFORMS.forEach( ( p ) => {
            const btn = document.createElement( 'button' );
            btn.className = 'wwc-share-platform';
            btn.dataset.id = p.id;
            btn.setAttribute( 'aria-label', p.label );

            // icon ที่มี path เดียว → stroke; LINE/WhatsApp → fill
            const isFill = [ 'line', 'whatsapp', 'twitter' ].includes( p.id );
            btn.innerHTML = `
                <span class="wwc-icon-wrap" style="background:${p.color}">
                    ${buildIcon( p.icon, isFill )}
                </span>
                <span>${p.label}</span>
            `;

            btn.addEventListener( 'click', async () => {
            // --- Copy Link ธรรมดา ---
            if ( p.id === 'copy' ) {
                try { await navigator.clipboard.writeText( shareUrl ); }
                catch { window.prompt( 'Copy this link:', shareUrl ); }
                const label = btn.querySelector( 'span:last-child' );
                label.innerHTML = 'Copied! <span class="wwc-copied-badge">✓</span>';
                setTimeout( () => { label.textContent = 'Copy Link'; }, 2500 );
                return;
            }

            // --- Instagram / TikTok: copy แล้วพยายามเปิด app ---
            if ( p.action === 'copy-open' ) {
                try { await navigator.clipboard.writeText( shareUrl ); }
                catch { window.prompt( 'Copy this link:', shareUrl ); }

                const label = btn.querySelector( 'span:last-child' );
                const origLabel = label.textContent;
                label.innerHTML = 'Copied! <span class="wwc-copied-badge">✓</span>';
                setTimeout( () => { label.textContent = origLabel; }, 2500 );

                // แสดง toast บอก user
                showToast( p.copyMsg );

                // พยายามเปิด app (mobile deep link) — desktop จะ fail เงียบๆ
                setTimeout( () => { window.location.href = p.appUrl; }, 300 );
                return;
            }

            // --- Platform ปกติ (Facebook, X, LINE ฯลฯ) ---
            const platformUrl = p.url( enc( shareUrl ), enc( shareTitle ) );
            window.open( platformUrl, '_blank', 'noopener,width=600,height=500' );
            closeModal();
        } );

            grid.appendChild( btn );
        } );

        modal.appendChild( grid );

        // ปุ่มปิด
        const closeBtn = document.createElement( 'button' );
        closeBtn.id = 'wwc-share-close';
        closeBtn.textContent = 'ยกเลิก';
        closeBtn.addEventListener( 'click', closeModal );
        modal.appendChild( closeBtn );

        overlay.appendChild( modal );
        document.body.appendChild( overlay );

        // คลิก overlay ด้านนอก → ปิด
        overlay.addEventListener( 'click', ( e ) => {
            if ( e.target === overlay ) closeModal();
        } );
    }

    function closeModal() {
        const overlay = document.getElementById( 'wwc-share-overlay' );
        if ( overlay ) {
            overlay.style.animation = 'wwcFadeIn .15s ease reverse';
            setTimeout( () => overlay.remove(), 140 );
        }
    }

    // ---- Fetch image → File ----
    async function fetchImageFile( url ) {
        try {
            const res  = await fetch( url, { mode: 'cors' } );
            const blob = await res.blob();
            const name = url.split( '/' ).pop().split( '?' )[ 0 ] || 'image.jpg';
            return new File( [ blob ], name, { type: blob.type } );
        } catch {
            return null;
        }
    }

    // ---- Main handler ----
    async function handleShare( btn ) {
        const url    = btn.dataset.url   || location.href;
        const title  = btn.dataset.title || document.title;
        const imgSrc = btn.dataset.image || '';

        if ( navigator.share ) {
            const shareData = { url, title };
            if ( imgSrc && navigator.canShare ) {
                const file = await fetchImageFile( imgSrc );
                if ( file && navigator.canShare( { files: [ file ] } ) ) {
                    shareData.files = [ file ];
                }
            }
            try {
                await navigator.share( shareData );
            } catch ( err ) {
                if ( err.name !== 'AbortError' ) showModal( url, title );
            }
            return;
        }

        // Desktop fallback → modal
        showModal( url, title );
    }

    // ---- Event delegation ----
    document.addEventListener( 'click', function ( e ) {
        const btn = e.target.closest( '.wwc-share-btn' );
        if ( ! btn ) return;
        e.preventDefault();
        handleShare( btn );
    } );

} )();