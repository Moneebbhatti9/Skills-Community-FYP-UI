import React from "react";
import Home from "./components/Home/Home";
import FindJobs from "./components/Jobs/FindJobs";
import Logout from "./components/ResuableComponent/Logout";
import PostJob from "./components/Empoyer/PostAJob/PostJob";
import ManageJobs from "./components/Empoyer/ManageJobs/ManageJobs";
import EmployerDashboard from "./components/Empoyer/Dashboard/Dashboard";
import CandidateDashboard from "./components/Candidate/Dashboard/Dashboard";
import AllApplicants from "./components/Empoyer/AllApplicants/AllApplicants";
import SingleJobDetail from "./components/Jobs/JobsComponents/SingleJobDetail";
import CompanyProfile from "./components/Empoyer/CompanyProfile/CompanyProfile";
import CandidateResume from "./components/Candidate/CandidateResume/CandidateResume";
import CandidateProfile from "./components/Candidate/CandidateProfile/CandidateProfile";
import CandidateMessages from "./components/Candidate/CandidateMessages/CandidateMessages";
import CandidateJobAlert from "./components/Candidate/CandidateJobAlert/CandidateJobAlert";
import CandidateAppliedJobs from "./components/Candidate/CandidateAppliedJobs/CandidateAppliedJobs";
import CandidateShortListedJobs from "./components/Candidate/CandidateShortListedJob/CandidateShortListedJob";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
   return (
      <>
         <ToastContainer />
         <Router>
            <Routes>
               <Route path="/candidate/jobs/shortlisted" element={<CandidateShortListedJobs />} />
               <Route path="/candidate/appliedjobs" element={<CandidateAppliedJobs />} />
               <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
               <Route path="/candidate/jobalerts" element={<CandidateJobAlert />} />
               <Route path="/employer/dashboard" element={<EmployerDashboard />} />
               <Route path="/candidate/messages" element={<CandidateMessages />} />
               <Route path="/employer/allapplicants" element={<AllApplicants />} />
               <Route path="/candidate/profile" element={<CandidateProfile />} />
               <Route path="/candidate/resume" element={<CandidateResume />} />
               <Route path="/employer/profile" element={<CompanyProfile />} />
               <Route path="/employer/managejobs" element={<ManageJobs />} />
               <Route path="/job/detail/:id" element={<SingleJobDetail />} />
               <Route path="/employer/postjob" element={<PostJob />} />
               <Route path="/findjobs" element={<FindJobs />} />
               <Route path="/logout" element={<Logout />} />
               <Route path="/" element={<Home />} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
