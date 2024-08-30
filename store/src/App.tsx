import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Buy from "pages/Buy";
import Home from "pages/Home";
import Footer from "components/ui/Footer/Footer";
import theme from "theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer></Footer>
      </Router>
    </ChakraProvider>
  );
}

export default App;
