let screen = document.getElementById('screen');
let keys = Array.from(document.querySelectorAll('.key'));

keys.forEach(key => {
  key.addEventListener('click', () => {
    let value = key.innerText;
    if (value === 'C') {
      screen.innerText = '';
    } else if (value === '=') {
      let expression = screen.innerText;
      let result = eval(expression);
      screen.innerText = result;
    } else {
      screen.innerText += value;
    }
  });
});