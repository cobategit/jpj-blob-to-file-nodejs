import { AppError, LoggersApp } from "@jpj-common/module";
import { mysqlConn } from "../../configs";

export class DataManipulationLanguage {

    public async execute(query: string, options: any[]): Promise<any> {
        let connMysql = await mysqlConn()

        try {
            connMysql.beginTransaction()
            const res = await connMysql.query(`${query}`, options)
            await connMysql.commit()
            await connMysql.end()

            return res
        } catch (error) {
            await connMysql.rollback()
            LoggersApp.error('Failed mysql query', error)
            throw new AppError(500, false, 'Failed mysql query', '500')
        }
    }
}