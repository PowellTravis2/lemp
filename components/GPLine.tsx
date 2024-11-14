'use client'
import Image from "next/image";
import React, { useState } from "react";
import systemBlock from '../styles/systemBlock.module.css';
import Link from 'next/link'
import { useSession } from "next-auth/react"


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
        console.log(name)
        console.log(value)
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
        <div>
            <div>
                <p>{gp.name}</p>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    );
}