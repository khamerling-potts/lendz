import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import YourClaims from "./pages/YourClaims";
import YourListings from "./pages/YourListings";

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
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
    ],
  },
];

export default routes;
