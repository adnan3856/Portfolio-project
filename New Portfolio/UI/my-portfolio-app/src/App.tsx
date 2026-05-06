import { Home } from "@/pages/Home";
import { Admin } from "@/pages/Admin";

function App() {
  // Simple temporary routing
  if (window.location.pathname === "/admin") {
    return <Admin />;
  }
  
  return <Home />;
}

export default App
