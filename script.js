const container = document.querySelector('.container');

// Paramètres finaux du CV
const finalColumns = 5; // 5 carrés de large
const finalRows = 3;    // 3 carrés de haut
// Conversion approximative : 6.5cm ≈ 246px
const squareSizePx = 246;
const finalWidthPx = finalColumns * squareSizePx;   // 5 * 246 = 1230 px
const finalHeightPx = finalRows * squareSizePx;     // 3 * 246 = 738 px

// Fonction pour réinitialiser les descendants
function resetDescendants(id) {
    const descendants = document.querySelectorAll(`[data-parent-id="${id}"]`);
    descendants.forEach((descendant) => {
        resetDescendants(descendant.dataset.id); // Réinitialisation récursive
        descendant.classList.add('hidden'); // Cache pour replier
        setTimeout(() => descendant.remove(), 500); // Supprime après l'animation
    });
}

// Positionner le premier carré pour que le résultat final soit centré
function positionInitialSquare() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const offsetX = (windowWidth - finalWidthPx) / 2;
    const offsetY = (windowHeight - finalHeightPx) / 2;

    const initialSquare = document.querySelector('#square1');
    initialSquare.style.left = offsetX + 'px';
    initialSquare.style.top = offsetY + 'px';
}

// Fonction pour créer un carré descendant avec un ID spécifique
function createSquare(parentId, dataId, imageFront, imageBack, direction) {
    const square = document.createElement('div');
    square.classList.add('square', 'hidden'); // Commence plié
    square.dataset.id = dataId;
    square.dataset.parentId = parentId;
    square.dataset.clickCount = '0'; // Compteur de clics
    square.dataset.direction = direction;

    // Assigner la classe de retournement en fonction de la direction
    if (direction === 'right') {
        square.classList.add('flip-horizontal');
    } else if (direction === 'left') {
        square.classList.add('flip-horizontal-reverse');
    } else if (direction === 'down') {
        square.classList.add('flip-vertical');
    }

    const front = document.createElement('div');
    front.classList.add('front');

    const frontImg = document.createElement('img');
    frontImg.src = imageFront;
    frontImg.alt = `Face avant de ${dataId}`;
    front.appendChild(frontImg);

    const back = document.createElement('div');
    back.classList.add('back');

    const backImg = document.createElement('img');
    backImg.src = imageBack;
    backImg.alt = `Face arrière de ${dataId}`;
    back.appendChild(backImg);

    square.appendChild(front);
    square.appendChild(back);

    // Positionnement en fonction de la direction
    const parentSquare = document.querySelector(`[data-id="${parentId}"]`);
    const parentRect = parentSquare.getBoundingClientRect();
    const squareSize = parentRect.width;
    const parentLeft = parseFloat(parentSquare.style.left) || 0;
    const parentTop = parseFloat(parentSquare.style.top) || 0;

    if (direction === 'right') {
        square.style.left = (parentLeft + squareSize) + 'px';
        square.style.top = parentTop + 'px';
    } else if (direction === 'down') {
        square.style.left = parentLeft + 'px';
        square.style.top = (parentTop + squareSize) + 'px';
    } else if (direction === 'left') {
        square.style.left = (parentLeft - squareSize) + 'px';
        square.style.top = parentTop + 'px';
    }

    container.appendChild(square);

    setTimeout(() => {
        square.classList.remove('hidden'); // Déplie le carré
        square.classList.add('unfold');
    }, 50);

    // Gestion des clics sur le carré
    square.addEventListener('click', () => {
        const hasDescendants = document.querySelector(`[data-parent-id="${square.dataset.id}"]`);

        if (square.dataset.id === 'square-2') {
            if (square.classList.contains('flip')) {
                if (hasDescendants) {
                    resetDescendants(square.dataset.id);
                    square.classList.remove('flip');
                    square.dataset.clickCount = '0';
                }
            } else {
                let clickCount = parseInt(square.dataset.clickCount, 10);
                clickCount += 1;
                square.dataset.clickCount = clickCount.toString();

                if (clickCount === 1) {
                    // Premier clic : Crée le carré 3 à droite
                    createSquare(
                        square.dataset.id,
                        'square-3',
                        'images/square3_front.jpg',
                        'images/square3_back.jpg',
                        'right'
                    );
                } else if (clickCount === 2) {
                    // Deuxième clic : Crée le carré 4 en dessous et retourne le carré 2
                    createSquare(
                        square.dataset.id,
                        'square-4',
                        'images/square4_front.jpg',
                        'images/square4_back.jpg',
                        'down'
                    );
                    square.classList.add('flip');
                }
            }
        } else {
            if (hasDescendants) {
                resetDescendants(square.dataset.id);
                square.classList.remove('flip');
                square.dataset.clickCount = '0';
            } else {
                let clickCount = parseInt(square.dataset.clickCount, 10);
                clickCount += 1;
                square.dataset.clickCount = clickCount.toString();
                square.classList.add('flip');

                switch (square.dataset.id) {
                    case 'square-3':
                        createSquare(
                            square.dataset.id,
                            'square-5',
                            'images/square5_front.jpg',
                            'images/square5_back.jpg',
                            'right'
                        );
                        break;
                    case 'square-5':
                        createSquare(
                            square.dataset.id,
                            'square-6',
                            'images/square6_front.jpg',
                            'images/square6_back.jpg',
                            'down'
                        );
                        break;
                    case 'square-6':
                        createSquare(
                            square.dataset.id,
                            'square-7',
                            'images/square7_front.jpg',
                            'images/square7_back.jpg',
                            'down'
                        );
                        break;
                    case 'square-7':
                        const square8 = createSquare(
                            square.dataset.id,
                            'square-8',
                            'images/square8_front.jpg',
                            'images/square8_back.jpg',
                            'right'
                        );
                        square8.classList.add('flip');
                        square8.dataset.clickCount = '1';
                        break;
                    case 'square-4':
                        createSquare(
                            square.dataset.id,
                            'square-9',
                            'images/square9_front.jpg',
                            'images/square9_back.jpg',
                            'down'
                        );
                        break;
                    case 'square-9':
                        const square10 = createSquare(
                            square.dataset.id,
                            'square-10',
                            'images/square10_front.jpg',
                            'images/square10_back.jpg',
                            'left'
                        );
                        square10.classList.add('flip');
                        square10.dataset.clickCount = '1';
                        break;
                    default:
                        // Aucun comportement pour les autres carrés
                        break;
                }
            }
        }
    });

    return square;
}

// Gestion de la couverture initiale
const initialSquare = document.querySelector('#square1');
initialSquare.dataset.id = 'square-1';
initialSquare.dataset.expanded = 'false';
initialSquare.classList.add('flip-horizontal');

window.addEventListener('load', () => {
    positionInitialSquare();
});

initialSquare.addEventListener('click', () => {
    const hasDescendants = document.querySelector(`[data-parent-id="${initialSquare.dataset.id}"]`);

    if (hasDescendants) {
        resetDescendants('square-1');
        initialSquare.classList.remove('flip');
        initialSquare.dataset.expanded = 'false';
        initialSquare.dataset.clickCount = '0';
    } else {
        initialSquare.classList.add('flip');
        initialSquare.dataset.expanded = 'true';
        createSquare(
            'square-1',
            'square-2',
            'images/square2_front.jpg',
            'images/square2_back.jpg',
            'right'
        );
    }
});
