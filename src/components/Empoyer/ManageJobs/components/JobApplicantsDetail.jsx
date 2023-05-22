import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar";
import "../../Dashboard/css/Dashboard.css";
import "../../AllApplicants/css/AllApplicant.css";
import { Layout, Menu } from "antd";
import SideLinks from "../../SideLinks";
import { useParams } from "react-router-dom";
import MappingJobApplicants from "./MappingJobApplicants";
import hostUrl from "../../../Assets/Api";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

const JobApplicants = () => {
  const [jobApplicants, setJobApplicants] = useState([]);
  const job = useParams();
  const id = job.id;

  console.log("State Job Applicants : ", jobApplicants);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await axios
          .get(`${hostUrl}/api/company/all/applicants/of/job/${id}`, config)
          .then((res) => {
            setJobApplicants(res.data.jobApplicants);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplicants();
  }, [id]);

  // useEffect(() => {
  //   axios.get(`${hostUrl}/api/all/applicants/of/job/${id}`).then((res) => {
  //     console.log("Job: ", res);
  //   });
  // }, []);

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
            Employer {">"} Job Applicants{" "}
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
              <div className="title"> Job Applicants !</div>
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
                          Select Candidates
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
                <div className="row my-5">
                  {jobApplicants.map((applicant) => (
                    <MappingJobApplicants applicant={applicant} />
                  ))}
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

export default JobApplicants;
