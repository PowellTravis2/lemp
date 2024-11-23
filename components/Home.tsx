'use client'
import React from "react";
import styles from '../styles/home.module.css';
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    { session ? (
        <>
        <p>NOT READY</p>
        </>
    ) : (
        <>
        </>
    )}
}
