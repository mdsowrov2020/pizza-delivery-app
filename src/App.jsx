import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as loadOrder } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import MainLayout from "./ui/MainLayout";
import AuthGurd from "./ui/AuthGurd";

// const router = createBrowserRouter([
//   {
//     element: <MainLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/menu",
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />,
//       },
//       {
//         path: "/cart",
//         element: <Cart />,
//       },
//       {
//         path: "/order/new",
//         element: <CreateOrder />,
//         action: createOrderAction,
//       },
//       {
//         path: "/order/:orderId",
//         element: <Order />,
//         loader: loadOrder,
//         errorElement: <Error />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: (
          <AuthGurd>
            <Outlet />
          </AuthGurd>
        ),
        errorElement: <Error />,
        children: [
          {
            path: "/menu",
            element: <Menu />,
            loader: menuLoader,
            errorElement: <Error />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/order/new",
            element: <CreateOrder />,
            action: createOrderAction,
          },
          {
            path: "/order/:orderId",
            element: <Order />,
            loader: loadOrder,
            errorElement: <Error />,
            action: updateOrderAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
