// Will run any tasks that require to be run / tested before the system boots
// import './envConfig.ts'
// export default defineConfig({
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
// })
const { Sequelize } = require('sequelize');
export async function register() {
    const sequelize = new Sequelize(process.env.DB_Database, process.env.DB_User, process.env.DB_Password, {
        host: process.env.DB_Host,
        dialect: 'mysql'
    })
    // console.log(process.env.DB_Host)
}