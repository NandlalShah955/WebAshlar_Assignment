import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/Route";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRoute />
        <Footer />

      </BrowserRouter>
    </>
  );
}

export default App