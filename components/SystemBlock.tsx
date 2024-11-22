'use client'
import Image from "next/image";
import React, { useState } from "react";
import systemBlock from '../styles/systemBlock.module.css';
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function SystemBlock({ system, isExpanded, toggleExpand }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSystem, setEditedSystem] = useState({ ...system });
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
                {/* <p>{system.dn}</p> */}
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
                            <div className="field">
                                <label className={systemBlock.boldLabel}>OS:</label>
                                <input
                                    type="text"
                                    name="os"
                                    value={editedSystem.os}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className={systemBlock.boldLabel}>IP Address:</label>
                                <p>{editedSystem.ipAddress}</p>
                            </div>
                            {/* <div className="field">
                                <label className={systemBlock.boldLabel}>DN:</label>
                                <p>{editedSystem.dn}</p>
                            </div> */}
                            <div className="field">
                                <label className={systemBlock.boldLabel}>Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={editedSystem.location}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className={systemBlock.boldLabel}>Rack:</label>
                                <input
                                    type="text"
                                    name="rack"
                                    value={editedSystem.rack}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className={systemBlock.boldLabel}>Rack Location:</label>
                                <input
                                    type="text"
                                    name="rackUnits"
                                    value={editedSystem.rackUnits}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className={systemBlock.boldLabel}>Wazuh System ID:</label>
                                <input
                                    type="text"
                                    name="wazuhID"
                                    value={editedSystem.wazuhID}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className={systemBlock.doneButton} onClick={handleSave}>Done</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>OS:</strong> {editedSystem.os}</p>
                            <p><strong>IP Address:</strong> {editedSystem.ipAddress}</p>
                            {/* <p><strong>DN:</strong> {editedSystem.dn}</p> */}
                            <p><strong>Location:</strong> {editedSystem.location}</p>
                            <p><strong>Rack:</strong> {editedSystem.rack}</p>
                            <p><strong>Rack Location:</strong> {editedSystem.rackUnits}</p>
                            <p><strong>Wazuh System ID:</strong> {editedSystem.wazuhID}</p>
                            {session?.roles.includes("Admin") ? (
                                <button className={systemBlock.boldButton} onClick={handleEdit}>Edit</button>
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
