import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Buy from "pages/Buy";
import Home from "pages/Home";
import Footer from "components/ui/Footer";
import theme from "styles/theme";
import Success from "pages/Success";

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/success" element={<Success />} />

          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer></Footer>
      </Router>
    </ChakraProvider>
  );
}

export default App;
