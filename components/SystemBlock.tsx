'use client'
import Image from "next/image";
import React, { useState } from "react";
import systemBlock from '../styles/systemBlock.module.css';
import Link from 'next/link'
import { useSession } from "next-auth/react"


export default function SystemBlock({ system, isExpanded, toggleExpand }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSystem, setEditedSystem] = useState({ ...system });
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
        console.log(name)
        console.log(value)
        setEditedSystem((prevState) => ({
            ...prevState,
            [name]: value
        }));
        const response = fetch('/api/data/server', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'name': system.name,
                'valName': name,
                'valVal': value
            }
          });
    };

    return (
        <div className={systemBlock.container}>
            <div className={systemBlock.systemLogo}>
                {system.os === "ubuntu" ? (
                    <Image src="/ubuntu-svgrepo-com.svg" width={50} height={50} alt="Ubuntu" />
                ) : system.os === "proxmox" ? (
                    <Image src="/proxmox-svgrepo-com.svg" width={50} height={50} alt="Proxmox" />
                ) : (
                    <Image src="/default-svgrepo-com.svg" width={50} height={50} alt="Default" />
                )}
            </div>
            <div className={systemBlock.systemName}>
                <p>{system.name}</p>
            </div>
            <div className={systemBlock.systemStatus}>
                {system.reachable === 1 ? (
                    <div className="systemReachable"></div>
                ) : system.reachable === 0 ? (
                    <div className="systemUnreachable"></div>
                ) : (
                    <div className="systemUnknown"></div>
                )}
            </div>
            <div className={systemBlock.systemIP}>
                <p>{system.ipAddress}</p>
                <p>{system.dn}</p>
            </div>
            <div className={systemBlock.systemDropDown}>
                <button onClick={toggleExpand}>
                    <Image src="/down-2-svgrepo-com.svg" width={20} height={20} alt="DropDown" />
                </button>
            </div>

            {isExpanded && (
                <div className="expandedDetails">
                    <h4>Additional Details</h4>
                    {isEditing ? (
                        <div>
                            <p>OS: {editedSystem.os}</p>
                            <p>IP Address: {editedSystem.ipAddress}</p>
                            <p>DN: {editedSystem.dn}</p>
                            <label>
                                Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={editedSystem.location}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Rack:
                                <input
                                    type="text"
                                    name="rack"
                                    value={editedSystem.rack}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Rack Location:
                                <input
                                    type="text"
                                    name="rackUnits"
                                    value={editedSystem.rackUnits}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Wazuh System ID:
                                <input
                                    type="text"
                                    name="wazuhID"
                                    value={editedSystem.wazuhID}
                                    onChange={handleChange}
                                />
                            </label>
                            <button onClick={handleSave}>Done</button>
                        </div>
                    ) : (
                        <div>
                            <p>OS: {editedSystem.os}</p>
                            <p>IP Address: {editedSystem.ipAddress}</p>
                            <p>DN: {editedSystem.dn}</p>
                            <p>Location: {editedSystem.location}</p>
                            <p>Rack: {editedSystem.rack}</p>
                            <p>Rack Location: {editedSystem.rackUnits}</p>
                            <p>Wazuh System ID: {editedSystem.wazuhID}</p>
                            {session?.roles.includes("Admin") ? (
                                <button onClick={handleEdit}>Edit</button>
                            ): (
                                <p>Not Admin</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}