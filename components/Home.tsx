'use client'
import React from "react";
import homeStyles from '../styles/home.module.css';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';

export default function Home() {
    const { data: session } = useSession();
    const [serverData, setServerData] = useState(null);
    const [serversTotal, setServersTotal] = useState(0);
    const [serversOnline, setServersOnline] = useState(0);
    const [physicalSystems, setPhysicalSystems] = useState(0);
    const [vmSystems, setVMSystems] = useState(0);
    const [numPolicies, setnumPolicies] = useState(0);
    const [enabledPolicies, setEnabledPolicies] = useState(0);
    const [policyData, setPolicyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchServerData() {
            setIsLoading(true);
            const res = await fetch('/api/data/server');
            const data = await res.json();
            setServerData(data);
            setServersTotal(Object.keys(data).length)
            let onlineSystems = serversOnline;
            setServersOnline(data.filter(item => item.reachable === 1).length)
            setPhysicalSystems(data.filter(item => item.location === "physical").length)
            setVMSystems(data.filter(item => item.location === "vm").length)
        }

        async function fetchGPData() {
            const res = await fetch('/api/data/grouppolicy');
            const data = await res.json();
            setPolicyData(data);
            setIsLoading(false);
            setnumPolicies(Object.keys(data).length)
            setEnabledPolicies(data.filter(item => item.scheduleEnabled === 1).length)
        }

        fetchServerData();
        fetchGPData();
    }, []);

    if (isLoading) return (
        <p>Loading...</p>
    );

    return (
        <>
            {
                session ? (
                    <div>
                        {serverData && policyData ? (
                            // <div className={homeStyles.container}>
                            <div>
                                <div className={homeStyles.dataBlocks}>
                                    <div className={homeStyles.dataCard}>
                                        <p className={homeStyles.dataCardTitle}>Servers Online</p>
                                        <p className={homeStyles.dataCardStatistic}>{serversOnline}/{serversTotal}</p>
                                    </div>
                                    <div className={homeStyles.dataCard}>
                                        <p className={homeStyles.dataCardTitle}>System Types</p>
                                        <p className={homeStyles.dataCardStatistic}>Physical: {physicalSystems}</p>
                                        <p className={homeStyles.dataCardStatistic}>VM: {vmSystems}</p>
                                    </div>
                                    <div className={homeStyles.dataCard}>
                                        <p className={homeStyles.dataCardTitle}>Enabled Policies</p>
                                        <p className={homeStyles.dataCardStatistic}>{enabledPolicies}/{numPolicies}</p>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <>
                            </>
                        )
                        }
                    </div >
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}
