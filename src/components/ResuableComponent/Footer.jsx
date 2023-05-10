import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
   return (
      <>
         <hr className="mt-5 mb-0" />
         <div className="container footer-styling">
            <div className="row">
               <div className="col">
                  <img
                     src="https://superio-next.vercel.app/images/logo.svg"
                     alt=""
                     className="logo-setting"
                  />
                  <h5> Call Us </h5>
                  <Link className="phoneNO">123 &nbsp; 456 &nbsp; 7890</Link>
                  <p className="address">
                     329 Queensberry Street, North Melbourne VIC <br></br>
                     3051, Australia.<br></br>
                     support@superio.com
                  </p>
               </div>
               <div className="col left-margin">
                  <h4 className="Footer-heading">For Candidates</h4>
                  <div className="link-div">
                     <Link className="link-styling">Browser Jobs</Link>
                     <br></br>
                     <Link className="link-styling">Browse Categories</Link>
                     <br></br>
                     <Link className="link-styling">Candidate Dashboard</Link>
                     <br></br>
                     <Link className="link-styling">Jobs Alerts</Link>
                     <br></br>
                     <Link className="link-styling">My Bookmarks</Link>
                     <br></br>
                  </div>
               </div>
               <div className="col">
                  <h4 className="Footer-heading">For Employers</h4>
                  <div className="link-div">
                     <Link className="link-styling">Browse Candidates</Link>
                     <br></br>
                     <Link className="link-styling">Employer Dashboard</Link>
                     <br></br>
                     <Link className="link-styling">Add Job</Link>
                     <br></br>
                     <Link className="link-styling">Job Packages</Link>
                     <br></br>
                  </div>
               </div>
               <div className="col">
                  <h4 className="Footer-heading">About Us</h4>
                  <div className="link-div">
                     <Link className="link-styling">About Us</Link>
                     <br></br>
                     <Link className="link-styling">Job Page Invoice</Link>
                     <br></br>
                     <Link className="link-styling">Terms Page</Link>
                     <br></br>
                     <Link className="link-styling">Blog</Link>
                     <br></br>
                     <Link className="link-styling">Contact</Link>
                     <br></br>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Footer;
