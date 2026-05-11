import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Admin } from "@/pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Dynamic Portfolio Route */}
        <Route path="/:username" element={<Home />} />
        
        {/* Default / Fallback Route */}
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-sans">
            <h1 className="text-xl font-medium">Please provide a username in the URL (e.g., /adnan123)</h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App
