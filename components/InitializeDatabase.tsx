"use client"
import { useEffect } from 'react';

const InitializeDatabase = () => {
    var initialized = false;
  useEffect(() => {
    if (typeof window !== 'undefined' && initialized !== true) {  // This ensures client-side execution
      const initDb = async () => {
        try {
          const response = await fetch('/api/init');
          initialized = true
          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.error('Error initializing database:', error);
        }
      };

      initDb();
    }
  }, []);  // Empty dependency array to only run on mount

  if (initialized) return (
    <p>Loading...</p>
  );
  return (
    <></>
  )
};

export default InitializeDatabase;