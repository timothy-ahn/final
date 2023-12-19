import { Link } from "react-router-dom";
import "./not-found.css";

function NotFound() {
  return (
    <div className="not-found">
      <div>Page not found</div>
      <div>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
}

export default NotFound;
