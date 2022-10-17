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

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {isLoggedIn && <Route path="/home" element={<Home />} />}
          <Route path="/etherscan" element={<EtherScan />} />
          <Route path="/editCampaign/:id" element={<EditCampaigns />} />
          <Route path="/myCampaigns" element={<MyCampaigns />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addCampaigns" element={<AddCampaigns />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
