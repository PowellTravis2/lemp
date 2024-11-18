'use client'
import React from "react";
import styles from '../styles/home.module.css';
import { useSession } from "next-auth/react";

export default function Example() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <h1 className={styles.websiteName}>LEMP</h1>
                <div className={styles.horizontalLine}></div>
                {/* Box with light grey background */}
                <div className={styles.boxContainer}>
                    <p className={styles.boxText}>This is some sample text inside the box.</p>
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}
