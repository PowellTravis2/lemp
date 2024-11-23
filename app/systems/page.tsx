'use client'
import Navbar from "../../components/Navbar"
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from 'react';
import SystemBlock from "@/components/SystemBlock";
import global from "@/styles/global.module.css"
import systems from "@/styles/systems.module.css"

export default function Systems() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSystemId, setExpandedSystemId] = useState(null);

  const toggleExpand = (id) => {
      setExpandedSystemId((prevId) => (prevId === id ? null : id));
  };
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch('/api/data/server');
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) return (
      <p>Loading...</p>
  );

  return (
    <SessionProvider>
      <Navbar navTarget="systems" />
      
      <div className={`${global.usefulArea} ${systems.gridArea}`}>
        {
          data && data.map((item, index) => (
            <SystemBlock
                    key={item.name}
                    system={item}
                    isExpanded={expandedSystemId === item.name}
                    toggleExpand={() => toggleExpand(item.name)}
                />
          )
          )
        }
      </div>
    </SessionProvider>
  );
}
