import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Launcher from "./components/Launcher";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

const RootComponent = () => {
  const [isLaunched, setIsLaunched] = React.useState(() => {
    return sessionStorage.getItem("hasLaunched") === "true";
  });
  const [autoTour, setAutoTour] = React.useState(false);

  const handleLaunchComplete = () => {
    sessionStorage.setItem("hasLaunched", "true");
    setAutoTour(true);
    setIsLaunched(true);
  };

  if (window.location.pathname === "/" && !isLaunched) {
    return <Launcher onLaunchComplete={handleLaunchComplete} />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <App autoTour={autoTour} onTourEnd={() => setAutoTour(false)} />
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
);
