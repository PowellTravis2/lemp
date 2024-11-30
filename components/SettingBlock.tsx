import React, { useState } from "react";
import { useSession } from "next-auth/react";
import settings from '@/styles/settings.module.css'

export default function SettingBlock({ setting }) {
  const [editedSystem, setEditedSystem] = useState({ ...setting });
  const { data: session } = useSession();
  // const [valueField, setValueField] = useState(initialValue);
  const [newOU, setNewOU] = useState('');

  // Handle adding a new OU
  const handleAddOU = () => {
    if (newOU.trim()) {
      const updatedValue = editedSystem.valueField
        ? `${editedSystem.valueField};${newOU.trim()}`
        : newOU.trim();
      setEditedSystem(updatedValue);
      const syntheticEvent = {
        target: {
          name: "valueField", // Matches the state key for the toggle
          value: updatedValue,
        },
      };
      handleChange(syntheticEvent);
      setNewOU(''); // Clear the input field
    }
  };

  // Handle removing an OU
  const handleRemoveOU = (ouToRemove) => {
    const updatedValue = editedSystem.valueField
      .split(';')
      .filter((ou) => ou !== ouToRemove)
      .join(';');

    setEditedSystem(updatedValue);
    const syntheticEvent = {
      target: {
        name: "valueField", // Matches the state key for the toggle
        value: updatedValue,
      },
    };
    handleChange(syntheticEvent);
  };

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
        setting.valueField ? (
          <>
            <p className={settings.GroupingTitle}>Monitored OU's</p>
            <ul>
              {editedSystem.valueField.split(';').map((ou, index) => (
                <li key={index} className={settings.ouLineItem}>
                  {ou}{' '}
                  <button onClick={() => handleRemoveOU(ou)} className={settings.removeOU}>Remove</button>
                </li>
              ))}
            </ul>

            <div>
              <input
                className={settings.OUInput}
                type="text"
                value={newOU}
                onChange={(e) => setNewOU(e.target.value)}
                placeholder="Enter new OU"
              />
              <button onClick={handleAddOU} className={settings.AddOUButton}>Add OU</button>
            </div>
          </>
        ) : (
          <></>
        )
      ) : setting.settingName === "ad_user" ? (
        <>
          <p className={settings.GroupingTitle}>AD Auto User Path</p>
          <div>
            <div className={settings.adUserInput}>
            <input
              // className={settings.adUserInput}
              type="text"
              name="valueField"
              value={editedSystem.valueField}
              onChange={handleChange}
              placeholder="Ex. CN=User,CN=Users,DC=powellnetworks,DC=net"
            />
            </div>
          </div>
        </>
      ) : setting.settingName === "ad_user_password" ? (
        <>
          <p className={settings.GroupingTitle}>AD Auto User Password</p>
          <div>
            {/* <label className={settings.boldLabel}>CN User Password</label> */}
            <div className={settings.adUserInput}>
            <input
              className={settings.adUserInput}
              type="password"
              name="valueField"
              value={editedSystem.valueField}
              onChange={handleChange}
            />
            </div>
          </div>
        </>
      ) : setting.settingName === "ou_discovery_interval" ? (
        <>
          <p className={settings.GroupingTitle}>OU Auto Discovery</p>
          <div>
            {/* <label className={settings.boldLabel}>CN User Password</label> */}
            <div className={settings.adUserInput}>
            <input
              className={settings.adUserInput}
              type="text"
              name="valueField"
              value={editedSystem.valueField}
              onChange={handleChange}
            />
            </div>
          </div>
        </>
      ) : setting.settingName === "gp_auto_schedule_deploy" ? (
        <>
          <p className={settings.GroupingTitle}>Group Policy Auto Detect</p>
          <div>
            {/* <label className={settings.boldLabel}>CN User Password</label> */}
            <div className={settings.adUserInput}>
            <input
              className={settings.adUserInput}
              type="text"
              name="valueField"
              value={editedSystem.valueField}
              onChange={handleChange}
            />
            </div>
          </div>
        </>
      ) : setting.settingName === "reachable_job" ? (
        <>
        <p className={settings.GroupingTitle}>Reachable Schedule</p>
          <div>
            {/* <label className={settings.boldLabel}>CN User Password</label> */}
            <div className={settings.adUserInput}>
            <input
              className={settings.adUserInput}
              type="text"
              name="valueField"
              value={editedSystem.valueField}
              onChange={handleChange}
            />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}