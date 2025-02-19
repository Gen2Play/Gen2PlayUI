
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./app/login/page";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Homepage } from "./app/home/page";
import { UploadPage } from "./app/Upload/UploadPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

