'use client'
import Image from "next/image";
import React, { useState } from "react";
import navStyles from '../styles/nav.module.css';
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Example() {
    const { data: session } = useSession();
    if (session) {
        return (
            <h1 className={navStyles.websiteHome}>LEMP</h1>
        )
    } else {
        return (
            <></>
        )
    }
}