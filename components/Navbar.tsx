'use client'

import React, { useState } from "react";
import navStyles from '../styles/nav.module.css';
import Link from 'next/link'

export default function Navbar({ navTarget }: {navTarget: string}) {
    return (
        <div className={navStyles.barGroup}>
            <ul> 
                {/* <li>
                    <img src="../images/lemp.png" alt="" />
                </li> */}
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
                    {navTarget === "settings" ? (
                        <li className={`${navStyles.navItem} ${navStyles.navItemActive}`}><Link href="/settings"><h3>Settings</h3></Link></li>
                    ) : (
                        <li className={navStyles.navItem}><Link href="/settings"><h3>Settings</h3></Link></li>
                    )}
                </div>
            </ul>
        </div>
    );
}