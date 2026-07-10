document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. AKORDEON ETKİLEŞİMİ (ACCORDION LOGIC)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const contentId = header.getAttribute('aria-controls');
            const contentEl = document.getElementById(contentId);
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Mevcut durumu tersine çevir
            header.setAttribute('aria-expanded', !isExpanded);
            contentEl.setAttribute('aria-hidden', isExpanded);
            
            // Eğer açıldıysa ve mobilde ekran dışına kaydıysa hafifçe kaydır
            if (!isExpanded) {
                setTimeout(() => {
                    header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });

    // Varsayılan olarak ilk akordeonu (Ahşap Mobilya) açık başlat
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }

    /* ==========================================================================
       2. REHBERE EKLE (VCARD GENERATOR)
       ========================================================================== */
    const contactBtn = document.getElementById('add-to-contacts');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            // vCard içeriği (UTF-8 kodlaması ve doğru format ile)
            const vcardData = [
                'BEGIN:VCARD',
                'VERSION:3.0',
                'FN:Cengiz Gülbeden',
                'N:Gülbeden;Cengiz;;;',
                'ORG:Cengiz Gülbeden Mobilya',
                'TITLE:Mobilya Tasarım & İmalat',
                'TEL;TYPE=CELL;TYPE=VOICE;TYPE=pref:+905439586969',
                'TEL;TYPE=WORK;TYPE=whatsapp:+905305426565',
                'EMAIL;TYPE=PREF;INTERNET:cengizgulbeden38@gmail.com',
                'NOTE:Ahşap, Ametal ve Metal Mobilya Özel Tasarım ve İmalatı',
                'URL:https://www.linkprofilde.com/cengizgulbedenn',
                'END:VCARD'
            ].join('\r\n');
            
            // Blob oluştur ve indir
            const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'Cengiz_Gulbeden.vcf';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
            
            // Butona tıklandı efekti (kısa süreli renk değişimi)
            const originalText = contactBtn.querySelector('span').textContent;
            contactBtn.querySelector('span').textContent = 'İndirildi!';
            contactBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)'; // Yeşile döner
            
            setTimeout(() => {
                contactBtn.querySelector('span').textContent = originalText;
                contactBtn.style.background = ''; // Eski stile döner
            }, 2000);
        });
    }

    /* ==========================================================================
       3. GELİŞMİŞ GÖRSEL LIGHTBOX (LIGHTBOX GALLERY)
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // Tüm galeri kartlarını ve kaynaklarını topla
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    let currentIndex = 0;
    
    // Lightbox Açma
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        const card = galleryCards[currentIndex];
        const imgSrc = card.getAttribute('data-img-src');
        const imgAlt = card.querySelector('.gallery-img').getAttribute('alt');
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = imgAlt;
        
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Sayfa kaydırmasını kilitle
    }
    
    // Lightbox Kapatma
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Kilidi aç
        
        // Animasyon bittikten sonra src'yi temizle
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        // Görsele veya kontrollere tıklanmadıysa (arka plana tıklandıysa) kapat
        if (e.target === lightbox || e.target === document.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });
    
    // Önceki Görsel
    function showPrev() {
        if (galleryCards.length === 0) return;
        currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
        updateLightboxContent();
    }
    
    // Sonraki Görsel
    function showNext() {
        if (galleryCards.length === 0) return;
        currentIndex = (currentIndex + 1) % galleryCards.length;
        updateLightboxContent();
    }
    
    function updateLightboxContent() {
        // Yumuşak geçiş hissi için görseli hafifçe karartıp açalım
        lightboxImg.style.opacity = '0.3';
        lightboxImg.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            const card = galleryCards[currentIndex];
            const imgSrc = card.getAttribute('data-img-src');
            const imgAlt = card.querySelector('.gallery-img').getAttribute('alt');
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = imgAlt;
            
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 150);
    }
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    
    // Klavye Kontrolleri (Desktop dostu)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });
});
