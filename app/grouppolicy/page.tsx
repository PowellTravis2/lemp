'use client'
import Image from "next/image";
import Navbar from "../../components/Navbar"
import { SessionProvider } from "next-auth/react";
import global from "@/styles/global.module.css"
import GPLine from "@/components/GPLine";
import { useState, useEffect } from 'react';

export default function Systems() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSystemId, setExpandedSystemId] = useState(null);

  const toggleExpand = (id) => {
      setExpandedSystemId((prevId) => (prevId === id ? null : id));
  };
  let blockView = true;
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch('/api/data/grouppolicy');
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
      <Navbar navTarget="grouppolicy" />
      <div className={`${global.usefulArea}`}>
        {
          data && data.map((item, index) => (
            <GPLine
                    key={item.name}
                    gp={item}
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
