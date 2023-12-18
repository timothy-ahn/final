function SliderCard({ anime }) {
  const title = anime.titles.find((t) => t.type === "Default").title;
  return (
    <div className="scroll-card">
      <div style={{ overflow: "hidden", borderRadius: "12px" }}>
        <a href="#">
          <img
            src={`${anime.images.webp.large_image_url}`}
            className="scroll-card-image"
            alt={title}
          />
        </a>
      </div>
      <div className="text-center">
        <a href="#" className="scroll-card-title">
          {title}
        </a>
      </div>
    </div>
  );
}

export default SliderCard;
