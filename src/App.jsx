import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CommonLayout from "./layouts/Common/common-layout";
import Home from "./pages/home";

import "./App.css";

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
