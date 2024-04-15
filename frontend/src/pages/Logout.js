import { useEffect } from "react";


const Logout = () => {

  useEffect(() => {
    // Perform logout actions here, if any
    console.log("Logging out...");

    localStorage.removeItem("token");
    window.location.href = "/";
  });

  // Optionally, you can also return null or a message indicating successful logout
  return null;
};

export default Logout;
