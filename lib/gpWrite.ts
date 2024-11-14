import mysql from "mysql2/promise";
import { isatty } from "tty";

const connectionConfig = {
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Database,
};

export async function gpWrite({system, key, value}: {system: String, key: String}) {
    const connection = await mysql.createConnection(connectionConfig);
    try {
        const query = `UPDATE GroupPolicy SET \`${key}\` = ? WHERE name = ?`;
        const [result] = await connection.execute(query, [value, system]);
        connection.end()
        return result
    } catch (err) {
        console.log(err);
        connection.end()
    }
}