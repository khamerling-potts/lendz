import App from "./App";
import Home from "./pages/Home";
import YourClaims from "./pages/YourClaims";
import YourListings from "./pages/YourListings";
import Listing from "./components/Listing";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        // children: [{ path: "listing", element: <Listing /> }],
      },
      {
        path: "/yourclaims",
        element: <YourClaims />,
        // children: [{ path: "listing", element: <Listing /> }],
      },
      {
        path: "/yourlistings",
        element: <YourListings />,
        // children: [{ path: "listing", element: <Listing /> }],
      },
      { path: "/listing", element: <Listing /> },
    ],
  },
];

export default routes;
