import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import ValidatePage from "./Pages/ValidatePage";
import AdminPage from "./Pages/AdminPage";
import Validated from "./Components/Validated";
import UpdateInternId from "./Components/UpdateInternId";
import InternDetails from "./Components/InternDetails";
import AddIntern from "./Components/AddIntern";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/intern-details" element={<InternDetails />} />
            <Route path="/ValidatePage" element={<ValidatePage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route
              path="/AdminPage/Update-Intern-details"
              element={<UpdateInternId />}
            />
            <Route
              path="/AdminPage/Add-New-Intern"
              element={<AddIntern />}
            />
            <Route path="/ValidatePage/Validated" element={<Validated />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
