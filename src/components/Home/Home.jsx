import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "../ResuableComponent/NavBar";
import { Link } from "react-router-dom";

import Footer from "../ResuableComponent/Footer";
import "./css/Home.css";
const Home = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
         const jwt = jwtDecode(token);
         if (jwt.registerAs === "Employer") {
            navigate("/employer/dashboard");
         } else {
            navigate("/candidate/dashboard");
         }
      }
   }, [navigate]);

   return (
      <React.Fragment>
         <NavBar />
         {/* .............INTRO SECTION...................... */}

         <div className="container-fluid mt-">
            <div className="row">
               <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center">
                  <div className="aside intro">
                     <h4 className="Heading-Class"> Find Candidate </h4>
                     <p>
                        Jobs & Job search. Find jobs in global. Executive jobs &
                        work. Employment
                     </p>
                  </div>
               </div>
               <div className="col-lg-6 col-md-12 col-sm-12 image-none">
                  <img
                     className="img-fluid"
                     src="https://superio-next.vercel.app/images/resource/banner-img-9.png"
                     alt=""
                  />
               </div>
            </div>
         </div>

         {/* ................TOP COMPANIES SECTION............... */}

         <div className="container-fluid text-center">
            <div className="row mt-5">
               <div className=" top-companies">
                  <h4 className="Heading-Class-Companies mt-5">
                     Top Companies Hiring at Superio Now
                  </h4>
                  <p>Lorem ipsum dolor sit amet elit, sed do eiusmod tempor</p>
               </div>
            </div>
            <div className="row mb-5 mt-5">
               <div className="container d-flex">
                  <div className="col">
                     <img
                        className="img-size"
                        src="https://superio-next.vercel.app/images/clients/1-1.png"
                        alt=""
                     />
                  </div>
                  <div className="col">
                     <img
                        className="img-size"
                        src="https://superio-next.vercel.app/images/clients/1-2.png"
                        alt=""
                     />
                  </div>
                  <div className="col">
                     <img
                        className="img-size"
                        src="https://superio-next.vercel.app/images/clients/1-1.png"
                        alt=""
                     />
                  </div>
                  <div className="col">
                     <img
                        className="img-size"
                        src="https://superio-next.vercel.app/images/clients/1-2.png"
                        alt=""
                     />
                  </div>
                  <div className="col">
                     <img
                        className="img-size"
                        src="https://superio-next.vercel.app/images/clients/1-5.png"
                        alt=""
                     />
                  </div>
                  <div className="col">
                     <img
                        className="img-size"
                        src="https://superio-next.vercel.app/images/clients/1-6.png"
                        alt=""
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* ................. POST JOBS SECTION..................*/}

         <div className="container-fluid ">
            <div className="row mt-5">
               <div className="col-lg-6 col-md-12 col-sm-12">
                  <img
                     className="img-fluid"
                     src="https://superio-next.vercel.app/images/resource/recruiter.png"
                     alt=""
                  />
               </div>
               <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center ">
                  <div className="recruiter-aside POST-JOBS-TEXT mobile-view">
                     <h4 className="Recruiter-Heading"> I am Recruiter </h4>
                     <p>
                        One of our One of our jobs has some kind of flexibility
                        jobs has some kind of flexibility option such as
                        telecommuting, a part-time schedule or a flexible or
                        flextime.
                     </p>
                     <button className="btn btn-primary post-job-button">
                        Post New Job
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* .........................JOB SEEKER................... */}

         <div className="display-none ">
            <div className="container-fluid">
               <div className="row mt-5">
                  <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center">
                     <div className="recruiter-aside POST-JOBS-TEXT ">
                        <h4 className="Recruiter-Heading"> I am Jobseeker </h4>
                        <p>
                           One of our One of our jobs has some kind of
                           flexibility jobs has some kind of flexibility option
                           such as telecommuting, a part-time schedule or a
                           flexible or flextime.
                        </p>
                        <button className="btn btn-primary post-job-button">
                           <Link
                              to="/findjobs"
                              style={{ textDecoration: "none", color: "white" }}
                           >
                              Browse Jobs
                           </Link>
                        </button>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                     <img
                        className="img-fluid"
                        src="https://superio-next.vercel.app/images/resource/jobseeker.png"
                        alt=""
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* ...........Duplicate Column............ */}

         <div className="large-display">
            <div className="container-fluid">
               <div className="row mt-5">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                     <img
                        className="img-fluid"
                        src="https://superio-next.vercel.app/images/resource/jobseeker.png"
                        alt=""
                     />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center">
                     <div className="recruiter-aside POST-JOBS-TEXT mobile-view">
                        <h4 className="Recruiter-Heading"> I am Jobseeker </h4>
                        <p>
                           One of our One of our jobs has some kind of
                           flexibility jobs has some kind of flexibility option
                           such as telecommuting, a part-time schedule or a
                           flexible or flextime.
                        </p>
                        <button className="btn btn-primary post-job-button">
                           <Link
                              to="/findjobs"
                              style={{ textDecoration: "none", color: "white" }}
                           >
                              Browse Jobs
                           </Link>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </React.Fragment>
   );
};

export default Home;
