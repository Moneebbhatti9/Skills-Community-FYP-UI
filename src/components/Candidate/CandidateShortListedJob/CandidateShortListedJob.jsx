import React from "react";
import NavBar from "../NavBar";
import "../Dashboard/css/Dashboard.css";
import { Layout, Menu } from "antd";
import SideLinks from "../SideLinks";
const { Header, Content, Footer, Sider } = Layout;

const CandidateShortListedJobs = () => {
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
                  Candidate {">"} Short Listed Jobs{" "}
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
                     <div className="heading">Shortlisted jobs!</div>
                     <div className="subHeading">Ready to jump back in?</div>
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

export default CandidateShortListedJobs;
