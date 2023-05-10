import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import NavBar from "../ResuableComponent/NavBar";
import Jobs from "./JobsComponents/Jobs";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./FindJobs.css";
import Footer from "../ResuableComponent/Footer";
const FindJobs = () => {
   const [jobs, setJobs] = useState([]);
   const [currentPage] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      axios
         .get(`http://localhost:5000/api/post/job?page=${currentPage}`)
         .then((res) => {
            setJobs(res.data.jobs);
            setTotalPages(res.data.totalPages);
            setLoading(false);
         });
   }, [currentPage]);

   const handlePageChange = async (data) => {
      const currentPage = data.selected - 1 + 1;

      await axios
         .get(`http://localhost:5000/api/post/job?page=${currentPage}`)
         .then((res) => {
            setJobs(res.data.jobs);
         });
   };

   return (
      <>
         <NavBar />
         <div className="Job-header">
            <h1>Find Jobs</h1>
         </div>

         <div className="container my-5">
            <div className="row">
               <div className="col-lg-6 d-flex">
                  <InputGroup className="mb-3">
                     <Form.Control
                        placeholder="Search Job By Names"
                        aria-label="Search Job By Names"
                        aria-describedby="basic-addon2"
                     />
                     <InputGroup.Text
                        id="basic-addon2"
                        style={{ cursor: "pointer" }}
                     >
                        Search Job
                     </InputGroup.Text>
                  </InputGroup>
               </div>
               <div className="col-lg-6 d-flex justify-content-between">
                  <div className="input w-75">
                     <select
                        className="form-select"
                        aria-label="Default select example"
                     >
                        <option value="">Job Type</option>
                        <option value="">Full Time</option>
                        <option value="">Part Time</option>
                     </select>
                  </div>
                  <div className="input w-75">
                     <select
                        className="form-select"
                        aria-label="Default select example"
                     >
                        <option value="">Date Posted</option>
                        <option value="asc">All</option>
                        <option value="des">Last Hour</option>
                        <option value="des">24 Hour</option>
                        <option value="des">Last 7 Days</option>
                        <option value="des">Last 14 Days</option>
                        <option value="des">Last 30 Days</option>
                     </select>
                  </div>
                  <div className="input w-75">
                     <select
                        className="form-select "
                        aria-label="Default select example"
                     >
                        <option value="">Experience</option>
                        <option value="asc">Fresh</option>
                        <option value="des">1 Year</option>
                        <option value="des">2 Year</option>
                        <option value="des">3 Year</option>
                        <option value="des">4 Year</option>
                        <option value="des">Greater than 5 Year</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>

         {loading ? (
            <div className="container">
               <div className="row d-flex justify-content-center">
                  <div className="col-lg-1">
                     <div className="custom-loader"></div>
                  </div>
               </div>
            </div>
         ) : (
            <div className="container">
               <div className="row mb-5">
                  {jobs.map((job) => (
                     <Jobs
                        key={job._id}
                        jobId={job._id}
                        jobTitle={job.jobTitle}
                        city={job.city}
                        country={job.country}
                        createdAt={job.createdAt}
                        offeredSalary={job.offeredSalary}
                        image={job.imageUrl}
                     />
                  ))}
               </div>
               <ReactPaginate
                  previousLabel={"< Previous"}
                  nextLabel={"Next >"}
                  breakLabel={"..."}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item page-item-design"}
                  pageLinkClassName={"page-link page-link-design"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item page-item-design"}
                  breakLinkClassName={"page-link page-link-design"}
                  activeClassName={"active"}
               />
            </div>
         )}

         <Footer />
      </>
   );
};

export default FindJobs;
