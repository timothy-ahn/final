import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function ScrollCard({ onClick, selected, title, itemId }) {
  const visibility = useContext(VisibilityContext);

  return (
    <div className="scroll-card">
      <div style={({overflow: "hidden"})}>
        <a href="#">
          <img
            src="https://cdn.myanimelist.net/images/anime/1136/138410l.jpg"
            class="scroll-card-image"
            alt="..."
          />
        </a>
      </div>
      <div class="text-center">
        <a href="#" className="scroll-card-title">
          Undead Unluck
        </a>
      </div>
    </div>
  );
}

export default ScrollCard;
