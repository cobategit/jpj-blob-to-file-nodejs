import { AppError, LoggersApp } from "@jpj-common/module";
import { mysqlConn } from "../../configs";

export class DataQueryLanguage {

    public async execute(query: string, options: any[]): Promise<any> {
        let connMysql = await mysqlConn()

        try {
            const res = await connMysql.query(`${query}`, options)
            connMysql.end()

            return res
        } catch (error) {
            LoggersApp.error('Failed mysql query', error)
            throw new AppError(500, false, 'Failed mysql query', '500')
        }
    }
}