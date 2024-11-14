'use client'
import Image from "next/image";
import React, { useState } from "react";
import systemBlock from '../styles/systemBlock.module.css';
import Link from 'next/link'


export default function SystemBlock({ system }) {
    return (
        <div key={system.name} className={systemBlock.container}>
            <div className={systemBlock.systemLogo}>

            </div>
            <div className={systemBlock.systemName}>
                <p>{system.name}</p>
            </div>
            <div className={systemBlock.systemStatus}>
                <p>{system.ipAddress}</p>
            </div>
            <div className={systemBlock.systemIP}>

            </div>
        </div>
    )
}