export default function useDrag(
  onDrag?: (ev: MouseEvent | TouchEvent) => void,
  onDragEnd?: (ev: MouseEvent | TouchEvent) => void,
) {
  const drag = (ev: MouseEvent) => {
    if (ev.button !== 0) return;

    // While dragging, move the element directly via DOM
    const dragging = (ev: MouseEvent) => {
      if (onDrag) onDrag(ev);
    };

    // At the end of a drag event (release)...
    const dragEnd = (ev: MouseEvent) => {
      if (ev.button !== 0) return;

      if (onDragEnd) onDragEnd(ev);

      // Clean up event listeners
      window.removeEventListener('mousemove', dragging);
      window.removeEventListener('mouseup', dragEnd);
    };

    window.addEventListener('mousemove', dragging); // Drag while moving
    window.addEventListener('mouseup', dragEnd); // End drag on mouse up
  };

  const dragHandler = (ev?: React.MouseEvent) => {
    if (ev && ev.button !== 0) return;

    const start = (ev: MouseEvent) => {
      drag(ev);
      cancel();
    };

    // Clean up event listeners
    const cancel = () => {
      window.removeEventListener('mousemove', start);
      window.removeEventListener('mouseup', cancel);
    };

    // On mouse down...
    window.addEventListener('mousemove', start); // Start dragging on move
    window.addEventListener('mouseup', cancel); // Cancel on mouse up (click)
  };

  const touch = () => {
    // While dragging, move the element directly via DOM
    const dragging = (ev: TouchEvent) => {
      ev.stopPropagation();
      ev.preventDefault();

      if (onDrag) onDrag(ev);
    };

    // At the end of a drag event (release)...
    const touchEnd = (ev: TouchEvent) => {
      // Clean up event listeners
      window.removeEventListener('touchmove', dragging);
      window.removeEventListener('touchend', touchEnd);

      if (onDragEnd) onDragEnd(ev);
    };

    window.addEventListener('touchmove', dragging); // Drag while moving
    window.addEventListener('touchend', touchEnd); // End drag on touch up
  };

  const touchHandler = () => {
    const start = () => {
      touch();
      cancel();
    };

    // Clean up event listeners
    const cancel = () => {
      window.removeEventListener('touchmove', start);
      window.removeEventListener('touchend', cancel);
    };

    // On touch down...
    window.addEventListener('touchmove', start); // Start dragging on move
    window.addEventListener('touchend', cancel); // Cancel on touch up (tap)
  };

  return {
    dragHandler,
    touchHandler,
  };
}

export function isTouch(ev: MouseEvent | TouchEvent): ev is TouchEvent {
  return (ev as TouchEvent).touches !== undefined;
}
