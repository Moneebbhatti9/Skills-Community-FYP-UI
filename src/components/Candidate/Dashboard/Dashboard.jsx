import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import "./css/Dashboard.css";
import { Layout, Menu, Card } from "antd";
import SideLinks from "../SideLinks";
import { BsFillBagDashFill, BsBookmark } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import axios from "axios";
import jwtDecode from "jwt-decode";
import hostUrl from "../../Assets/Api";
const { Header, Content, Footer, Sider } = Layout;

const CandidateDashboard = () => {
   const [appliedJobsLength, setAppliedJobsLength] = useState("");

   const jwt = localStorage.getItem("token");
   const user = jwtDecode(jwt);

   useEffect(() => {
      const apiUrl = `${hostUrl}/api/candidate/applied/job/length/${user.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      axios.get(apiUrl, config).then((res) => {
         setAppliedJobsLength(res.data.jobsLength);
      });
   }, [user.id]);

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
                  Candidate {">"} Dashboard{" "}
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
                     <div className="heading">Dashboard Home !</div>
                     <div className="subHeading">Ready to jump back in?</div>

                     <div className="container-fluid mt-5">
                        <div className="row">
                           <div className="col-lg-3 col-md-6 col-sm-12 mt-4">
                              <Card style={{}}>
                                 <div className="d-flex justify-content-around">
                                    <div className="">
                                       <BsFillBagDashFill className="text-primary icon_design-postjob" />
                                    </div>
                                    <div className="">
                                       <h4
                                          className="text-primary d-flex justify-content-end"
                                          style={{
                                             fontSize: "36px",
                                             fontWeight: "700",
                                          }}
                                       >
                                          {appliedJobsLength}
                                       </h4>
                                       <p
                                          style={{
                                             fontSize: "15px",
                                             color: "#202124",
                                             lineHeight: "26px",
                                          }}
                                       >
                                          Applied Jobs
                                       </p>
                                    </div>
                                 </div>
                              </Card>
                           </div>
                           <div className="col-lg-3 col-md-6 col-sm-12 mt-4">
                              <Card style={{}}>
                                 <div className="d-flex justify-content-around">
                                    <div className="">
                                       <FaFileInvoice className="text-danger icon_design-application" />
                                    </div>
                                    <div className="">
                                       <h4
                                          className="text-danger d-flex justify-content-end"
                                          style={{
                                             fontSize: "36px",
                                             fontWeight: "700",
                                          }}
                                       >
                                          9382
                                       </h4>
                                       <p
                                          style={{
                                             fontSize: "15px",
                                             color: "#202124",
                                             lineHeight: "26px",
                                          }}
                                       >
                                          Applications
                                       </p>
                                    </div>
                                 </div>
                              </Card>
                           </div>
                           <div className="col-lg-3 col-md-6 col-sm-12 mt-4">
                              <Card style={{}}>
                                 <div className="d-flex justify-content-around">
                                    <div className="">
                                       <TfiCommentAlt className="text-warning icon_design-messages" />
                                    </div>
                                    <div className="">
                                       <h4
                                          className="text-warning d-flex justify-content-end"
                                          style={{
                                             fontSize: "36px",
                                             fontWeight: "700",
                                          }}
                                       >
                                          74
                                       </h4>
                                       <p
                                          style={{
                                             fontSize: "15px",
                                             color: "#202124",
                                             lineHeight: "26px",
                                          }}
                                       >
                                          Messages
                                       </p>
                                    </div>
                                 </div>
                              </Card>
                           </div>
                           <div className="col-lg-3 col-md-6 col-sm-12 mt-4">
                              <Card style={{}}>
                                 <div className="d-flex justify-content-around">
                                    <div className="">
                                       <BsBookmark className="text-success icon_design-shortlist" />
                                    </div>
                                    <div className="">
                                       <h4
                                          className="text-success d-flex justify-content-end"
                                          style={{
                                             fontSize: "36px",
                                             fontWeight: "700",
                                          }}
                                       >
                                          21
                                       </h4>
                                       <p
                                          style={{
                                             fontSize: "15px",
                                             color: "#202124",
                                             lineHeight: "26px",
                                          }}
                                       >
                                          ShortList
                                       </p>
                                    </div>
                                 </div>
                              </Card>
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

export default CandidateDashboard;
