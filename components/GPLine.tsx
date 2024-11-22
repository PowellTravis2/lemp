'use client'
import Image from "next/image";
import React, { useState } from "react";
import groupPolicy from '../styles/groupPolicy.module.css';
import Link from 'next/link'
import { useSession } from "next-auth/react"
import CodeBlock from "./CodeBlock";


export default function GPLine({ gp, isExpanded, toggleExpand }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSystem, setEditedSystem] = useState({ ...gp });
    const { data: session } = useSession();
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
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
                'name': gp.id,
                'valName': name
            },
            body: JSON.stringify({ 'content': `${value}` })
        });
    };

    const handleToggle = () => {
        // Calculate new toggle state
        const newValue = editedSystem.scheduleEnabled === 0 ? 1 : 0;
        console.log(newValue)
        // Create synthetic event
        const syntheticEvent = {
            target: {
                name: "scheduleEnabled", // Matches the state key for the toggle
                value: newValue,
            },
        };

        // Reuse handleChange
        handleChange(syntheticEvent);
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
                        <div className={groupPolicy.policySettings}>
                            <div className={groupPolicy.policyDetails}>
                                <p>DN: {editedSystem.dn}</p>
                                <label>
                                    Linux Application:
                                    <textarea name="linuxEquivalent" value={editedSystem.linuxEquivalent}
                                        onChange={handleChange}></textarea>
                                </label>
                                <br></br>
                                {/* <button className={groupPolicy.doneButton} onClick={handleSave}>Done</button> */}
                            </div>
                            <div className={groupPolicy.policySchedule}>
                                <label>
                                    CRON Schedule:
                                    <input
                                        type="text"
                                        name="schedule"
                                        value={editedSystem.schedule}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br></br>
                                <p>Policy is {editedSystem.scheduleEnabled === 1 ? "Enabled" : "Disabled"}</p>
                                <div
                                    onClick={handleToggle}
                                    style={{
                                        display: "inline-block",
                                        width: "50px",
                                        height: "25px",
                                        borderRadius: "25px",
                                        backgroundColor: editedSystem.scheduleEnabled === 1 ? "green" : "gray",
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "23px",
                                            height: "23px",
                                            backgroundColor: "white",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            top: "1px",
                                            left: editedSystem.scheduleEnabled === 1 ? "25px" : "1px",
                                            transition: "left 0.2s",
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <button className={groupPolicy.doneButton} onClick={handleSave}>Done</button>
                        </div>
                    ) : (
                        <div>
                            <p>DN: {editedSystem.dn}</p>
                            <p>Linux Application:</p>
                            <CodeBlock code={editedSystem.linuxEquivalent} language="bash" />
                            {session?.roles.includes("Admin") ? (
                                <button className={groupPolicy.boldButton} onClick={handleEdit}>Edit</button>
                            ) : (
                                <p>Not Admin</p>
                            )}
                        </div>
                    )
                    }
                </div >
            )}
        </div>
    )
}