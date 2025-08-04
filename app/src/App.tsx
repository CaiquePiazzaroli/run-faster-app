import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Users from "./pages/admin/Users.tsx";
import CreateUsers from "./pages/CreateUsers.tsx";
import Login from "./pages/Login";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Users />} path="/users" />
          <Route element={<CreateUsers />} path="/users/create" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
