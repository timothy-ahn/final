import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()} className="scroll-arrow scroll-arrow-left">
      &#10094;
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()} className="scroll-arrow scroll-arrow-right">
      &#10095;
    </Arrow>
  );
}

function Arrow({
  children,
  disabled,
  onClick,
  className
}) {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none"
      }}
    >
      {children}
    </button>
  );
}

