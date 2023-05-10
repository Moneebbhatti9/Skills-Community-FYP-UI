import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./css/NavBar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import hostUrl from "../Assets/Api";

const NavBar = () => {
   // Register Hooks
   const [registerModel, setRegisterModel] = useState(false);
   const [registerAs, setRegisterAs] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");
   const [passwordError, setPasswordError] = useState("");

   // Login Hooks
   const [loginModel, setLoginModel] = useState(false);
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");
   const [loginError, setLoginError] = useState("");

   let user;
   const jwt = localStorage.getItem("token");
   if (jwt) {
      user = jwtDecode(jwt);
   }

   const isAuth = localStorage.getItem("token");

   const navigate = useNavigate();

   const handleRegisterModelClose = () => {
      setRegisterModel(false);
   };

   const handleRegisterModelShow = () => {
      setRegisterModel(true);
   };

   const handleLoginModelClose = () => {
      setLoginModel(false);
   };

   const handleLoginModelShow = () => {
      setLoginModel(true);
   };

   const handleOpenRegisterPopAndCloseLoginPopup = () => {
      setLoginModel(false);
      setRegisterModel(true);
   };

   const handleRegisterSubmit = async (e) => {
      e.preventDefault();

      const registerObject = {
         registerAs: registerAs,
         email: email,
         password: password,
      };
      if (password === confirmPassword) {
         setPasswordError("");
         try {
            await axios
               .post(
                  `${hostUrl}/api/account/register`,
                  registerObject
               )
               .then((res) => {
                  if (res.data.registerAs === "Employer") {
                     localStorage.setItem("token", res.data.token);
                     setError("");
                     setPasswordError("");
                     restRegisterValues();
                     setRegisterModel(false);
                     navigate("/employer/dashboard");
                  } else {
                     localStorage.setItem("token", res.data.token);
                     setError("");
                     setPasswordError("");
                     restRegisterValues();
                     setRegisterModel(false);
                     navigate("/candidate/dashboard");
                  }
               });
         } catch (ex) {
            if (ex.response && ex.response.status === 400) {
               setError(ex.response.data.message);
            }
         }
      } else {
         setPasswordError("Please Match Password");
      }
   };

   const handleLoginSubmit = async (e) => {
      e.preventDefault();

      const loginObject = {
         email: loginEmail,
         password: loginPassword,
      };

      try {
         await axios
            .post(`${hostUrl}/api/account/login`, loginObject)
            .then((res) => {
               if (res.data.registerAs === "Employer") {
                  localStorage.setItem("token", res.data.token);
                  setLoginError("");
                  resetLoginValues();
                  setLoginModel(false);
                  navigate("/employer/dashboard");
               } else {
                  localStorage.setItem("token", res.data.token);
                  setLoginError("");
                  resetLoginValues();
                  setLoginModel(false);
                  navigate("/candidate/dashboard");
               }
            });
      } catch (ex) {
         setLoginError(ex.response.data.message);
      }
   };

   const restRegisterValues = () => {
      setRegisterAs("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
   };
   const resetLoginValues = () => {
      setLoginEmail("");
      setLoginPassword("");
   };

   return (
      <>
         {/* Register Model */}
         <Modal show={registerModel} onHide={handleRegisterModelClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title
               className="text-center mt-4"
               style={{ fontFamily: "Montserrat" }}
            >
               Create a Free Community Skills Account
            </Modal.Title>
            <Modal.Body>
               <Form onSubmit={handleRegisterSubmit}>
                  <Form.Select
                     required
                     aria-label="Default select example"
                     className="mt-4"
                     defaultValue=""
                     value={registerAs}
                     onChange={(e) => setRegisterAs(e.target.value)}
                  >
                     <option value="" disabled>
                        Register as ...
                     </option>
                     <option value="Candidate">Candidate</option>
                     <option value="Employer">Employer</option>
                  </Form.Select>

                  <Form.Group className="mt-4">
                     <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </Form.Group>
                  <div className="text-danger">{error ? error : ""}</div>

                  <Form.Group className="mt-4">
                     <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </Form.Group>

                  <Form.Group className="mt-4">
                     <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </Form.Group>
                  <div className="text-danger">
                     {passwordError ? passwordError : ""}
                  </div>

                  <Button
                     variant="primary"
                     className="mt-5 w-100 mb-4"
                     type="submit"
                  >
                     Register
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
         </Modal>

         {/* Login Model */}
         <Modal show={loginModel} onHide={handleLoginModelClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title
               className="text-center mt-4"
               style={{ fontFamily: "Montserrat" }}
            >
               Login to Community Skills
            </Modal.Title>
            <Modal.Body>
               <Form onSubmit={handleLoginSubmit}>
                  <Form.Group className="mt-4">
                     <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                     />
                  </Form.Group>

                  <Form.Group className="mt-4">
                     <Form.Control
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                     />
                  </Form.Group>
                  <div className="text-danger">
                     {loginError ? loginError : ""}
                  </div>

                  <Button
                     variant="primary"
                     className="mt-5 w-100 mb-4"
                     type="submit"
                  >
                     Login
                  </Button>

                  <p className="text-center dontHaveAccountDesign">
                     Dont have an account ? &nbsp;
                     <span
                        onClick={handleOpenRegisterPopAndCloseLoginPopup}
                        style={{ cursor: "pointer" }}
                     >
                        <strong className="text-primary">Signup</strong>
                     </span>
                  </p>
               </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
         </Modal>

         {["lg"].map((expand) => (
            <Navbar key={expand} bg="light " expand={expand} className="">
               <Container fluid>
                  <Navbar.Brand to="#" className="mx-5">
                     <img
                        src="https://superio-next.vercel.app/images/logo.svg"
                        alt="brand"
                     />
                  </Navbar.Brand>
                  <Navbar.Toggle
                     aria-controls={`offcanvasNavbar-expand-${expand}`}
                  />
                  <Navbar.Offcanvas
                     id={`offcanvasNavbar-expand-${expand}`}
                     aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                     placement="end"
                  >
                     <Offcanvas.Header closeButton>
                        <Offcanvas.Title
                           id={`offcanvasNavbarLabel-expand-${expand}`}
                        >
                           <img
                              src="https://superio-next.vercel.app/images/logo.svg"
                              alt="brand"
                           />
                        </Offcanvas.Title>
                     </Offcanvas.Header>
                     <Offcanvas.Body>
                        <Nav className="flex-grow-1 pe-3">
                           <Nav.Link>
                              <Link className="linkDesign" to="/">
                                 Home
                              </Link>
                           </Nav.Link>
                           <Nav.Link>
                              <Link className="linkDesign" to="/findjobs">
                                 Find Jobs
                              </Link>
                           </Nav.Link>
                           <Nav.Link>
                              <Link className="linkDesign" to="#">
                                 Blog
                              </Link>
                           </Nav.Link>
                           <Nav.Link>
                              <Link className="linkDesign" to="#">
                                 Pages
                              </Link>
                           </Nav.Link>
                        </Nav>
                        {isAuth ? (
                           <div className=" d-flex">
                              <div className="loggenIn ">
                                 Logged in as : &nbsp;{" "}
                                 <strong> {user && user.email} </strong>
                              </div>
                              <Link to="/logout" className="text-danger mx-3">
                                 Logout
                              </Link>
                           </div>
                        ) : (
                           <Form className="d-flex">
                              <Button
                                 variant=""
                                 style={{
                                    backgroundColor: "#1967d2",
                                    color: "#fff",
                                 }}
                              >
                                 <span onClick={handleLoginModelShow}>
                                    Login
                                 </span>
                                 &nbsp; / &nbsp;
                                 <span onClick={handleRegisterModelShow}>
                                    Register
                                 </span>
                              </Button>
                           </Form>
                        )}
                     </Offcanvas.Body>
                  </Navbar.Offcanvas>
               </Container>
            </Navbar>
         ))}
      </>
   );
};

export default NavBar;
