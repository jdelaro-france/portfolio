/* script.js */

const container = document.querySelector('.container');

// Fonction pour réinitialiser les descendants
function resetDescendants(id) {
    const descendants = document.querySelectorAll(`[data-parent-id="${id}"]`);
    descendants.forEach((descendant) => {
        resetDescendants(descendant.dataset.id); // Réinitialisation récursive
        descendant.classList.remove('visible');
        setTimeout(() => descendant.remove(), 500); // Supprime après l'animation
    });
}

// Fonction pour créer un carré descendant avec un ID spécifique
function createSquare(parentId, dataId, imageSrc, direction) {
    const square = document.createElement('div');
    square.classList.add('square'); // Carré de base
    square.dataset.id = dataId;
    square.dataset.parentId = parentId;
    square.dataset.clickCount = '0'; // Compteur de clics
    square.dataset.direction = direction;

    const content = document.createElement('div');
    content.classList.add('content');

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `Image de ${dataId}`;
    content.appendChild(img);

    square.appendChild(content);

    // Positionnement en fonction de la direction
    const parentSquare = document.querySelector(`[data-id="${parentId}"]`);

    const squareSize = parentSquare.offsetWidth;

    const parentLeft = parseFloat(parentSquare.style.left) || 0;
    const parentTop = parseFloat(parentSquare.style.top) || 0;

    if (direction === 'right') {
        square.style.left = `${parentLeft + squareSize}px`;
        square.style.top = `${parentTop}px`;
    } else if (direction === 'down') {
        square.style.left = `${parentLeft}px`;
        square.style.top = `${parentTop + squareSize}px`;
    } else if (direction === 'left') {
        square.style.left = `${parentLeft - squareSize}px`;
        square.style.top = `${parentTop}px`;
    }

    container.appendChild(square);

    // Déclencher l'apparition en fondu
    setTimeout(() => {
        square.classList.add('visible');
    }, 50);

    // Gestion des clics sur le carré
    square.addEventListener('click', () => {
        // Vérifier si le carré a des descendants
        const hasDescendants = document.querySelector(`[data-parent-id="${square.dataset.id}"]`);

        if (square.dataset.id === 'square-2') {
            // Spécificité pour le carré 2
            if (hasDescendants) {
                // Replier les descendants
                resetDescendants(square.dataset.id);
                square.dataset.clickCount = '0';
            } else {
                let clickCount = parseInt(square.dataset.clickCount, 10);
                clickCount += 1;
                square.dataset.clickCount = clickCount.toString();

                if (clickCount === 1) {
                    // Premier clic : Crée le carré 3 à droite
                    createSquare(
                        square.dataset.id,
                        'square-3',
                        'images/square3.jpg',
                        'right'
                    );
                } else if (clickCount === 2) {
                    // Deuxième clic : Crée le carré 4 en dessous
                    createSquare(
                        square.dataset.id,
                        'square-4',
                        'images/square4.jpg',
                        'down'
                    );
                }
            }
        } else {
            if (hasDescendants) {
                // Replier les descendants
                resetDescendants(square.dataset.id);
                square.dataset.clickCount = '0';
            } else {
                let clickCount = parseInt(square.dataset.clickCount, 10);
                clickCount += 1;
                square.dataset.clickCount = clickCount.toString();

                switch (square.dataset.id) {
                    case 'square-3':
                        // Crée le carré 5 à droite
                        createSquare(
                            square.dataset.id,
                            'square-5',
                            'images/square5.jpg',
                            'right'
                        );
                        break;
                    case 'square-5':
                        // Crée le carré 6 en dessous
                        createSquare(
                            square.dataset.id,
                            'square-6',
                            'images/square6.jpg',
                            'down'
                        );
                        break;
                    case 'square-6':
                        // Crée le carré 7 en dessous
                        createSquare(
                            square.dataset.id,
                            'square-7',
                            'images/square7.jpg',
                            'down'
                        );
                        break;
                    case 'square-7':
                        // Crée le carré 8 à droite
                        createSquare(
                            square.dataset.id,
                            'square-8',
                            'images/square8.jpg',
                            'right'
                        );
                        break;
                    case 'square-4':
                        // Crée le carré 9 en dessous
                        createSquare(
                            square.dataset.id,
                            'square-9',
                            'images/square9.jpg',
                            'down'
                        );
                        break;
                    case 'square-9':
                        // Crée le carré 10 à gauche
                        createSquare(
                            square.dataset.id,
                            'square-10',
                            'images/square10.jpg',
                            'left'
                        );
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
initialSquare.style.left = '0px';
initialSquare.style.top = '0px';

initialSquare.addEventListener('click', () => {
    // Vérifier si le carré initial a des descendants
    const hasDescendants = document.querySelector(`[data-parent-id="${initialSquare.dataset.id}"]`);

    if (hasDescendants) {
        // Replier tous les descendants
        resetDescendants(initialSquare.dataset.id);
        initialSquare.dataset.expanded = 'false';
        initialSquare.dataset.clickCount = '0';
    } else {
        initialSquare.dataset.expanded = 'true';
        // Crée le carré 2 à droite
        createSquare(
            'square-1',
            'square-2',
            'images/square2.jpg',
            'right'
        );
    }
});
