import React from "react";
import NavBar from "../NavBar";
import { useState, useEffect } from "react";
import "../Dashboard/css/Dashboard.css";
import { Layout, Menu } from "antd";
import SideLinks from "../SideLinks";
import { DefaultEditor } from "react-simple-wysiwyg";
import { toast } from "react-toastify";
import axios from "axios";
import { Form, Space, Spin } from "antd";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { storage } from "../../Assets/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import jwtDecode from "jwt-decode";
import "./css/Candidate.css";
import dummyLogo from "./Assets/dummyLogo.png";
import hostUrl from "../../Assets/Api";
const { Header, Content, Footer, Sider } = Layout;

const CandidateProfile = () => {
   const [imageUpload, setImageUpload] = useState(null);
   const [candidateFullName, setCandidateFullName] = useState("");
   const [jobTitle, setJobTitle] = useState("");
   const [candidateDescription, setCandidateDescription] = useState("");
   const [candidatePhone, setCandidatePhone] = useState("");
   const [candidateEmail, setCandidateEmail] = useState("");
   const [candidateWebsite, setCandidateWebsite] = useState("");
   const [candidateCurrentSalary, setCandidateCurrentSalary] = useState("");
   const [candidateExpectedSalary, setCandidateExpectedSalary] = useState("");
   const [candidateExperience, setCandidateExperience] = useState("");
   const [candidateAge, setCandidateAge] = useState("");
   const [candidateEducationalLevel, setCandidateEducationLevel] = useState("");
   const [candidatelanguage, setCandidateLanguage] = useState("");

   const [twitter, setTwitter] = useState("");
   const [facebook, setFacebook] = useState("");
   const [linkedIn, setLinkedIn] = useState("");
   const [googlePlus, setGooglePlus] = useState("");

   const [city, setCity] = useState("");
   const [country, setCountry] = useState("");
   const [address, setAddress] = useState("");

   const [logo, setLogo] = useState("");
   const [candidateLogoModel, setCandidateLogoModel] = useState(false);

   console.log("res logo state : ", logo);

   const [show, setShow] = useState(false);
   const [form] = Form.useForm();

   const jwt = localStorage.getItem("token");
   const userId = jwtDecode(jwt);

   // Fetch Candidate Info to display values in input fields
   useEffect(() => {
      const apiUrl = `${hostUrl}/api/candidate/profile/${userId.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      axios.get(apiUrl, config).then((res) => {
         setCandidateFullName(res.data[0].fullName);
         setJobTitle(res.data[0].jobTitle);
         setCandidateDescription(res.data[0].description);
         setCandidateAge(res.data[0].age);
         setCandidateCurrentSalary(res.data[0].currentSalary);
         setCandidateExpectedSalary(res.data[0].expectedSalary);
         setCandidateEmail(res.data[0].email);
         setCandidatePhone(res.data[0].phone);
         setCandidateWebsite(res.data[0].website);
         setCandidateLanguage(res.data[0].languages);
         setCandidateEducationLevel(res.data[0].educationLevel);
         setCandidateExperience(res.data[0].experience);
      });
   }, [userId.id]);

   // Fetch Candidate Social Links Info to display values in input fields
   useEffect(() => {
      const apiUrl = `${hostUrl}/api/candidate/social/profile/links/${userId.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      axios.get(apiUrl, config).then((res) => {
         setTwitter(res.data[0].twitter);
         setFacebook(res.data[0].facebook);
         setLinkedIn(res.data[0].linkedIn);
         setGooglePlus(res.data[0].googlePlus);
      });
   }, [userId.id]);

   // Fetch Candidate Contact Info to display values in input fields
   useEffect(() => {
      const apiUrl = `${hostUrl}/api/candidate/profile/contact/info/${userId.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      axios.get(apiUrl, config).then((res) => {
         setCountry(res.data[0].country);
         setCity(res.data[0].city);
         setAddress(res.data[0].address);
      });
   }, [userId.id]);

   // Fetch Company Logo to display
   useEffect(() => {
      getCandidateInfo();
   }, []);
   const getCandidateInfo = async () => {
      const apiUrl = `${hostUrl}/api/candidate/profile/logo/${userId.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      axios.get(apiUrl, config).then((res) => {
         setLogo(res.data.candidateLogo.logo);
      });
   };

   // Creating Candidate Profile
   const candidateProfileHandler = (e) => {
      e.preventDefault();

      setShow(true);
      const apiUrl = `${hostUrl}/api/candidate/profile`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      const candidateProfile = {
         fullName: candidateFullName,
         jobTitle: jobTitle,
         phone: candidatePhone,
         email: candidateEmail,
         website: candidateWebsite,
         currentSalary: candidateCurrentSalary,
         expectedSalary: candidateExpectedSalary,
         experience: candidateExperience,
         age: parseInt(candidateAge),
         educationLevel: candidateEducationalLevel,
         languages: candidatelanguage,
         description: candidateDescription,
         userId: userId.id,
      };

      try {
         axios.post(apiUrl, candidateProfile, config).then((res) => {
            setShow(false);
            toast.info("Candidate Profile Added Successfully ...");
         });
      } catch (error) {
         console.log("Errors", error);
      }
   };

   // Creating Candidate Profile Social Links
   const candidateProfileSocialHandler = (e) => {
      e.preventDefault();

      setShow(true);
      const apiUrl = `${hostUrl}/api/candidate/profile/social/links`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      const socialObj = {
         twitter: twitter,
         facebook: facebook,
         linkedIn: linkedIn,
         googlePlus: googlePlus,
         userId: userId.id,
      };

      try {
         axios.post(apiUrl, socialObj, config).then((res) => {
            setShow(false);
            toast.info(
               "Company Profile Social Contacts Added Successfully ..."
            );
            form.resetFields();
         });
      } catch (error) {
         console.log("Errors", error);
      }
   };

   // Create Candidate Profile Contact Info
   const candidateProfileContactInfoHandler = (e) => {
      e.preventDefault();

      setShow(true);
      const apiUrl = `${hostUrl}/api/candidate/profile/contact/info`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      const contactInfoObjb = {
         city: city,
         country: country,
         address: address,
         userId: userId.id,
      };

      try {
         axios.post(apiUrl, contactInfoObjb, config).then((res) => {
            setShow(false);
            toast.info(
               "Company Profile Contacts Information Added Successfully ..."
            );
         });
      } catch (error) {}
   };

   // Create Candidate Profile Logo
   const candidateProfileLogoUpload = () => {
      setShow(true);
      const apiUrl = `${hostUrl}/api/candidate/profile/logo`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((res) => {
         getDownloadURL(imageRef).then((url) => {
            console.log("Url", url);
            const candidateProfile = {
               logo: url,
               userId: userId.id,
            };

            try {
               axios.post(apiUrl, candidateProfile, config).then((res) => {
                  getCandidateInfo();
                  setCandidateLogoModel(false);
                  setShow(false);
                  toast.info("Candidate Profile Logo Added Successfully ...");
               });
            } catch (error) {
               console.log("Errors", error);
            }
         });
      });
   };

   const showUploadModel = () => {
      setCandidateLogoModel(true);
   };

   const handleCloseCompanyProfileLogoModel = () => {
      setCandidateLogoModel(false);
   };

   return (
      <>
         {/* Show Loader */}
         <Modal show={show} backdrop="static" keyboard={false}>
            <div className="d-flex justify-content-center bg-warning">
               <div>
                  <Space style={{ position: "absolute", marginTop: "250px" }}>
                     <Spin
                        tip="Please Wait, While Creating Profile ..."
                        size="large"
                        className="text-light w-100"
                     ></Spin>
                  </Space>
               </div>
            </div>
         </Modal>
         {/* Show Loader */}

         {/* Show Model For Uploading Image */}
         <Modal show={candidateLogoModel}>
            <Modal.Header closeButton>
               <Modal.Title>Upload Logo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <span>Choose File to Upload</span>
               <input
                  type="file"
                  className="form-control mt-4 mb-3"
                  required
                  style={{ cursor: "pointer" }}
                  onChange={(event) => {
                     setImageUpload(event.target.files[0]);
                  }}
               />
            </Modal.Body>
            <Modal.Footer>
               <Button
                  variant="btn btn-outline-danger"
                  onClick={handleCloseCompanyProfileLogoModel}
               >
                  Cancel
               </Button>
               <Button
                  variant="btn btn-outline-primary"
                  onClick={candidateProfileLogoUpload}
               >
                  Upload Logo
               </Button>
            </Modal.Footer>
         </Modal>
         {/* Show Model For Uploading Image */}

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
                     zIndex: "50",
                     color: "white",
                  }}
               >
                  Candidate {">"} Profile{" "}
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
                     <div className="title">My Profile</div>
                     <div className="subTitle">Ready to jump back in ?</div>
                     <div
                        className="container-fluid mt-5"
                        style={{
                           backgroundColor: "#FFFFFF",
                           borderRadius: "12px",
                        }}
                     >
                        <div className="mx-4">
                           <div className="row">
                              <div className="d-flex mt-5">
                                 <div className="innerTitle mt-4">
                                    <b> Company Logo </b>
                                 </div>
                                 <div className="logo">
                                    <img
                                       src={logo ? logo : dummyLogo}
                                       // src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg"
                                       alt="Logo"
                                       className="logoDesign shadow"
                                       style={{ cursor: "pointer" }}
                                       title="Upload Logo"
                                       onClick={showUploadModel}
                                    />
                                 </div>
                              </div>
                              <div className="col mb-5">
                                 {/* Change here */}
                                 <form onSubmit={candidateProfileHandler}>
                                    {/* <div className="d-flex">
                                       <input
                                          type="file"
                                          className="form-control"
                                          style={{ cursor: "pointer" }}
                                          onChange={(event) => {
                                             setImageUpload(
                                                event.target.files[0]
                                             );
                                          }}
                                       />
                                       <label className="imageLabel">
                                          Max file size is 1MB, Minimum
                                          dimension: 330x300 And Suitable files
                                          are .jpg & .png
                                       </label>
                                    </div> */}

                                    {/* <hr /> */}
                                    <div className="row">
                                       <div className="col-lg-6 mt-5">
                                          <label
                                             htmlFor="candidateName"
                                             className="inputDesign mt-4"
                                          >
                                             Full Name:
                                          </label>

                                          <input
                                             required
                                             className="py-2 form-control"
                                             value={candidateFullName}
                                             onChange={(e) =>
                                                setCandidateFullName(
                                                   e.target.value
                                                )
                                             }
                                          />

                                          <label
                                             htmlFor="phone"
                                             className="inputDesign mt-4"
                                          >
                                             Phone No:
                                          </label>

                                          <input
                                             required
                                             className="py-2 form-control"
                                             placeholder="+92 3090460590"
                                             value={candidatePhone}
                                             onChange={(e) =>
                                                setCandidatePhone(
                                                   e.target.value
                                                )
                                             }
                                          />

                                          <label
                                             htmlFor="website"
                                             className="inputDesign mt-4"
                                          >
                                             Website:
                                          </label>

                                          <input
                                             type="url"
                                             value={candidateWebsite}
                                             style={{ width: "100%" }}
                                             className="form-control"
                                             onChange={(e) =>
                                                setCandidateWebsite(
                                                   e.target.value
                                                )
                                             }
                                          />

                                          <label
                                             htmlFor="experinece"
                                             className="inputDesign mt-4"
                                          >
                                             Experience:
                                          </label>

                                          <input
                                             id="experience"
                                             required
                                             className="py-2 form-control"
                                             value={candidateExperience}
                                             onChange={(e) =>
                                                setCandidateExperience(
                                                   e.target.value
                                                )
                                             }
                                          />

                                          <label
                                             htmlFor="education"
                                             className="inputDesign mt-4"
                                          >
                                             Education:
                                          </label>
                                          <select
                                             className="form-control"
                                             value={candidateEducationalLevel}
                                             onChange={(e) =>
                                                setCandidateEducationLevel(
                                                   e.target.value
                                                )
                                             }
                                          >
                                             <option value="Matric">
                                                Matric
                                             </option>
                                             <option value="Inter">
                                                Inter
                                             </option>
                                             <option value="Bachelor">
                                                Bachelor
                                             </option>
                                             <option value="Masters/Ph D">
                                                Masters/Ph D
                                             </option>
                                          </select>
                                       </div>

                                       <div className="col-lg-6 mt-5">
                                          <label
                                             htmlFor="jobtitle"
                                             className="inputDesign mt-4"
                                          >
                                             Job Title:
                                          </label>

                                          <input
                                             id="jobTitle"
                                             required
                                             className="py-2 form-control"
                                             value={jobTitle}
                                             onChange={(e) =>
                                                setJobTitle(e.target.value)
                                             }
                                          />

                                          <label
                                             htmlFor="email"
                                             className="inputDesign mt-4"
                                          >
                                             Email Address:
                                          </label>

                                          <input
                                             type="email"
                                             style={{ width: "100%" }}
                                             className="form-control"
                                             value={candidateEmail}
                                             onChange={(e) =>
                                                setCandidateEmail(
                                                   e.target.value
                                                )
                                             }
                                          />
                                          <div className="d-flex justify-content-between">
                                             <div>
                                                <label
                                                   htmlFor="currentSalary"
                                                   className="inputDesign mt-4"
                                                >
                                                   Current Salary($) :
                                                </label>

                                                <select
                                                   className="form-control"
                                                   value={
                                                      candidateCurrentSalary
                                                   }
                                                   onChange={(e) =>
                                                      setCandidateCurrentSalary(
                                                         e.target.value
                                                      )
                                                   }
                                                >
                                                   <option value="40-70">
                                                      40-70 k
                                                   </option>
                                                   <option value="80-100">
                                                      80-100 k
                                                   </option>
                                                   <option value="100-150">
                                                      100-150 k
                                                   </option>
                                                </select>
                                             </div>

                                             <div>
                                                <label
                                                   htmlFor="expectedSalary"
                                                   className="inputDesign mt-4"
                                                >
                                                   Expected Salary($) :
                                                </label>
                                                <select
                                                   className="form-control"
                                                   value={
                                                      candidateExpectedSalary
                                                   }
                                                   onChange={(e) =>
                                                      setCandidateExpectedSalary(
                                                         e.target.value
                                                      )
                                                   }
                                                >
                                                   <option value="50-80 k">
                                                      50-80 k
                                                   </option>
                                                   <option value="100-150 k">
                                                      100-150 k
                                                   </option>
                                                   <option value="150-200 k">
                                                      150-200 k
                                                   </option>
                                                </select>
                                             </div>
                                          </div>

                                          <label
                                             htmlFor="age"
                                             className="inputDesign mt-4"
                                          >
                                             Age :
                                          </label>

                                          <input
                                             type="text"
                                             className="form-control"
                                             value={candidateAge}
                                             onChange={(e) =>
                                                setCandidateAge(e.target.value)
                                             }
                                          />

                                          <label
                                             htmlFor="languages"
                                             className="inputDesign mt-4"
                                             style={{ marginTop: "1rem" }}
                                          >
                                             Languages:
                                          </label>

                                          <select
                                             className="form-control"
                                             value={candidatelanguage}
                                             onChange={(e) =>
                                                setCandidateLanguage(
                                                   e.target.value
                                                )
                                             }
                                          >
                                             <option value="English">
                                                English
                                             </option>
                                             <option value="Urdu">Urdu</option>
                                             <option value="Saraiki">
                                                Saraiki
                                             </option>
                                          </select>
                                       </div>

                                       <label
                                          htmlFor="description"
                                          className="inputDesign mt-4"
                                       >
                                          Description :
                                       </label>

                                       <DefaultEditor
                                          value={candidateDescription}
                                          onChange={(e) =>
                                             setCandidateDescription(
                                                e.target.value
                                             )
                                          }
                                       />
                                    </div>

                                    <button
                                       type="primary"
                                       className="mt-5 btn btn-primary"
                                       htmlType="submit"
                                    >
                                       Submit
                                    </button>
                                 </form>

                                 {/* To here */}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div
                     style={{
                        padding: 24,
                        minHeight: 360,
                     }}
                  >
                     <div
                        className="container-fluid mt-1"
                        style={{
                           backgroundColor: "#FFFFFF",
                           borderRadius: "12px",
                        }}
                     >
                        <div className="mx-4">
                           <div className="row">
                              <div className="innerTitle mt-4">
                                 Social Networks
                              </div>
                              <div className="col my-5">
                                 <form onSubmit={candidateProfileSocialHandler}>
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="twitter"
                                             className="inputDesign mt-4"
                                          >
                                             Twitter :
                                          </label>
                                          <input
                                             id="twitter"
                                             type="url"
                                             className="py-2 form-control"
                                             value={twitter}
                                             onChange={(e) => {
                                                setTwitter(e.target.value);
                                             }}
                                          />

                                          <label
                                             htmlFor="facebook"
                                             className="inputDesign mt-4"
                                          >
                                             Facebook :
                                          </label>

                                          <input
                                             id="facebook"
                                             type="url"
                                             className="py-2 form-control"
                                             value={facebook}
                                             onChange={(e) => {
                                                setFacebook(e.target.value);
                                             }}
                                          />
                                       </div>
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="linkedIn"
                                             className="inputDesign mt-4"
                                          >
                                             linkedIn :
                                          </label>

                                          <input
                                             id="linkedIn"
                                             type="url"
                                             className="py-2 form-control"
                                             value={linkedIn}
                                             onChange={(e) => {
                                                setLinkedIn(e.target.value);
                                             }}
                                          />

                                          <label
                                             htmlFor="GooglePlus"
                                             className="inputDesign mt-4"
                                          >
                                             GooglePlus :
                                          </label>

                                          <input
                                             id="GooglePlus"
                                             type="url"
                                             className="py-2 form-control"
                                             value={googlePlus}
                                             onChange={(e) => {
                                                setGooglePlus(e.target.value);
                                             }}
                                          />
                                       </div>

                                       <button
                                          type="primary"
                                          className="mt-5 btn btn-primary"
                                          htmlType="submit"
                                       >
                                          Save
                                       </button>
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div
                     style={{
                        padding: 24,
                        minHeight: 360,
                     }}
                  >
                     <div
                        className="container-fluid mt-1"
                        style={{
                           backgroundColor: "#FFFFFF",
                           borderRadius: "12px",
                        }}
                     >
                        <div className="mx-4">
                           <div className="row">
                              <div className="innerTitle mt-4">
                                 Contact Information
                              </div>
                              <div className="col my-5">
                                 <form
                                    onSubmit={
                                       candidateProfileContactInfoHandler
                                    }
                                 >
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="country"
                                             className="inputDesign mt-4"
                                          >
                                             Country :
                                          </label>

                                          <input
                                             type="text"
                                             value={country}
                                             onChange={(e) =>
                                                setCountry(e.target.value)
                                             }
                                             className="form-control"
                                          />
                                       </div>
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="city"
                                             className="inputDesign mt-4"
                                          >
                                             City :
                                          </label>
                                          <input
                                             type="text"
                                             value={city}
                                             onChange={(e) =>
                                                setCity(e.target.value)
                                             }
                                             className="form-control"
                                          />
                                       </div>

                                       <div>
                                          <label
                                             htmlFor="completeAddress"
                                             className="inputDesign mt-4"
                                          >
                                             Complete Address :
                                          </label>
                                          <input
                                             type="text"
                                             value={address}
                                             onChange={(e) =>
                                                setAddress(e.target.value)
                                             }
                                             className="form-control"
                                          />
                                       </div>

                                       <button
                                          className="mt-5 btn btn-primary"
                                          type="submit"
                                       >
                                          Save
                                       </button>
                                    </div>
                                 </form>
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

export default CandidateProfile;
