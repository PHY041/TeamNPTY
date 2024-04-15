// App.js
import React from "react";
import {Navigate,BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavPages from "./pages/NavPages";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ForgetPassword />} />
          <Route path="/app/*" element={<NavPages />} />
          {/* Add a wildcard route to redirect to "/schedule" */}
          <Route path="/app" element={<Navigate to="/app/schedule" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
