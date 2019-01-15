
function droppane() {
  let dropdowns = document.querySelectorAll('a[data-dropdown],button[data-dropdown]');

  let dropdownHandler = function (el) {
    let dropdownTrigger = `#${el.getAttribute('data-toggle')}`;
    let dropdownExpanded = el.getAttribute('aria-expanded');
    let dropdownPanel = document.querySelector(dropdownTrigger);

    if (dropdownExpanded === 'false') {
      el.setAttribute('aria-expanded', 'true');
      dropdownPanel.setAttribute('aria-hidden', 'false');
    } else {
      el.setAttribute('aria-expanded', 'false');
      dropdownPanel.setAttribute('aria-hidden', 'true');
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
