'use client'
import Image from "next/image";
import Navbar from "../components/Navbar"
import HomePage from "@/components/Home";
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <HomePage />
      <Navbar navTarget="home"/>
      
    </SessionProvider>
  )
}