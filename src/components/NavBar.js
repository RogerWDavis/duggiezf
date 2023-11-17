User
import styles from "../styles/NavBar.module.css";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import Carousel from "react-bootstrap/Carousel"; // Import Carousel component

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      {/* ... (unchanged code) ... */}
    </>
  );

  const loggedOutIcons = (
    <>
      {/* ... (unchanged code) ... */}
    </>
  );

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/assets/logo.jpg" 
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src/assets/logo.jpg" 
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
      <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top" style={{ backgroundColor: "transparent", border: "none" }}>
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}
          <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-right">
              <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
                <i className="fas fa-home"></i>Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};