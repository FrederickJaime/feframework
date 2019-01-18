
import closestEdge from '../globals/closest-edge';

function droppane() {
  let dropdowns = document.querySelectorAll('a[data-dropdown],button[data-dropdown]');
  
  if (dropdowns.length !== 0) {
    let dropdownShow = function (el, panel) {
      if (el.getAttribute('aria-expanded') === 'false') {
        panel.style.top = `${el.getBoundingClientRect().bottom}px`;
        el.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
      }
    };

    let dropdownHide = function (el, panel) {
      if (el.getAttribute('aria-expanded') === 'true') {
        el.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
      }
    };

    let dropdownHandler = function (el, panel) {
      let dropdownExpanded = el.getAttribute('aria-expanded');
      let dropdownPosition = el.getAttribute('data-pane-position').split(',');
      
      panel.style.top = `${el.getBoundingClientRect().bottom}px`;
  
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
        el.addEventListener('mouseenter', (e) => {
          dropdownShow(el, dropdownPanel);
        });

        el.addEventListener('mouseleave', (e) => {
          if (closestEdge(e, el) !== 'bottom') {
            dropdownHide(el, dropdownPanel);
          }
        });

        dropdownPanel.addEventListener('mouseleave', (e) => {
          if (closestEdge(e, el) !== 'top') {
            dropdownHide(el, dropdownPanel);
          }
        });
      } else {
        el.addEventListener('click', (e) => {
          let dropdownExpanded = el.getAttribute('aria-expanded');
          
          if (dropdownExpanded === 'false') {
            dropdownShow(el, dropdownPanel);
          } else {
            dropdownHide(el, dropdownPanel);
          }
        });
      }
    });
  }
}

/*
 need to revisit, possibly remove fake function.
 need to decide whether to include `closest-edge`
 in this file or try to add as a global utility
*/
function cb() {
  return 'empty';
}


export { droppane, cb };
