import React, { useState } from "react";
import { useSession } from "next-auth/react";
import settings from '@/styles/settings.module.css'

export default function SettingBlock({ setting }) {
  const [editedSystem, setEditedSystem] = useState({ ...setting });
  const { data: session } = useSession();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedSystem((prevState) => ({
          ...prevState,
          [name]: value
      }));
      const response = fetch('/api/data/settings', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'id': setting.id,
              'valName': name,
              'valVal': value
          }
      });
  };

  const handleToggle = () => {
      // Calculate new toggle state
      const newValue = editedSystem.adminOnly === 0 ? 1 : 0;
      console.log(newValue)
      // Create synthetic event
      const syntheticEvent = {
          target: {
              name: "adminOnly", // Matches the state key for the toggle
              value: newValue,
          },
      };

      // Reuse handleChange
      handleChange(syntheticEvent);
  };

  return (
    <div className={settings.SettingBlock}>
      {setting.settingName === 'searchableOUs' ? (
        // {setting.valueField.split(';').map((ou, index) => {
          
        // })}
      ): (
        
      )}
    {/* {setting.settingName === "searchableOUs" ? (
        <p>Searchable OU's</p>
        {setting.valueField.split(';').map((ou, index) => {
            <div>
              {ou}
            </div>
          })
        }
    ) : setting.settingName === "ad_user" ? (
        <div>
        </div>
      ) : (
        <>
        </>
      )
    } */}
   </div>
  );
}