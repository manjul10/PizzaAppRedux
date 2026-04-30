import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./UI/AppLayout";
import Home from "./UI/Home";
import Error from "./UI/Error";
import Menu from "./menu/Menu";
import { getMenu } from "./menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as oderLoader } from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/cart", element: <Cart /> },
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: getMenu, // Make sure you copy the getMenu function in Menu.tsx
      },
      { path: "/order/new", element: <CreateOrder /> },
      {
        path: "/order/:id",
        element: <Order />,
        loader: oderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
