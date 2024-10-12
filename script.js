// script.js
const input = document.getElementById('input');
const button = document.getElementById('button');
const output = document.getElementById('output');
let selectedLetters = [];

button.addEventListener('click', () => {
  output.innerHTML = '';
  const text = input.value.split('');
  text.forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.className = 'letter';
    span.draggable = true;
    span.dataset.index = index;
    span.addEventListener('mousedown', () => selectLetter(span));
    output.appendChild(span);
  });
});

function selectLetter(span) {
  if (event.ctrlKey) {
    span.classList.toggle('selected');
    const index = selectedLetters.indexOf(span);
    if (index > -1) {
      selectedLetters.splice(index, 1);
    } else {
      selectedLetters.push(span);
    }
  } else {
    selectedLetters.forEach(letter => letter.classList.remove('selected'));
    selectedLetters = [span];
    span.classList.add('selected');
  }
}

let dragged;

document.addEventListener('dragstart', event => {
  if (event.target.className.includes('letter')) {
    dragged = event.target;
    setTimeout(() => (dragged.style.display = 'none'), 0);
  }
});

document.addEventListener('dragend', event => {
  if (dragged) {
    setTimeout(() => (dragged.style.display = 'inline-block'), 0);
  }
});

document.addEventListener('dragover', event => {
  event.preventDefault();
});

document.addEventListener('drop', event => {
  event.preventDefault();
  if (dragged) {
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target && target.className.includes('letter') && target !== dragged) {
      const draggedIndex = dragged.dataset.index;
      const targetIndex = target.dataset.index;
      output.insertBefore(dragged, target.nextSibling);
      dragged.dataset.index = targetIndex;
      target.dataset.index = draggedIndex;
    }
  }
});
