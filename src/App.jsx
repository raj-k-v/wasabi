import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Alerts from "./pages/Alerts";
import Monitoring from "./pages/Monitoring";
import Competitors from "./pages/Competitors";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;