import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Loginpage from "./screens/Loginpage";
import Registerpage from "./screens/Registerpage";
import Profilescreen from "./screens/Profilescreen";
import Landingscreen from "./screens/Landingscreen";
import Adminpage from "./screens/Adminpage";

const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingscreen/>}/>
          <Route path="/home" element={<Homescreen/>} />
          <Route path="/book/:roomid/:fromDate/:toDate" element={<Bookingscreen />} />
          <Route path="/login" element={<Loginpage/>}/>
          <Route path="/register" element={<Registerpage/>}/>
          <Route path="/profile" element={<Profilescreen/>}/>
          <Route path="/admin" element={<Adminpage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
