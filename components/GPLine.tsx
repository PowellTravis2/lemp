'use client'
import Image from "next/image";
import React, { useState } from "react";
import groupPolicy from '../styles/groupPolicy.module.css';
import Link from 'next/link'
import { useSession } from "next-auth/react"
import CodeBlock from "./CodeBlock";
import { Span } from "next/dist/trace";


export default function GPLine({ gp, isExpanded, toggleExpand }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSystem, setEditedSystem] = useState({ ...gp });
    const { data: session } = useSession();
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Logic to save editedSystem values
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSystem((prevState) => ({
            ...prevState,
            [name]: value
        }));
        const response = fetch('/api/data/grouppolicy', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'name': gp.name,
                'valName': name,
                'valVal': value
            }
        });
    };

    return (
        <div className={groupPolicy.gpLineContainer}>
            <div className={groupPolicy.gpLineName}>
                <p>{gp.name}</p>
            </div>
            <div className={groupPolicy.gpLineSMB}>
                <p>{gp.smbPath}</p>
            </div> 
            <div className={groupPolicy.systemDropDown}>
                <button onClick={toggleExpand}>
                    <Image src="/down-2-svgrepo-com.svg" width={20} height={20} alt="DropDown" />
                </button>
            </div>

            {isExpanded && (
                <div className={groupPolicy.expandedDetails}>
                    {isEditing ? (
                        <div>
                            <p>DN: {gp.dn}</p>
                            <label>
                                Linux Application:
                                <input
                                    type="text"
                                    name="linuxEquivalent"
                                    value={gp.linuxEquivalent}
                                    onChange={handleChange}
                                />
                            </label>
                            
                            <button onClick={handleSave}>Done</button>
                        </div>
                    ) : (
                        <div>
                            <p>DN: {gp.dn}</p>
                            <p>Linux Application:</p>
                            <CodeBlock code={gp.linuxEquivalent} language="bash" />
                            {session?.roles.includes("Admin") ? (
                                <button onClick={handleEdit}>Edit</button>
                            ) : (
                                <p>Not Admin</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}