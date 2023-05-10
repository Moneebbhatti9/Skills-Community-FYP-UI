import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../NavBar";
import "../Dashboard/css/Dashboard.css";
import { Layout, Menu } from "antd";
import SideLinks from "../SideLinks";
import { storage } from "../../Assets/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DefaultEditor } from "react-simple-wysiwyg";
import { toast } from "react-toastify";
import axios from "axios";
import { Space, Spin } from "antd";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./css/CompanyProfile.css";
import jwtDecode from "jwt-decode";
import dummyLogo from "./Assets/dummyLogo.png";

const { Header, Content, Footer, Sider } = Layout;

const CompanyProfile = () => {
   const [imageUpload, setImageUpload] = useState(null);
   const [companyName, setCompanyName] = useState("");
   const [emialAddress, setEmialAddress] = useState("");
   const [phone, setPhone] = useState("");
   const [website, setWebsite] = useState("");
   const [teamSize, setTeamSize] = useState("");
   const [aboutCompany, setAboutCompany] = useState("");
   const [estSince, setEstSince] = useState("");

   const [twitter, setTwitter] = useState("");
   const [facebook, setFacebook] = useState("");
   const [linkedIn, setLinkedIn] = useState("");
   const [googlePlus, setGooglePlus] = useState("");

   const [city, setCity] = useState("");
   const [country, setCountry] = useState("");
   const [address, setAddress] = useState("");

   const [logo, setLogo] = useState("");
   const [companyLogoModel, setComapnyLogoModel] = useState(false);

   const [show, setShow] = useState(false);

   const jwt = localStorage.getItem("token");
   const userId = jwtDecode(jwt);

   // Fetch Company Info to display values in input fields
   useEffect(() => {
      const apiUrl = `http://localhost:5000/api/company/profile/${userId.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      axios.get(apiUrl, config).then((res) => {
         setCompanyName(res.data[0].comapnyName);
         setEmialAddress(res.data[0].emialAddress);
         setPhone(res.data[0].phone);
         setWebsite(res.data[0].website);
         setTeamSize(res.data[0].teamSize);
         setAboutCompany(res.data[0].aboutCompany);
         setEstSince(res.data[0].estSince);
      });
   }, [userId.id]);

   // Fetch Company Social Links Info to display values in input fields
   useEffect(() => {
      const apiUrl = `http://localhost:5000/api/company/profile/social/links/${userId.id}`;
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

   // Fetch Company Contact Info to display values in input fields
   useEffect(() => {
      const apiUrl = `http://localhost:5000/api/company/profile/contact/info/${userId.id}`;
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
      getCompanyInfo();
   }, []);
   const getCompanyInfo = async () => {
      const apiUrl = `http://localhost:5000/api/company/profile/logo/${userId.id}`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      axios.get(apiUrl, config).then((res) => {
         setLogo(res.data.companyLogo.logo);
      });
   };

   // Creating Comapny Profile
   const companyProfileHandler = (e) => {
      e.preventDefault();

      setShow(true);
      const apiUrl = "http://localhost:5000/api/company/profile";
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      const companyProfile = {
         comapnyName: companyName,
         emialAddress: emialAddress,
         phone: phone,
         website: website,
         estSince: estSince,
         teamSize: teamSize,
         aboutCompany: aboutCompany,
         userId: userId.id,
      };

      try {
         axios.post(apiUrl, companyProfile, config).then((res) => {
            setShow(false);
            toast.info("Company Profile Added Successfully ...");
         });
      } catch (error) {
         console.log("Errors", error);
      }
   };

   // Creating Company Profile Social Links
   const companyProfileSocialHandler = (e) => {
      e.preventDefault();

      setShow(true);
      const apiUrl = "http://localhost:5000/api/company/profile/social/links";
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
         });
      } catch (error) {
         console.log("Errors", error);
      }
   };

   // Creating Company Profile Contact Information
   const companyProfileContactInfoHandler = (e) => {
      e.preventDefault();

      setShow(true);
      const apiUrl = "http://localhost:5000/api/company//profile/contact/info";
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      const contactObj = {
         country: country,
         city: city,
         address: address,
         userId: userId.id,
      };

      try {
         axios.post(apiUrl, contactObj, config).then((res) => {
            setShow(false);
            toast.info("Company Profile Contacts Added Successfully ...");
         });
      } catch (error) {
         console.log("Errors: ", error);
      }
   };

   // Creating Company Profile Logo
   const companyProfileLogoUpload = () => {
      setShow(true);
      const apiUrl = "http://localhost:5000/api/company/profile/logo";
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
            const companyProfileLogo = {
               logo: url,
               userId: userId.id,
            };

            try {
               axios.post(apiUrl, companyProfileLogo, config).then((res) => {
                  setComapnyLogoModel(false);
                  setShow(false);
                  getCompanyInfo();
                  toast.info("Company Profile Logo Added Successfully ...");
               });
            } catch (error) {
               console.log("Errors", error);
            }
         });
      });
   };

   const showUploadModel = () => {
      setComapnyLogoModel(true);
   };

   const handleCloseCompanyProfileLogoModel = () => {
      setComapnyLogoModel(false);
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
         <Modal show={companyLogoModel}>
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
                  onClick={companyProfileLogoUpload}
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
                     //top: "9%",
                     color: "white",
                     zIndex: "50",
                  }}
               >
                  {" "}
                  Employer {">"} Company Profile{" "}
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
                     <div className="title">Company Profile</div>
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
                                       alt="Logo"
                                       className="logoDesign shadow"
                                       style={{ cursor: "pointer" }}
                                       title="Upload Logo"
                                       onClick={showUploadModel}
                                    />
                                 </div>
                              </div>
                              <div className="col mb-5 ">
                                 {/* Changed Here */}
                                 <form onSubmit={companyProfileHandler}>
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

                                    <div className="row">
                                       <div className="col-lg-6 mt-5">
                                          <label
                                             htmlFor="comapnyName"
                                             className="inputDesign"
                                          >
                                             Company Name:
                                          </label>

                                          <input
                                             required
                                             className="py-2 form-control"
                                             value={companyName}
                                             onChange={(e) =>
                                                setCompanyName(e.target.value)
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
                                             value={phone}
                                             onChange={(e) =>
                                                setPhone(e.target.value)
                                             }
                                          />

                                          <label
                                             htmlFor="establishSince"
                                             className="inputDesign mt-4"
                                          >
                                             Establish Since:
                                          </label>

                                          <input
                                             type="date"
                                             style={{ width: "100%" }}
                                             className="form-control"
                                             value={estSince}
                                             onChange={(e) =>
                                                setEstSince(e.target.value)
                                             }
                                          />
                                       </div>

                                       <div className="col-lg-6 mt-5">
                                          <label
                                             htmlFor="comapnyEmail"
                                             className="inputDesign"
                                          >
                                             Email Address:
                                          </label>

                                          <input
                                             required
                                             className="py-2 form-control"
                                             value={emialAddress}
                                             onChange={(e) =>
                                                setEmialAddress(e.target.value)
                                             }
                                          />

                                          <label
                                             htmlFor="Website"
                                             className="inputDesign mt-4"
                                          >
                                             Website:
                                          </label>

                                          <input
                                             type="url"
                                             style={{ width: "100%" }}
                                             className="form-control"
                                             value={website}
                                             onChange={(e) =>
                                                setWebsite(e.target.value)
                                             }
                                          />

                                          <label
                                             htmlFor="teamSize"
                                             className="inputDesign mt-4"
                                          >
                                             Team Size :
                                          </label>

                                          <select
                                             value={teamSize}
                                             onChange={(e) =>
                                                setTeamSize(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select Team Size
                                             </option>
                                             <option value="50-100">
                                                50-100
                                             </option>
                                             <option value="100-150">
                                                100-150
                                             </option>
                                             <option value="200-350">
                                                200-350
                                             </option>
                                             <option value="500-1000">
                                                500-1000
                                             </option>
                                          </select>
                                       </div>

                                       <label
                                          htmlFor="about"
                                          className="inputDesign mt-4"
                                       >
                                          About Company :
                                       </label>
                                       <DefaultEditor
                                          value={aboutCompany}
                                          onChange={(e) =>
                                             setAboutCompany(e.target.value)
                                          }
                                       />
                                       <button
                                          className="mt-5 btn btn-primary"
                                          type="submit"
                                       >
                                          Save
                                       </button>
                                    </div>
                                 </form>
                                 {/* To Here */}
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
                                 <form onSubmit={companyProfileSocialHandler}>
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="twitter"
                                             className="inputDesign"
                                          >
                                             Twitter :
                                          </label>

                                          <input
                                             type="url"
                                             className="py-2 form-control"
                                             value={twitter}
                                             required
                                             onChange={(e) =>
                                                setTwitter(e.target.value)
                                             }
                                          />

                                          <label
                                             htmlFor="facebook"
                                             className="inputDesign mt-4"
                                          >
                                             Facebook :
                                          </label>

                                          <input
                                             type="url"
                                             className="py-2 form-control"
                                             value={facebook}
                                             required
                                             onChange={(e) =>
                                                setFacebook(e.target.value)
                                             }
                                          />
                                       </div>
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="linkedIn"
                                             className="inputDesign"
                                          >
                                             linkedIn :
                                          </label>

                                          <input
                                             type="url"
                                             className="py-2 form-control"
                                             value={linkedIn}
                                             required
                                             onChange={(e) =>
                                                setLinkedIn(e.target.value)
                                             }
                                          />

                                          <label
                                             htmlFor="GooglePlus"
                                             className="inputDesign mt-4"
                                          >
                                             GooglePlus :
                                          </label>

                                          <input
                                             type="url"
                                             className="py-2 form-control"
                                             value={googlePlus}
                                             required
                                             onChange={(e) =>
                                                setGooglePlus(e.target.value)
                                             }
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
                                    onSubmit={companyProfileContactInfoHandler}
                                 >
                                    <div className="row">
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="country"
                                             className="inputDesign"
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
                                             className="inputDesign"
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
                                             className="py-2 form-control"
                                             value={address}
                                             onChange={(e) =>
                                                setAddress(e.target.value)
                                             }
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

export default CompanyProfile;
