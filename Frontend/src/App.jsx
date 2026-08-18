import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
