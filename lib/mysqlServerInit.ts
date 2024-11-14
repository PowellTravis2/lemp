// Will run any tasks that require to be run / tested before the system boots
import mysql from "mysql2/promise";

const connectionConfig = {
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Database,
};

export async function mysqlServerInit() {
    const connection = await mysql.createConnection(connectionConfig);
    try {
        const [results, fields] = await connection.query(
            `CREATE TABLE IF NOT EXISTS Server (
                id INT AUTO_INCREMENT PRIMARY KEY,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                name VARCHAR(255) UNIQUE NOT NULL,
                location VARCHAR(255),
                rack VARCHAR(255),
                rackUnits VARCHAR(255),
                ipAddress VARCHAR(255) NOT NULL,
                dnsName VARCHAR(255) NOT NULL,
                adminOnly BOOLEAN DEFAULT FALSE,
                wazuhID INT,
                tier ENUM('TIER1', 'TIER2', 'TIER3') DEFAULT 'TIER2'
            );`
        );

        console.log("Server Table initialized / Verified;"); // results contains rows returned by server
    } catch (err) {
        console.log(err);
        connection.end()
    }

    try {
        const [results, fields] = await connection.query(
            `CREATE TABLE IF NOT EXISTS GroupPolicy (
                id INT AUTO_INCREMENT PRIMARY KEY,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                name VARCHAR(255) UNIQUE NOT NULL,
                smbPath VARCHAR(255) NOT NULL,
                linuxEquivalent VARCHAR(255) NOT NULL
            );`
        );

        console.log("Group Policy Table initialized / Verified;"); // results contains rows returned by server
    } catch (err) {
        console.log(err);
        connection.end()
    }

    try {
        const [results, fields] = await connection.query(
            `CREATE TABLE IF NOT EXISTS ServerSettings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                settingName VARCHAR(255) UNIQUE NOT NULL,
                valueField VARCHAR(255)
            );`
        );
        connection.end()
        console.log("Server Table initialized / Verified;"); // results contains rows returned by server
    } catch (err) {
        console.log(err);
        connection.end()
    }
}
