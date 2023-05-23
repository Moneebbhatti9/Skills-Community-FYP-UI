import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import "../Dashboard/css/Dashboard.css";
import "./css/AllApplicant.css";
import { Layout, Menu } from "antd";
import SideLinks from "../SideLinks";

import jwtDecode from "jwt-decode";
import axios from "axios";
import MappingApplicant from "./components/MappingApplicant";
import hostUrl from "../../Assets/Api";
import Loader from "../../ResuableComponent/Loader";

const { Header, Content, Footer, Sider } = Layout;

const AllApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  const jwt = localStorage.getItem("token");
  const userId = jwtDecode(jwt);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `${hostUrl}/api/company/profile/${userId.id}`;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(apiUrl, config).then((res) => {
      const comID = res.data[0]._id;

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`${hostUrl}/api/company/all/applicants/${comID}`, config)
        .then((res) => {
          setApplicants(res.data.allApplicants);
          setLoading(false);
        });
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
            top: "9%",
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
              top: "9%",
              color: "white",
            }}
          >
            {" "}
            Employer {">"} All Applicants{" "}
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
              <div className="title">Company Profile !</div>
              <div className="subTitle">Ready to jump back in ?</div>
              <div
                className="container mt-5 py-5 px-4 rounded shadow"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="row d-flex justify-content-between">
                  <div className="col-lg-2" style={{ fontSize: "18px" }}>
                    All Applicants
                  </div>
                  <div className="col-lg-4 d-flex justify-content-end">
                    <div className="selecJob mx-1">
                      <select
                        className="form-control dropDownColor"
                        placeholder="Select Job"
                      >
                        <option
                          value=""
                          disabled
                          selected
                          className="dropDownColor"
                        >
                          Select Jobs
                        </option>
                        <option
                          value="Last 12 Months"
                          className="dropDownColor"
                        >
                          Last 12 Months
                        </option>
                        <option
                          value="Last 16 Months"
                          className="dropDownColor"
                        >
                          Last 16 Months
                        </option>
                        <option
                          value="Last 24 Months"
                          className="dropDownColor"
                        >
                          Last 24 Months
                        </option>
                        <option value="Last 5 year" className="dropDownColor">
                          Last 5 year
                        </option>
                      </select>
                    </div>
                    <div className="allStatus">
                      <select className="form-control" placeholder="All Status">
                        <option
                          value=""
                          disabled
                          selected
                          className="dropDownColor"
                        >
                          All Status
                        </option>
                        <option
                          value="Last 12 Months"
                          className="dropDownColor"
                        >
                          Last 12 Months
                        </option>
                        <option
                          value="Last 16 Months"
                          className="dropDownColor"
                        >
                          Last 16 Months
                        </option>
                        <option
                          value="Last 24 Months"
                          className="dropDownColor"
                        >
                          Last 24 Months
                        </option>
                        <option value="Last 5 year" className="dropDownColor">
                          Last 5 year
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  <div className="row my-5">
                    {applicants.map((applicant) => (
                      <MappingApplicant applicant={applicant} />
                    ))}
                  </div>
                )}
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

export default AllApplicants;
