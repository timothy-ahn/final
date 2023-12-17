import { ScrollMenu } from "react-horizontal-scrolling-menu";
import ScrollCard from "./scroll-card";

import "./scroll-list.css";
import useDrag from "./useDrag";

function ScrollList({ items, title }) {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });
  return (
    <div onMouseLeave={dragStop}>
      <ScrollMenu
        Header={<h2>{title}</h2>}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
      >
        {items.map(({ id }) => (
          <ScrollCard itemId={id} title={id} key={id} />
        ))}
      </ScrollMenu>
    </div>
  );
}

export default ScrollList;
