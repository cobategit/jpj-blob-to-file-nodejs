import { AppError, LoggersApp } from "@jpj-common/module";
import { mysqlConnLocal, mysqlConnRemote } from "../../configs";

export class DataQueryLanguage {

    public async execute(query: string, options: any[]): Promise<any> {
        let connMysql = await mysqlConnLocal()

        try {
            const res = await connMysql.query(`${query}`, options)
            await connMysql.end()

            return res
        } catch (error) {
            LoggersApp.error('Failed mysql query', error)
            throw new AppError(500, false, 'Failed mysql query', '500')
        }
    }
}

export class DataQueryLanguageRemote {

    public async execute(query: string, options: any[]): Promise<any> {
        let connMysql = await mysqlConnRemote()

        try {
            const res = await connMysql.query(`${query}`, options)
            await connMysql.end()

            return res
        } catch (error) {
            LoggersApp.error('Failed mysql query', error)
            throw new AppError(500, false, 'Failed mysql query', '500')
        }
    }
}