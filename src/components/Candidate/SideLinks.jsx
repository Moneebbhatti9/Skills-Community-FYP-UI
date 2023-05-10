import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
   AiOutlineHome,
   AiOutlineFileText,
   AiOutlineBell,
} from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { CgBriefcase } from "react-icons/cg";
import { BiMessageDetail } from "react-icons/bi";
import "./Dashboard/css/Dashboard.css";

const SideLinks = () => {
   const location = useLocation();

   return (
      <>
         <div>
            <Link
               to="/candidate/dashboard"
               className={`sideNavLinkDesign ${
                  location.pathname === "/candidate/dashboard" ? "active" : ""
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
               to="/candidate/profile"
               className={`sideNavLinkDesign ${
                  location.pathname === "/candidate/profile" ? "active" : ""
               }`}
            >
               <span
                  className="d-flex align-items-center px-4"
                  style={{ textAlign: "center" }}
               >
                  <FaUserTie style={{ fontSize: "22px", marginRight: "6px" }} />{" "}
                  <span>My Profile</span>
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/candidate/resume"
               className={`sideNavLinkDesign ${
                  location.pathname === "/candidate/resume" ? "active" : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <AiOutlineFileText
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  My Resume
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/candidate/appliedjobs"
               className={`sideNavLinkDesign ${
                  location.pathname === "/candidate/appliedjobs" ? "active" : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <CgBriefcase
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  Applied Jobs
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/candidate/jobalerts"
               className={`sideNavLinkDesign ${
                  location.pathname === "/candidate/jobalerts" ? "active" : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <AiOutlineBell
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  Job Alerts
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/candidate/jobs/shortlisted"
               className={`sideNavLinkDesign ${
                  location.pathname === "/candidate/jobs/shortlisted"
                     ? "active"
                     : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <BsBookmark
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  Shortlisted Jobs
               </span>
            </Link>
         </div>
         <div className="mt-2">
            <Link
               to="/candidate/messages"
               className={`sideNavLinkDesign ${
                  location.pathname === "/candidate/messages" ? "active" : ""
               }`}
            >
               <span className="d-flex align-items-center  px-4">
                  <BiMessageDetail
                     style={{ fontSize: "22px", marginRight: "6px" }}
                  />{" "}
                  Messages
               </span>
            </Link>
         </div>
      </>
   );
};

export default SideLinks;
