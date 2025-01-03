// ✅ Détection de l'appareil
const isMobile = window.innerWidth <= 768;

// ✅ Version Desktop : Carrés actuels
if (!isMobile) {
    const container = document.querySelector('#container');
    const finalColumns = 5;
    const finalRows = 3;
    const squareSizePx = 246;
    const finalWidthPx = finalColumns * squareSizePx;   
    const finalHeightPx = finalRows * squareSizePx;     

    function positionInitialSquare() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const offsetX = (windowWidth - finalWidthPx) / 2;
        const offsetY = (windowHeight - finalHeightPx) / 2;
        const initialSquare = document.querySelector('#card1');
        initialSquare.style.left = offsetX + 'px';
        initialSquare.style.top = offsetY + 'px';
    }

    positionInitialSquare();

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flip-horizontal');
        });
    });
}

// ✅ Version Mobile : Swiper.js
if (isMobile) {
    const swiper = new Swiper('.swiper', {
        effect: 'cards',
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}