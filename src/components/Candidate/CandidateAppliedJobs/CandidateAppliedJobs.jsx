import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import "../Dashboard/css/Dashboard.css";
import { Layout, Menu } from "antd";
import SideLinks from "../SideLinks";
import { CgBriefcase } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./CandidateAppliedJob.css";
import AppliedJobs from "./components/AppliedJobs";
import hostUrl from "../../Assets/Api";
const { Header, Content, Footer, Sider } = Layout;

const CandidateAppliedJobs = () => {
   const [appliedJobs, setAppliedJobs] = useState([]);

   const jwt = localStorage.getItem("token");
   const userId = jwtDecode(jwt);

   useEffect(() => {
      const apiUrl = `${hostUrl}/api/candidate/applied/job/${userId.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      axios.get(apiUrl, config).then((res) => {
         setAppliedJobs(res.data);
      });
   }, [userId.id]);

   return (
      <>
         <NavBar />
         <Layout>
            <Sider
               breakpoint="lg"
               collapsedWidth="0"
               style={{
                  maxHeight: "91vh",
                  width: "20%",
                  position: "sticky",
                  top: "10%",
               }}
               onBreakpoint={(broken) => {}}
               onCollapse={(collapsed, type) => {}}
            >
               <Menu
                  style={{
                     backgroundColor: "#001529",
                     marginTop: "35%",
                  }}
               >
                  <SideLinks />
               </Menu>
            </Sider>
            <Layout>
               <Header
                  style={{
                     padding: 0,
                     position: "sticky",
                     zIndex: "50",
                     color: "white",
                  }}
               >
                  Candidate {">"} Applied Jobs{" "}
               </Header>
               <Content
                  style={{
                     margin: "24px 16px 0",
                     backgroundColor: "#F5F7FC",
                  }}
               >
                  <div
                     style={{
                        padding: 24,
                        minHeight: 360,
                     }}
                  >
                     <div className="heading">Applied jobs!</div>
                     <div className="subHeading">Ready to jump back in?</div>
                     <div
                        className="container-fluid mt-5 py-5"
                        style={{
                           backgroundColor: "#FFFFFF",
                           borderRadius: "12px",
                        }}
                     >
                        <div className="mx-4">
                           <div className="row">
                              <div className="col d-flex justify-content-between ">
                                 <p className="headingStyle">My Applied Jobs</p>
                                 <div className="input">
                                    <select
                                       className="form-select"
                                       aria-label="Default select example"
                                    >
                                       <option value="">Last 1 Month</option>
                                       <option value="">Last 3 Month</option>
                                       <option value="">Last 6 Month</option>
                                       <option value="">Last Year</option>
                                    </select>
                                 </div>
                              </div>
                           </div>

                           <div className="scroll">
                              <div className="container">
                                 <div
                                    className="row mt-3 py-4 px-3"
                                    style={{
                                       backgroundColor: "#F5F7FC",
                                       justifyContent: "space-between",
                                       borderRadius: "10px",
                                       backgroundColor: "#FFFFFF",
                                    }}
                                 >
                                    <table
                                       className="table table-striped "
                                       style={{ backgroundColor: "#FFFFFF" }}
                                    >
                                       <thead>
                                          <tr>
                                             <th scope="col" colspan="">
                                                Job Title
                                             </th>
                                             <th scope="col">Date Applied</th>
                                             <th scope="col">Status</th>
                                             <th scope="col">Action</th>
                                          </tr>
                                       </thead>
                                       <tbody
                                          style={{ backgroundColor: "none" }}
                                       >
                                          {appliedJobs.map((job) => (
                                             <AppliedJobs job={job} />
                                          ))}
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Content>
               <Footer
                  style={{
                     textAlign: "center",
                  }}
               >
                  Ant Design ©2023 Created by Ant UED
               </Footer>
            </Layout>
         </Layout>
      </>
   );
};

export default CandidateAppliedJobs;
