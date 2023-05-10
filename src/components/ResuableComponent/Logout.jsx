import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Logout = () => {
   useEffect(() => {
      localStorage.removeItem("token");
      window.location.replace("/");
      //   window.location = "/";
      //   const navigate = useNavigate();
      //   navigate("/");
   }, []);

   return null;
};

export default Logout;
