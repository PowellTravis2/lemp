import mysql from "mysql2/promise";
import { isatty } from "tty";

const connectionConfig = {
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Database,
};

export async function serverQuery({isAdmin}: {isAdmin: Boolean}) {
    const connection = await mysql.createConnection(connectionConfig);
    try {
        let filVal = isAdmin ? 1 : 0;
        const [results, fields] = await connection.query(
            `SELECT * from Server WHERE adminOnly=0 OR adminOnly=${filVal}`
        );
        return results
    } catch (err) {
        console.log(err);
    }
}