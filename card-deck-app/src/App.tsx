import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Buy from "./components/Buy";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </ChakraProvider>
  );
}

export default App;
