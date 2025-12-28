import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme/theme-provider";

import { router } from "./routes/routes";
import { queryClient } from "./lib/query-client";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
