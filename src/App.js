import * as React from "react";
import CustomToast from "./utils/CustomToast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRouter } from "./Routes";
import SuspenseLoader from "./utils/SuspenseLoader";

function App() {

  // Define routes using createBrowserRouter
  const router = createBrowserRouter(AppRouter)

  // Handle network status changes and reload the page when connection is restored or lost
  React.useEffect(() => {
    
    const handleOnline = () => {
      CustomToast("s", "Network connection restored!", "top-center");
      window.location.reload();
    };

    const handleOffline = () => {
      CustomToast("w", "Network connection lost!", "top-center");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Render the app with router and error boundary
  return (
    <React.Suspense fallback={<SuspenseLoader/>}>
        <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;