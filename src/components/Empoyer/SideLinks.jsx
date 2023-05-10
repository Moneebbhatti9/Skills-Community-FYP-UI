import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineFileText } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { CiPaperplane } from "react-icons/ci";
import { CgBriefcase } from "react-icons/cg";
import "./Dashboard/css/Dashboard.css";

const SideLinks = () => {
   const location = useLocation();

   return (
      <>
         <div>
            <Link
               to="/employer/dashboard"
               className={`sideNavLinkDesign ${
                  location.pathname === "/employer/dashboard" ? "active" : ""
               }`}
            >
               <span className="d-flex align-items-center px-4">
                  <AiOutlineHome
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  Dashboard
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/employer/profile"
               className={`sideNavLinkDesign ${
                  location.pathname === "/employer/profile" ? "active" : ""
               }`}
            >
               <span
                  className="d-flex align-items-center px-4"
                  style={{ textAlign: "center" }}
               >
                  <FaUserTie style={{ fontSize: "22px", marginRight: "6px" }} />{" "}
                  <span>Profile</span>
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/employer/postjob"
               className={`sideNavLinkDesign ${
                  location.pathname === "/employer/postjob" ? "active" : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <CiPaperplane
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  Post A Job
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/employer/managejobs"
               className={`sideNavLinkDesign ${
                  location.pathname === "/employer/managejobs" ? "active" : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <CgBriefcase
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  Manage Jobs
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/employer/allapplicants"
               className={`sideNavLinkDesign ${
                  location.pathname === "/employer/allapplicants"
                     ? "active"
                     : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <AiOutlineFileText
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  All Applicants
               </span>
            </Link>
         </div>
      </>
   );
};

export default SideLinks;
