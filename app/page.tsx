import Image from "next/image";
import Navbar from "../components/Navbar"
import Link from 'next/link'
import InitializeDatabase from "@/components/InitializeDatabase";
export default function Home() {
  return (
    <>
      <InitializeDatabase/>
      <Navbar navTarget="home"/>
    </>
  );
}
