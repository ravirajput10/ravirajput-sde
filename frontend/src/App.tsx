
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
// import "./App.css"

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />

       {/* Child routes render here */}
        <Outlet />
    </TooltipProvider>
  </AuthProvider>
);

export default App;
