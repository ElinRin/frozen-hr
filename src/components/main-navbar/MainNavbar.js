import React, { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { navigate, usePath } from "hookrouter";
import {
  Collapse,
  Media,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import logo from "../../images/frozen32.png";
import {
  ProfileContext,
  UsersInfoContext,
  WorkPlaceInfoContext
} from "../../app/Context";
import { logoutUser, fetchMe, login } from "../../actions/user";
import "./MainNavbar.css";

export const MainNavbar = () => {
  const [cookies, , removeCookie] = useCookies(["frozenToken"]);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, profileDispatch] = useContext(ProfileContext);
  const [usersInfo, usersInfoDispatch] = useContext(UsersInfoContext);
  const [workPlaceInfo, workPlaceInfoDispatch] = useContext(
    WorkPlaceInfoContext
  );
  const path = usePath();
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (
      path !== "/login" &&
      path !== "/error" &&
      !(profile.userId && profile.userId.length)
    ) {
      login(profileDispatch).then(id => {
        if (!id) {
          navigate("/login", true);
        }
      });
    }
  }, [path, profile.userId, profileDispatch]);

  useEffect(() => {
    if (
      (profile.error || usersInfo.error || workPlaceInfo.error) &&
      path !== "/error"
    ) {
      navigate("/error", true);
    }
  }, [
    path,
    profile,
    profile.error,
    usersInfo,
    usersInfo.error,
    workPlaceInfo,
    workPlaceInfo.error
  ]);

  useEffect(() => {
    if (
      path !== "/login" &&
      path !== "/error" &&
      profile.userId &&
      !profile.fullName
    ) {
      fetchMe(profileDispatch).catch(error => {});
    }
  }, [path, profile.fullName, profile.userId, profileDispatch]);

  const renderNavBar = () => (
    <Navbar color="white" light expand="md" className="main-navbar-container">
      <NavbarBrand
        onClick={() => navigate("/")}
        className="main-navbar-logo-container"
      >
        <Media object bottom src={logo} />
        <span className="text-primary main-navbar-logo">Frozen HR</span>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="main-navbar-items" navbar>
          <NavItem>
            <NavLink href="#" onClick={() => navigate("/main")}>
              Main
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => navigate("/workplace")}>
              Workplace
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => navigate("/colleagues")}>
              Colleagues
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => navigate("/meetings")}>
              Meetings
            </NavLink>
          </NavItem>
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              <Media
                object
                bottom
                src={profile.profileImage}
                className="main-navbar-photo"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => navigate(`/u/${profile.userId}`)}>
                My Info
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                onClick={() => {
                  removeCookie("frozenToken", {
                    path: "/"
                  });
                  logoutUser(profileDispatch);
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );

  return (
    <>
      {path !== "/login" &&
        path !== "/error" &&
        profile.userId &&
        profile.fullName &&
        renderNavBar()}
    </>
  );
};
