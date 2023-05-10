import React from "react";
import { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { ImClock } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { Space, Spin } from "antd";
import { toast } from "react-toastify";
import NavBar from "../../ResuableComponent/NavBar";
import { GiMoneyStack, GiSandsOfTime } from "react-icons/gi";
import Footer from "../../ResuableComponent/Footer";
import "./css/SingleJobDetail.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import hostUrl from "../../Assets/Api";

const SingleJobDetail = () => {
   const [singleJobDetail, setSingleJobDetail] = useState({});
   const [companyName, setCompanyName] = useState("");
   const [teamSizes, setTeamSizes] = useState("");
   const [estSince, setEstSince] = useState("");
   const [phone, setPhone] = useState("");
   const [emialAddress, setEmialAddress] = useState("");
   const [website, setWebsite] = useState("");
   const [companyId, setCompanyId] = useState("");
   const [show, setShow] = useState(false);
   const [loader, setLoader] = useState(false);

   const [companyLogoPublic, setCompanyLogoPublic] = useState("");


   const param = useParams();
   const jobId = param.id;

   let user;
   const jwt = localStorage.getItem("token");
   if (jwt) {
      user = jwtDecode(jwt);
   }

   useEffect(() => {
      const apiUrl = `${hostUrl}/api/company/public/profile/${singleJobDetail.userID}`;
      axios.get(apiUrl).then((res) => {
         setCompanyName(res.data[0].comapnyName);
         setTeamSizes(res.data[0].teamSize);
         setEstSince(res.data[0].estSince);
         setPhone(res.data[0].phone);
         setEmialAddress(res.data[0].emialAddress);
         setWebsite(res.data[0].website);
         setCompanyId(res.data[0]._id);
         console.log("Profile Public", res.data[0].userID);

         const userID = res.data[0].userID;
         const apiUrlLogo = `${hostUrl}/api/company/public/profile/logo/${userID}`;
         axios.get(apiUrlLogo).then((res) => {
            setCompanyLogoPublic(res.data.companyLogo.logo);
         });
      });
   }, [singleJobDetail.userID]);

   // useEffect(() => {
   //    const apiUrl = `${hostUrl}/api/company/public/social/links/${singleJobDetail.userID}`;
   //    axios.get(apiUrl).then((res) => {});
   // }, [singleJobDetail.userID]);

   // useEffect(() => {
   //    const apiUrl = `${hostUrl}/api/company/public/contact/info/${singleJobDetail.userID}`;
   //    axios.get(apiUrl).then((res) => {});
   // }, [singleJobDetail.userID]);

   useEffect(() => {
      axios.get(`${hostUrl}/api/post/job/${jobId}`).then((res) => {
         setSingleJobDetail(res.data);
      });
   }, [jobId]);

   const formattedDate = (createdAt) => {
      const date = new Date(createdAt);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInSec = Math.round(diffInMs / 1000);
      if (diffInSec < 60) {
         return "just now";
      } else if (diffInSec < 3600) {
         const diffInMin = Math.round(diffInSec / 60);
         return `${diffInMin} minutes ago`;
      } else if (diffInSec < 86400) {
         const diffInHrs = Math.round(diffInSec / 3600);
         return `${diffInHrs} hours ago`;
      } else {
         const diffInDays = Math.round(diffInSec / 86400);
         return `${diffInDays} days ago`;
      }
   };

   const formatedDAte = formattedDate(singleJobDetail.createdAt);

   const handleSubmitJob = () => {
      setLoader(true);
      const apiUrl = `${hostUrl}/api/candidate/applied/job`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      const obj = {
         userId: user.id,
         jobId: jobId,
         companyId: companyId,
      };

      try {
         axios.post(apiUrl, obj, config).then((res) => {
            setTimeout(() => {
               setLoader(false);
               toast.success("You have successfully applied for this Job !");
            }, 2000);
            setShow(false);
         });
      } catch (error) {
         console.log("Error while posting a job : ", error);
      }
   };

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   return (
      <>
         <NavBar />
         {/* Show Loader */}
         <Modal show={loader} backdrop="static" keyboard={false}>
            <div className="d-flex justify-content-center bg-warning">
               <div>
                  <Space style={{ position: "absolute", marginTop: "250px" }}>
                     <Spin
                        tip="Please Wait, While Applying for Job ..."
                        size="large"
                        className="text-light w-100"
                     ></Spin>
                  </Space>
               </div>
            </div>
         </Modal>
         {/* Show Loader */}

         {/* Model */}
         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
         >
            <Modal.Body className="py-5 px-5">
               <h6 style={{ fontSize: "18px" }}>
                  Are You Sure You want to apply for this Job ?
               </h6>
               <p className="mt-2">
                  Click <strong>Confirm</strong> to apply for this Job.
               </p>

               <div className="d-flex justify-content-around mt-4">
                  <button
                     className="btn btn-outline-primary w-25"
                     onClick={handleSubmitJob}
                  >
                     Confirm
                  </button>
                  <button
                     className="btn btn-outline-danger w-25"
                     onClick={handleClose}
                  >
                     Cancel
                  </button>
               </div>
            </Modal.Body>
         </Modal>
         {/* Model */}

         <div className="container bg-image" style={{ height: "15rem" }}>
            <div className="row px-5 py-5">
               <div className="col-lg-8 col-md-12 col-sm-12 d-flex justify-content-start">
                  <div className="d-flex">
                     <div className="">
                        <img
                           className="image-flud"
                           src={singleJobDetail.imageUrl}
                           width="54px"
                           height="54px"
                           style={{ borderRadius: "12px" }}
                           alt="item brand"
                        />
                     </div>
                     <div className="" style={{ margin: "1rem" }}>
                        <Link
                           to="#"
                           style={{ textDecoration: "none", color: "black" }}
                        >
                           <h4>{singleJobDetail.jobTitle}</h4>
                        </Link>
                        <div className="list d-flex justify-content-between">
                           {/* <div className="location" style={{ fontSize: "14px" }}>
                           <FaBriefcase className="text-primary"/> Segment
                        </div> */}
                           <div
                              className="location"
                              style={{ fontSize: "14px" }}
                           >
                              <GoLocation className="text-primary" />{" "}
                              {singleJobDetail.city},{singleJobDetail.country}
                           </div>
                           &nbsp;&nbsp;&nbsp;
                           <div
                              className="location"
                              style={{ fontSize: "14px" }}
                           >
                              <ImClock className="text-primary" /> 11 Hours ago
                           </div>
                           &nbsp;&nbsp;&nbsp;
                           <div
                              className="location"
                              style={{ fontSize: "14px" }}
                           >
                              <GiMoneyStack className="text-primary" />{" "}
                              {singleJobDetail.offeredSalary}
                           </div>
                        </div>
                        <div className="time d-flex justify-content-start mt-3">
                           <div
                              style={{
                                 padding: "3px 20px",
                                 backgroundColor: "#DDE8F8",
                                 borderRadius: "12px",
                                 fontSize: "13px",
                                 color: "#1967d2",
                              }}
                           >
                              Full time
                           </div>
                           &nbsp;&nbsp;&nbsp;&nbsp;
                           <div
                              style={{
                                 padding: "3px 20px",
                                 backgroundColor: "#E1F2E5",
                                 borderRadius: "12px",
                                 fontSize: "13px",
                                 color: "#34a853",
                              }}
                           >
                              Private
                           </div>
                           &nbsp;&nbsp;&nbsp;&nbsp;
                           <div
                              style={{
                                 padding: "3px 20px",
                                 backgroundColor: "#FEF2D9",
                                 borderRadius: "12px",
                                 fontSize: "13px",
                                 color: "#f9ab00",
                              }}
                           >
                              Urgent
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-md-start justify-content-sm-start">
                  {jwt ? (
                     <div>
                        <button
                           className="btn btn-primary"
                           style={{ marginTop: "1rem" }}
                           onClick={handleShow}
                        >
                           Apply For Job
                        </button>
                     </div>
                  ) : (
                     <div>
                        <span
                           className="btn btn-primary"
                           style={{ marginTop: "1rem" }}
                           // onClick={handleShow}
                        >
                           Login To Apply for job
                        </span>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div className="container mt-5">
            <div className="row d-flex">
               <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="container">
                     <h5 className="job-detail">Job Description</h5>
                     <div
                        dangerouslySetInnerHTML={{
                           __html: singleJobDetail.jobDescription,
                        }}
                     ></div>
                  </div>
               </div>
               <div className="col-lg-4 col-md-12 col-sm-12 d-flex-column">
                  <div
                     className="d-flex justify-content-lg-start"
                     style={{
                        backgroundColor: "#f5f7fc",
                        padding: "2rem",
                        borderRadius: "20px",
                        maxHeight: "46rem",
                     }}
                  >
                     <div className="fluid-container">
                        <h5>Job Overview</h5>

                        <ul class="job-overview">
                           <li className="d-flex">
                              <CiCalendarDate className="icon text-primary" />
                              <div style={{ marginLeft: "1rem" }}>
                                 <h5>Date Posted:</h5>
                                 <span>posted {formatedDAte}</span>
                              </div>
                           </li>
                           <li className="d-flex">
                              <GiSandsOfTime className="icon text-primary" />
                              <div style={{ marginLeft: "1rem" }}>
                                 <h5>Expiration date:</h5>
                                 <span>
                                    {singleJobDetail.applicationDeadLine}
                                 </span>
                              </div>
                           </li>
                           <li className="d-flex">
                              <GoLocation className="icon text-primary" />
                              <div style={{ marginLeft: "1rem" }}>
                                 <h5>Location:</h5>
                                 <span>
                                    {singleJobDetail.city},
                                    {singleJobDetail.country}
                                 </span>
                              </div>
                           </li>
                           <li className="d-flex">
                              <AiOutlineUser className="icon text-primary" />
                              <div style={{ marginLeft: "1rem" }}>
                                 <h5>Job Title:</h5>
                                 <span>{singleJobDetail.jobTitle}</span>
                              </div>
                           </li>
                           <li className="d-flex">
                              <ImClock className="icon text-primary" />
                              <div style={{ marginLeft: "1rem" }}>
                                 <h5>Hours:</h5>
                                 <span>50h / week</span>
                              </div>
                           </li>
                           <li className="d-flex">
                              <FaCoins className="icon text-primary" />
                              <div style={{ marginLeft: "1rem" }}>
                                 <h5>Rate:</h5>
                                 <span>$15 - $25 / hour</span>
                              </div>
                           </li>
                           <li className="d-flex">
                              <GiMoneyStack className="icon text-primary" />
                              <div style={{ marginLeft: "1rem" }}>
                                 <h5>Salary:</h5>
                                 <span>${singleJobDetail.offeredSalary}</span>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div
                     className="d-flex justify-content-lg-start mt-5"
                     style={{
                        backgroundColor: "#f5f7fc",
                        padding: "2rem",
                        borderRadius: "20px",
                        maxHeight: "46rem",
                     }}
                  >
                     <div className="fluid-container">
                        <div className="d-flex justify-content-start">
                           <img
                              className="image-flud"
                              src={companyLogoPublic}
                              width="54px"
                              height="54px"
                              style={{ borderRadius: "12px" }}
                              alt="item brand"
                           />
                           <div style={{ paddingLeft: "1.5rem" }}>
                              <h5>{companyName}</h5>
                              <Link>View Company Profile</Link>
                           </div>
                        </div>

                        <ul class="job-overview_company">
                           <li className="d-flex">
                              <div style={{}} className="company-profile">
                                 <h6 style={{ fontSize: "1rem" }}>
                                    Primary Industry:
                                 </h6>
                                 <span className="company-span">Software</span>
                              </div>
                           </li>

                           <li className="d-flex">
                              <div style={{}} className="company-profile">
                                 <h6 style={{ fontSize: "1rem" }}>
                                    Company size:
                                 </h6>
                                 <span className="company-span">
                                    {teamSizes}
                                 </span>
                              </div>
                           </li>

                           <li className="d-flex">
                              <div style={{}} className="company-profile">
                                 <h6 style={{ fontSize: "1rem" }}>
                                    Founded in:
                                 </h6>
                                 <span className="company-span">
                                    {estSince}
                                 </span>
                              </div>
                           </li>

                           <li className="d-flex">
                              <div style={{}} className="company-profile">
                                 <h6 style={{ fontSize: "1rem" }}>Phone:</h6>
                                 <span className="company-span">{phone}</span>
                              </div>
                           </li>

                           <li className="d-flex">
                              <div style={{}} className="company-profile">
                                 <h6 style={{ fontSize: "1rem" }}>Email:</h6>
                                 <span className="company-span">
                                    {emialAddress}
                                 </span>
                              </div>
                           </li>
                        </ul>

                        <div
                           className=""
                           style={{
                              textAlign: "center",
                              backgroundColor: "#D4E1F5",
                              padding: "1rem",
                              borderRadius: "1rem",
                           }}
                        >
                           <a
                              href={website}
                              target="_blank "
                              className="comapny-website_button"
                           >
                              {website}
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </>
   );
};

export default SingleJobDetail;
