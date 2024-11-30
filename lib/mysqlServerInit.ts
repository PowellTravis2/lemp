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
                tier ENUM('TIER1', 'TIER2', 'TIER3') DEFAULT 'TIER2',
                os VARCHAR(255),
                dn VARCHAR(255),
                reachable BOOLEAN DEFAULT FALSE
            );`
        );

        console.log("Server Table initialized / Verified;");
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
                name VARCHAR(255) NOT NULL,
                dn VARCHAR(255) NOT NULL,
                smbPath VARCHAR(255) NOT NULL,
                linuxEquivalent VARCHAR(255),
                schedule VARCHAR(255),
                scheduleEnabled BOOLEAN DEFAULT FALSE
            );`
        );

        console.log("Group Policy Table initialized / Verified;");
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
        const [resultSOU, fieldsSOU] = await connection.query(
            `INSERT IGNORE INTO ServerSettings (settingName, valueField) VALUES ('searchableOUs', '');`
        );
        const [resultADU, fieldsADU] = await connection.query(
            `INSERT IGNORE INTO ServerSettings (settingName, valueField) VALUES ('ad_user', '');`
        );
        const [resultADUP, fieldsADUP] = await connection.query(
            `INSERT IGNORE INTO ServerSettings (settingName, valueField) VALUES ('ad_user_password', '');`
        );
        const [resultOUD, fieldsOUD] = await connection.query(
            `INSERT IGNORE INTO ServerSettings (settingName, valueField) VALUES ('ou_discovery_interval', '*/30 * * * *');`
        );
        const [resultGPASD, fieldsGPASD] = await connection.query(
            `INSERT IGNORE INTO ServerSettings (settingName, valueField) VALUES ('gp_auto_schedule_deploy', '*/45 * * * *');`
        );
        const [resultREACHABLE, fieldsREACHABLE] = await connection.query(
            `INSERT IGNORE INTO ServerSettings (settingName, valueField) VALUES ('reachable_job', '*/10 * * * *');`
        );
        connection.end()
        console.log("Server Settings Table initialized / Verified;"); 
    } catch (err) {
        console.log(err);
        connection.end()
    }
}
