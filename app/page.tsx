'use client'
import Image from "next/image";
import Navbar from "../components/Navbar"
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <Navbar navTarget="home"/>
      
    </SessionProvider>
  )
}
