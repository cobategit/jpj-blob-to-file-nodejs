import mysql2 from 'mysql2/promise'

export async function mysqlConnLocal() {
    let pool = mysql2.createPool({
        connectionLimit: 10,
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

    return pool
}

export async function mysqlConnRemote() {
    let pool = mysql2.createPool({
        connectionLimit: 10,
        waitForConnections: true,
        user: process.env.USER_MySql_REMOTE,
        host: process.env.HOST_MySql_REMOTE,
        database: process.env.DB_NAME_MySql_REMOTE,
        password: process.env.PASSWORD_MySql_REMOTE,
        port: Number(process.env.PORT_MySql_REMOTE),
        connectTimeout: 10000,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })

    return pool
}
