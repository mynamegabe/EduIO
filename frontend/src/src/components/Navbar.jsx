import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export function NavBar() {
  return (
    <Navbar
      className="bg-[var(--bg)] text-white"
    >
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <img src="/cloudhacks_logo.png" className="w-10 mr-2" />
        <p className="font-bold text-inherit">EduAI</p>
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
    </Navbar>
  );
}