
export default function (e, el) {
  let elemBounding = el.getBoundingClientRect();
  
  let elementLeftEdge = elemBounding.left;
  let elementTopEdge = elemBounding.top;
  let elementRightEdge = elemBounding.right;
  let elementBottomEdge = elemBounding.bottom;

  let mouseX = e.pageX;
  let mouseY = e.pageY;

  let topEdgeDist = Math.abs(elementTopEdge - mouseY);
  let bottomEdgeDist = Math.abs(elementBottomEdge - mouseY);
  let leftEdgeDist = Math.abs(elementLeftEdge - mouseX);
  let rightEdgeDist = Math.abs(elementRightEdge - mouseX);

  let min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);

  switch (min) {
    case leftEdgeDist:
      return 'left';
    case rightEdgeDist:
      return 'right';
    case topEdgeDist:
      return 'top';
    case bottomEdgeDist:
      return 'bottom';
    default:
      break;
  }
}
