'use client'
import Navbar from "../components/Navbar";
import Home from "@/components/Home";
import global from "@/styles/global.module.css";
import { SessionProvider } from "next-auth/react";

export default function HomePage() {
  return (
    <SessionProvider>
      <Navbar navTarget="home" />
      <div className={global.usefulArea}>
        <Home /> 
      </div>
    </SessionProvider>
  );
}
