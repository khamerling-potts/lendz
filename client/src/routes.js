import App from "./App";
import Home from "./pages/Home";
import YourClaims from "./pages/YourClaims";
import YourListings from "./pages/YourListings";
import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/yourclaims",
        element: <YourClaims />,
      },
      {
        path: "/yourlistings",
        element: <YourListings />,
      },
    ],
  },
];

export default routes;
