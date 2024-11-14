'use client'
import Image from "next/image";
import React, { useState } from "react";
import navStyles from '../styles/nav.module.css';
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Navbar({ navTarget }: { navTarget: string }) {
    const { data: session } = useSession();
    if (session) {
        if (session?.roles.includes("Admin")) {
            return (
                <div className={navStyles.barGroup}>
                    <ul>
                        <div className={navStyles.navGroup}>
                            {navTarget === "home" ? (
                                <li className={`${navStyles.navItem} ${navStyles.navItemActive}`}><Link href="/"><h3>Home</h3></Link></li>
                            ) : (
                                <li className={navStyles.navItem}><Link href="/"><h3>Home</h3></Link></li>
                            )}
                            {navTarget === "systems" ? (
                                <li className={`${navStyles.navItem} ${navStyles.navItemActive}`}><Link href="/systems"><h3>Systems</h3></Link></li>
                            ) : (
                                <li className={navStyles.navItem}><Link href="/systems"><h3>Systems</h3></Link></li>
                            )}
                            {navTarget === "grouppolicy" ? (
                                <li className={`${navStyles.navItem} ${navStyles.navItemActive}`}><Link href="/grouppolicy"><h3>Policies</h3></Link></li>
                            ) : (
                                <li className={navStyles.navItem}><Link href="/grouppolicy"><h3>Policies</h3></Link></li>
                            )}
                            {navTarget === "settings" ? (
                                <li className={`${navStyles.navItem} ${navStyles.navItemActive} ${navStyles.Admin}`}><Link href="/settings"><h3>Settings</h3></Link></li>
                            ) : (
                                <li className={`${navStyles.navItem} ${navStyles.Admin}`}><Link href="/settings"><h3>Settings</h3></Link></li>
                            )}
                            <li className={`${navStyles.navItem}`}><button onClick={() => signOut()}><Image src="/logout.svg" width={20} height={20} alt="Logout Button"></Image></button></li>
                        </div>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className={navStyles.barGroup}>
                    <ul>
                        <div className={navStyles.navGroup}>
                            {navTarget === "home" ? (
                                <li className={`${navStyles.navItem} ${navStyles.navItemActive}`}><Link href="/"><h3>Home</h3></Link></li>
                            ) : (
                                <li className={navStyles.navItem}><Link href="/"><h3>Home</h3></Link></li>
                            )}
                            {navTarget === "systems" ? (
                                <li className={`${navStyles.navItem} ${navStyles.navItemActive}`}><Link href="/systems"><h3>Systems</h3></Link></li>
                            ) : (
                                <li className={navStyles.navItem}><Link href="/systems"><h3>Systems</h3></Link></li>
                            )}
                            {navTarget === "grouppolicy" ? (
                                <li className={`${navStyles.navItem} ${navStyles.navItemActive}`}><Link href="/grouppolicy"><h3>Group Policies</h3></Link></li>
                            ) : (
                                <li className={navStyles.navItem}><Link href="/grouppolicy"><h3>Group Policies</h3></Link></li>
                            )}
                            <li className={`${navStyles.navItem}`}><button onClick={() => signOut()}><Image src="/logout.svg" width={20} height={20} alt="Logout Button"></Image></button></li>
                        </div>
                    </ul>
                </div>
            );
        }
    } else {
        return (
            <>
                {/* Not signed in <br /> */}
                <button className={navStyles.Login} onClick={() => signIn() }>Sign in</button>
            </>
        )
    }
}