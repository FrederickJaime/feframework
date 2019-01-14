
function droppane() {
  let dropdowns = document.querySelectorAll('a[data-dropdown],button[data-dropdown]');

  let dropdownHandler = function (el) {
    let trigger = `#${el.getAttribute('data-toggle')}`;
    let ariaExpanded = el.getAttribute('aria-expanded');

    if (ariaExpanded === 'false') {
      el.setAttribute('aria-expanded', 'true');
    } else {
      el.setAttribute('aria-expanded', 'false');
    }
  };

  dropdowns.forEach( (el, i) => {
    let canHover = el.getAttribute('data-pane-hover');

    if (canHover === 'true') {
      ['mouseleave', 'mouseenter'].forEach((event) => {
        el.addEventListener(event, () => {
          dropdownHandler(el);
        });
      });
    } else {
      el.addEventListener('click', () => {
        dropdownHandler(el);
      });
    }
  });
}
function cube(x) {
  return x * x * x;
}


export { droppane, cube };
