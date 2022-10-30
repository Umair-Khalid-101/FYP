import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./app/pages/Login";
import Signup from "./app/pages/Signup";
import Home from "./app/pages/Home";
import Header from "./app/components/Header";
import LandingPage from "./app/pages/LandingPage";
import AddCampaigns from "./app/pages/AddCampaigns";
import Profile from "./app/pages/Profile";
import MyCampaigns from "./app/pages/MyCampaigns";
import EditCampaigns from "./app/pages/EditCampaigns";
import EtherScan from "./app/pages/EtherScan";
import DonatePage from "./app/pages/DonatePage";
import HomePage from "./app/pages/HomePage";
import AdminDashboard from "./app/pages/AdminDashboard";
import { userContext } from "./app/context/userContext";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(null);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <userContext.Provider value={{ value, setValue }}>
          <Routes>
            <Route path="/donate/:id" element={<DonatePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/etherscan" element={<EtherScan />} />
            <Route path="/editCampaign/:id" element={<EditCampaigns />} />
            <Route path="/myCampaigns" element={<MyCampaigns />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addCampaigns" element={<AddCampaigns />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </userContext.Provider>
      </main>
    </>
  );
}

export default App;
