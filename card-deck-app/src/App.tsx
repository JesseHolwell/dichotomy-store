import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Buy from "./components/Buy";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
       <Navbar></Navbar>
       <Router>
         <nav>
           <ul>
             <li>
               <Link to="/">Home</Link>
             </li>
             <li>
               <Link to="/buy">Buy</Link>
             </li>
             <li>
               <Link to="/contact">Contact</Link>
             </li>
           </ul>
         </nav>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/buy" element={<Buy />} />
           <Route path="/contact" element={<Contact />} />
         </Routes>
       </Router>
     </ChakraProvider>
  );
}

export default App;
