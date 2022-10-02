import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./app/pages/Login";
import Signup from "./app/pages/Signup";
import Home from "./app/pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
