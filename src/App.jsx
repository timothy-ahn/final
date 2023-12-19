import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CommonLayout from "./layouts/Common/common-layout";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

import "./App.css";
import Anime from "./pages/anime";
import AnimeDetails from "./pages/anime/details";
import AnimeEpisodes from "./pages/anime/episodes";
import AnimeVideos from "./pages/anime/videos";

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "anime/:id",
        element: <Anime />,
        children: [
          {
            index: true,
            element: <AnimeDetails />
          },
          {
            path: "episodes",
            element: <AnimeEpisodes />
          },
          {
            path: "videos",
            element: <AnimeVideos />
          }
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
