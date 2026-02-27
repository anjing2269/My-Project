'use strict';

document.addEventListener('click', copyToClipboard);

function copyToClipboard(event) {
  const element = event.target;
  const id = element.id;

  if (id === 'copy-button') {
    const textareaElement = document.getElementById('result-text');
    const copyTarget = textareaElement.value;

    navigator.clipboard.writeText(copyTarget).then(
      () => {
        element.innerText = 'コピーしました';
        setTimeout(resetButtonText, 2000, element);
      },
      () => {
        console.log('コピーに失敗しました');
      }
    );
  }
}

function resetButtonText(element) {
  element.innerText = 'テキストをコピー';
}