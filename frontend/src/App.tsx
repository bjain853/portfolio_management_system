import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ChakraProvider } from "@chakra-ui/react";
import SignUp from "./pages/SignUp";
import ClientPortfolio from "./pages/ClientPortfolio";
import { api } from "./api";
import ClientList from "./pages/ClientList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Dashboard} />,
  },
  {
    path: "/clients",
    element: <ProtectedRoute Component={ClientList} />,
  },
  {
    path: "/clients/:clientId",
    element: <ProtectedRoute Component={ClientPortfolio} />,
    loader: async function LoaderFunction({ params }) {
      return params.clientId;
    },
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
