import React, { useState } from "react";
import NavBar from "../NavBar";
import "../Dashboard/css/Dashboard.css";
import { Layout, Menu } from "antd";
import SideLinks from "../SideLinks";
import { Space, Spin } from "antd";
import { DefaultEditor } from "react-simple-wysiwyg";
import { storage } from "../../Assets/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import "./css/PostJob.css";
import hostUrl from './../../Assets/Api';
const { Header, Content, Footer, Sider } = Layout;

const PostJob = () => {
   const [jobTitle, setjobTitle] = useState("");
   const [imageUplaod, setImageUpload] = useState(null);
   const [jobDescription, setJobDescription] = useState("");
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [jobType, setJobType] = useState("");
   const [offeredSalary, setOfferedSalary] = useState("");
   const [exprience, setExprience] = useState("");
   const [gender, setGender] = useState("");
   const [qualification, setQualification] = useState("");
   const [applicationDeadLine, setApplicationDeadLine] = useState("");
   const [country, setCountry] = useState("");
   const [city, setCity] = useState("");
   const [completeAddress, setCompleteAddress] = useState("");

   const [show, setShow] = useState(false);

   const handlePostJobHandler = (e) => {
      e.preventDefault();

      setShow(true);
      const apiUrl = `${hostUrl}/api/post/job`;
      const token = localStorage.getItem("token");
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      if (imageUplaod == null) return;
      const imageRef = ref(storage, `images/${imageUplaod.name}`);

      uploadBytes(imageRef, imageUplaod).then((res) => {
         getDownloadURL(imageRef).then((url) => {
            const postObj = {
               jobTitle: jobTitle,
               jobDescription: jobDescription,
               email: email,
               username: username,
               jobType: jobType,
               offeredSalary: offeredSalary,
               exprience: exprience,
               gender: gender,
               qualification: qualification,
               applicationDeadLine: applicationDeadLine,
               country: country,
               city: city,
               completeAddress: completeAddress,
               imageUrl: url,
            };

            try {
               axios.post(apiUrl, postObj, config).then((res) => {
                  setShow(false);
                  toast.info("Job Posted Successfully ...");
                  resetFormValues();
               });
            } catch (error) {
               console.log("Errors", error);
            }
         });
      });
   };

   const resetFormValues = () => {
      setjobTitle("");
      setJobDescription("");
      setEmail("");
      setUsername("");
      setJobType("");
      setOfferedSalary("");
      setExprience("");
      setGender("");
      setQualification("");
      setCountry("");
      setCity("");
      setCompleteAddress("");
      setApplicationDeadLine("");
      setImageUpload(null);
   };

   return (
      <>
         {/* Show Loader */}
         <Modal show={show} backdrop="static" keyboard={false}>
            <div className="d-flex justify-content-center bg-warning">
               <div>
                  <Space style={{ position: "absolute", marginTop: "250px" }}>
                     <Spin
                        tip="Please Wait, While creating a new job ..."
                        size="large"
                        className="text-light w-100"
                     ></Spin>
                  </Space>
               </div>
            </div>
         </Modal>

         {/* Show Loader */}
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
                  // bottom: "0%",
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
                     // position: "sticky",
                     // top: "9%",
                     color: "white",
                  }}
               >
                  {" "}
                  Employer {">"} Post A Job{" "}
               </Header>
               <Content
                  style={{
                     margin: "24px 16px 0",
                     backgroundColor: "#F5F7FC",
                  }}
                  className="mx-5"
               >
                  <div
                     style={{
                        padding: 24,
                        minHeight: 360,
                     }}
                  >
                     <div className="title">Post A new Job !</div>
                     <div className="subTitle">Ready to jump back in ?</div>
                     <div
                        className="container-fluid mt-5"
                        style={{
                           backgroundColor: "#FFFFFF",
                           borderRadius: "12px",
                        }}
                     >
                        <div className="mx-4 removeMargin">
                           <div className="row">
                              <div className="innerTitle mt-4">Post Job</div>
                              <div className="col mt-5">
                                 {/* Change Here */}
                                 <form
                                    onSubmit={handlePostJobHandler}
                                    className="mb-5"
                                 >
                                    <label
                                       htmlFor="jobTitle"
                                       className="inputDesign"
                                    >
                                       Job Title :
                                    </label>

                                    <input
                                       required
                                       id="jobTitle"
                                       className="py-2 form-control"
                                       value={jobTitle}
                                       onChange={(e) =>
                                          setjobTitle(e.target.value)
                                       }
                                    />

                                    <label
                                       htmlFor="description"
                                       className="inputDesign mt-4"
                                    >
                                       Job Description :
                                    </label>
                                    <DefaultEditor
                                       value={jobDescription}
                                       onChange={(e) =>
                                          setJobDescription(e.target.value)
                                       }
                                    />

                                    <div className="row mt-4">
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="email"
                                             className="inputDesign"
                                          >
                                             Email :
                                          </label>

                                          <input
                                             id="email"
                                             className="py-2 form-control"
                                             value={email}
                                             onChange={(e) =>
                                                setEmail(e.target.value)
                                             }
                                          />
                                       </div>
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="username"
                                             className="inputDesign"
                                          >
                                             Username :
                                          </label>

                                          <input
                                             id="email"
                                             className="py-2 form-control"
                                             value={username}
                                             onChange={(e) =>
                                                setUsername(e.target.value)
                                             }
                                          />
                                       </div>
                                    </div>

                                    <div className="row mt-4">
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="carrierLevel"
                                             className="inputDesign"
                                          >
                                             Job Type :
                                          </label>

                                          <select
                                             value={jobType}
                                             onChange={(e) =>
                                                setJobType(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select Job Type
                                             </option>
                                             <option value="Web Developer">
                                                Web Developer
                                             </option>
                                             <option value="App developer">
                                                App developer
                                             </option>
                                             <option value="Banking">
                                                Banking
                                             </option>
                                             <option value="Management">
                                                Management
                                             </option>
                                             <option value="Human Resource">
                                                Human Resource
                                             </option>
                                             <option value="Digital Marketing">
                                                Digital Marketing
                                             </option>
                                             <option value="Textile">
                                                Textile
                                             </option>
                                             <option value="Networking">
                                                Networking
                                             </option>
                                          </select>
                                       </div>
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="offeredSalary"
                                             className="inputDesign"
                                          >
                                             Offered Salary :
                                          </label>

                                          <select
                                             value={offeredSalary}
                                             onChange={(e) =>
                                                setOfferedSalary(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select Offered Salary
                                             </option>
                                             <option value="1500">$1500</option>
                                             <option value="2000">$2000</option>
                                             <option value="2500">$2500</option>
                                             <option value="3500">$3500</option>
                                             <option value="4500">$4500</option>
                                             <option value="5000">$5000</option>
                                             <option value="6000">$6000</option>
                                             <option value="8000">$8000</option>
                                             <option value="1000">$1000</option>
                                          </select>
                                       </div>
                                    </div>

                                    <div className="row mt-4">
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="carrierLevel"
                                             className="inputDesign"
                                          >
                                             Exprience :
                                          </label>

                                          <select
                                             value={exprience}
                                             onChange={(e) =>
                                                setExprience(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select Carrier Level
                                             </option>
                                             <option value="Junior">
                                                Junior
                                             </option>
                                             <option value="Intermediate">
                                                Intermediate
                                             </option>
                                             <option value="Senior">
                                                Senior
                                             </option>
                                          </select>
                                       </div>
                                       <div className="col-lg-6">
                                          <label
                                             htmlFor="gender"
                                             className="inputDesign"
                                          >
                                             Gender :
                                          </label>

                                          <select
                                             value={gender}
                                             onChange={(e) =>
                                                setGender(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select Gender
                                             </option>
                                             <option value="male">Male</option>
                                             <option value="female">
                                                Female
                                             </option>
                                          </select>
                                       </div>

                                       <div className="col-lg-6 mt-4">
                                          <label
                                             htmlFor="qualification"
                                             className="inputDesign"
                                          >
                                             Qualification :
                                          </label>

                                          <select
                                             value={qualification}
                                             onChange={(e) =>
                                                setQualification(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select Qualification
                                             </option>
                                             <option value="matric">
                                                Matric
                                             </option>
                                             <option value="inter">
                                                Inter
                                             </option>
                                             <option value="BS">
                                                BS/BA/ADP
                                             </option>
                                             <option value="MS">
                                                MS/Mphil
                                             </option>
                                          </select>
                                       </div>

                                       <div className="col-lg-6 mt-4">
                                          <label
                                             htmlFor="city"
                                             className="inputDesign"
                                          >
                                             City :
                                          </label>

                                          <select
                                             value={city}
                                             onChange={(e) =>
                                                setCity(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select City
                                             </option>
                                             <option value="Sargodha">
                                                Sargodha
                                             </option>
                                             <option value="Mianwali">
                                                Mianwali
                                             </option>
                                          </select>
                                       </div>

                                       <div className="col-lg-6 mt-4">
                                          <label
                                             htmlFor="country"
                                             className="inputDesign"
                                          >
                                             Country :
                                          </label>

                                          <select
                                             value={country}
                                             onChange={(e) =>
                                                setCountry(e.target.value)
                                             }
                                             className="form-control"
                                          >
                                             <option value="" disabled>
                                                Select Country
                                             </option>
                                             <option value="Pakistan">
                                                Pakistan
                                             </option>
                                             <option value="India">
                                                India
                                             </option>
                                          </select>
                                       </div>

                                       <div className="col-lg-6 mt-4">
                                          <label
                                             htmlFor="applicationDeadLine"
                                             className="inputDesign"
                                          >
                                             Application DeadLine :
                                          </label>
                                          <input
                                             type="date"
                                             value={applicationDeadLine}
                                             onChange={(e) =>
                                                setApplicationDeadLine(
                                                   e.target.value
                                                )
                                             }
                                             style={{ width: "100%" }}
                                             className="form-control"
                                          />
                                       </div>
                                    </div>

                                    <div className="mt-4">
                                       <label
                                          htmlFor="completeAddress"
                                          className="inputDesign"
                                       >
                                          Complete Address :
                                       </label>
                                       <input
                                          value={completeAddress}
                                          onChange={(e) =>
                                             setCompleteAddress(e.target.value)
                                          }
                                          className="form-control"
                                       />
                                    </div>

                                    <div className="mt-4">
                                       <label
                                          htmlFor="image"
                                          className="inputDesign"
                                       >
                                          Upload File :
                                       </label>
                                       <input
                                          type="file"
                                          className="py-2 rounded-3 form-control"
                                          style={{ cursor: "pointer" }}
                                          onChange={(event) => {
                                             setImageUpload(
                                                event.target.files[0]
                                             );
                                          }}
                                       />
                                    </div>

                                    <button
                                       className="mt-5 btn btn-primary"
                                       type="submit"
                                    >
                                       Post Job
                                    </button>
                                 </form>
                                 {/* To Here */}
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

export default PostJob;

// https://restcountries.com/v3.1/all
