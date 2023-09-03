import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./pages/PageNotFound/PageNotFound";
import { routes } from "./routes";


const LoadingFallback = <div>Loading...</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <Suspense fallback={LoadingFallback}>
                {route.protected ? (
                  <ProtectedRoute>{React.createElement(route.component)}</ProtectedRoute>
                ) : (
                  React.createElement(route.component)
                )}
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
