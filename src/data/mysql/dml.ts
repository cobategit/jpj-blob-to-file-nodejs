import { AppError, LoggersApp } from "@jpj-common/module";
import { mysqlConnLocal, mysqlConnRemote } from "../../configs";

export class DataManipulationLanguage {

    public async execute(query: string, options: any[]): Promise<any> {
        const connMysql = await mysqlConnLocal()

        try {
            await connMysql.query('START TRANSACTION')
            const res = await connMysql.query(`${query}`, options)
            await connMysql.query('COMMIT')
            await connMysql.end()
            return res
        } catch (error) {
            await connMysql.query('ROLLBACK')
            LoggersApp.error('Failed mysql query', error)
            throw new AppError(500, false, `Failed mysql query - ${error}`, '500')
        }
    }
}

export class DataManipulationLanguageRemote {

    public async execute(query: string, options: any[]): Promise<any> {
        const connMysql = await mysqlConnRemote()

        try {
            await connMysql.query('START TRANSACTION')
            const res = await connMysql.query(`${query}`, options)
            await connMysql.query('COMMIT')
            await connMysql.end()
            return res
        } catch (error) {
            await connMysql.query('ROLLBACK')
            LoggersApp.error('Failed mysql query', error)
            throw new AppError(500, false, `Failed mysql remote query - ${error}`, '500')
        }
    }
}