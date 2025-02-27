import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";

// Lazy loading components
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const SignUP = React.lazy(() => import("./pages/SignUp/SignUp"));

const App = () => {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center text-center animate-pulse text-lg font-semibold bg-primary-a0 dark:bg-surface-a0 text-surface-a0 dark:text-primary-a0">
            Loading...
          </div>
        }
      >
        <div className="w-screen h-screen bg-primary-a0 dark:bg-surface-a0 text-surface-a0 dark:text-primary-a0 transition-colors duration-100 ease-in-out">
          {/* routes */}
          <Router>
            <Routes>
              {/* Default Redirection from / to /login */}
              <Route path="/" element={<Navigate to={"/login"} />} />

              {/* Define routes */}
              <Route path="/dashboard" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUP />} />

              {/* Redirect all unknown path  to /login */}
              <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
          </Router>
        </div>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
