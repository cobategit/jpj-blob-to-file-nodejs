import mysql2 from 'mysql2'

export async function mysqlConn() {
    let pool = mysql2.createPool({
        connectionLimit: 10000,
        waitForConnections: true,
        user: process.env.USER_MySql,
        host: process.env.HOST_MySql,
        database: process.env.DB_NAME_MySql,
        password: process.env.PASSWORD_MySql,
        port: Number(process.env.PORT_MySql),
        connectTimeout: 10000,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })

    return pool.promise()
}
