import  { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Logout = () => {
   useEffect(() => {
      localStorage.removeItem("token");
      window.location.replace("/");
   }, []);

   return null;
};

export default Logout;
