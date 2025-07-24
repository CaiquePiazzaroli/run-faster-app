import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Users from "./pages/Users.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Users />} path="/users" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
