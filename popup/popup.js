const keys = ['block_comments', 'left_side_bar', 'recommendations', 'home_feed', 'shorts'];

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(keys).then((obj) => {
    keys.forEach(key => {
      const checkbox = document.getElementById(`${key}_cb`);
      if (checkbox) {
        checkbox.checked = obj[key] ?? true;
      }
    });
  });

  keys.forEach(key => {
    const checkbox = document.getElementById(`${key}_cb`);
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        chrome.storage.sync.set({
          [key]: getNoneOrEmptyBasedOnChecked(checkbox.checked)
        });
      }, false);
    }
  });
}, false);

function getNoneOrEmptyBasedOnChecked(checked) {
  if (checked) {
    return 'none';
  }
  return '';
}
