
import closestEdge from '../globals/closest-edge';

function droppane() {
  let dropdowns = document.querySelectorAll('a[data-dropdown],button[data-dropdown]');

  let dropdownHandler = function (event, el, panel) {
    let edge = closestEdge(event, el);
    console.log(el.getAttribute('data-dropdown'));
    let dropdownExpanded = el.getAttribute('aria-expanded');
    let dropdownPosition = el.getAttribute('data-pane-position');

    panel.style.top = `${el.getBoundingClientRect().bottom}px`;
    panel.style.right = '0px';


    if (dropdownExpanded === 'false') {
      el.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
    } else {
      el.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    }
  };

  dropdowns.forEach( (el, i) => {
    let canHover = el.getAttribute('data-pane-hover');
    let dropdownTrigger = `#${el.getAttribute('data-toggle')}`;
    let dropdownPanel = document.querySelector(dropdownTrigger);
    

    if (canHover === 'true') {
      ['mouseleave', 'mouseenter'].forEach((event) => {
        el.addEventListener(event, (e) => {
          dropdownHandler(e, el, dropdownPanel);
        });
      });
      dropdownPanel.addEventListener('mouseleave', (e) => {
        dropdownHandler(e, el, dropdownPanel);
      });
    } else {
      el.addEventListener('click', (e) => {
        dropdownHandler(e, el, dropdownPanel);
      });
    }
  });
}
function cube(x) {
  return x * x * x;
}


export { droppane, cube };
