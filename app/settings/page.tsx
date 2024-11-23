'use client'
import Image from "next/image";
import Navbar from "../../components/Navbar"
import global from "@/styles/global.module.css"
import settings from "@/styles/settings.module.css"
import SettingBlock from "@/components/SettingBlock"
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from 'react';

export default function Systems() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch('/api/data/settings');
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
      <Navbar navTarget="settings"/>
      <div className={`${global.usefulArea} ${settings.SettingsArea}`}>
      {
          data && data.map((item, index) => (
            <SettingBlock
                    key={item.name}
                    setting={item}
                />
          )
          )
        }
      </div>
    </SessionProvider>
  );
}
