'use client'
import Navbar from "../components/Navbar";
import Home from "@/components/Home"; // Updated Home component
import { SessionProvider } from "next-auth/react";

export default function HomePage() {
  return (
    <SessionProvider>
      {/* The Navbar is only shown when the user is signed in */}
      <Navbar navTarget="home" />
      <Home /> {/* Home component where useSession is used */}
    </SessionProvider>
  );
}
