'use client'
import Image from "next/image";
import Navbar from "../../components/Navbar"
import { SessionProvider } from "next-auth/react";

export default function Systems() {
  return (
    <SessionProvider>
      <Navbar navTarget="systems"/>
    </SessionProvider>
  );
}
