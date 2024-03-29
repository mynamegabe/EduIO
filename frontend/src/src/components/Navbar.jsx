import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login")
  }

  return (
    <Navbar
      className="bg-[var(--bg)] text-white"
    >
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <img src="/cloudhacks_logo.png" className="w-10 mr-2" />
        <p className="font-bold text-inherit">EduIO</p>
      </NavbarBrand>
      <NavbarContent className="flex gap-4" justify="center">
        <NavbarItem>
          <Link color="primary" href="/search"
          className="text-white hover:text-primary"
          >
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="danger" variant="bordered"
            className="hover:border-danger-500"
            onClick={handleLogout}
          >
              Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
  );
}