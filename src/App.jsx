import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersistLogin from "./auth/PersistLogin";
import RequireAuth from "./auth/RequireAuth";
import { ROLES } from "./config/roles";
import UserProfile from "./Components/Login/Profile";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 6000,
        cacheTime: 10 * 60 * 1000, // 5 minutes in milliseconds
      },
    },
  });
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                <Route path="/user/profile/*" element={<UserProfile />} />
              </Route>
            </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
