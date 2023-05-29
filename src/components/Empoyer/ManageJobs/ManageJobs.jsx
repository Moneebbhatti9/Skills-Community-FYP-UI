import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import "../Dashboard/css/Dashboard.css";
import { Layout, Menu } from "antd";
import SideLinks from "../SideLinks";
import "./EmployerManageJobs.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import ManageJob from "./components/ManageJob";
import hostUrl from "../../Assets/Api";
import Loader from "../../ResuableComponent/Loader";
import { toast } from "react-toastify";
import Length from "../../ResuableComponent/Length";

const { Header, Content, Footer, Sider } = Layout;

const ManageJobs = () => {
  const [manageJobs, setManageJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message] = useState("No Jobs to Manage.");

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
        .get(`${hostUrl}/api/company/manage/job/${comID}`, config)
        .then((res) => {
          setManageJobs(res.data.appliedJobs);
          setLoading(false);
        });
    });
  }, [userId.id]);

  const deleteManageJob = async (id) => {
    setLoading(true);
    const apiUrl = `${hostUrl}/api/company/manage/job/${id}`;

    await axios
      .delete(apiUrl)
      .then((res) => {
        console.log("Response", res);
        setLoading(false);
        toast.success("Job Delete Successfully");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

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
            Employer {">"} Manage Jobs{" "}
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
              <div className="heading">Manage jobs!!</div>
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
                    <div className="col d-flex justify-content-between">
                      <p className="headingStyle">My Job Listings</p>
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
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader />
                          </>
                        ) : (
                          <>
                            {manageJobs.length > 0 ? (
                              <>
                                <table
                                  className="table table-striped "
                                  style={{ backgroundColor: "#FFFFFF" }}
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col">Title</th>
                                      <th scope="col">Applications</th>
                                      <th scope="col">Created & Expired</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ backgroundColor: "none" }}>
                                    {manageJobs.map((job) => (
                                      <ManageJob
                                        job={job}
                                        deleteManageJob={deleteManageJob}
                                      />
                                    ))}
                                  </tbody>
                                </table>
                              </>
                            ) : (
                              <>
                                <Length message={message} />
                              </>
                            )}
                          </>
                        )}
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

export default ManageJobs;
