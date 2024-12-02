const panels = document.querySelectorAll('.cv-panel');

let currentPanel = 0;

panels.forEach((panel, index) => {
  panel.addEventListener('click', () => {
    if (index === currentPanel) {
      currentPanel++;
      if (currentPanel < panels.length) {
        panels[currentPanel].classList.remove('hidden');
      }
    }
  });
});
