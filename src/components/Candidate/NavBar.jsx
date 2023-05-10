import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import jwtDecode from "jwt-decode";

const NavBar = () => {
   const jwt = localStorage.getItem("token");
   const user = jwtDecode(jwt);

   return (
      <>
         <div style={{ position: "sticky", top: "0", zIndex: "100" }}>
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
                           {/* <Form className="d-flex"> */}
                           <div className=" d-flex">
                              <div className="loggenIn ">
                                 Logged in as : &nbsp;{" "}
                                 <strong> {user.email} </strong>
                              </div>
                              <Link to="/logout" className="text-danger mx-3">
                                 Logout
                              </Link>
                           </div>
                           {/* </Form> */}
                        </Offcanvas.Body>
                     </Navbar.Offcanvas>
                  </Container>
               </Navbar>
            ))}
         </div>
      </>
   );
};

export default NavBar;
