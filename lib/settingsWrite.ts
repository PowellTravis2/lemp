import mysql from "mysql2/promise";
import { isatty } from "tty";

const connectionConfig = {
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Database,
};

export async function settingsWrite({id, settingName, settingValue}: {settingName: String, settingValue: String, id: Number;}) {
    const connection = await mysql.createConnection(connectionConfig);
    try {
        const query = `UPDATE ServerSettings SET \`${settingName}\` = ? WHERE id = ?`;
        const [result] = await connection.execute(query, [settingValue, id]);
        connection.end()
        return result
    } catch (err) {
        console.log(err);
        connection.end()
    }
}