import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto";
import { AppProviders } from "./appProvider/AppProvider";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { Homepage } from "./views/homepage/Homepage";
import { WeatherReportForm } from "./views/WeatherReportForm/WeatherReportForm";
import { WeatherReportList } from "./views/WeatherReportList/WeatherReportList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/report-form",
    element: <WeatherReportForm />,
  },
  {
    path: "/report-list",
    element: <WeatherReportList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
