import { AppError, LoggersApp } from "@jpj-common/module";
import { DataManipulationLanguageRemote, DataQueryLanguageRemote } from "../mysql";

export class TransactionImgRemote {
    private static dql: DataQueryLanguageRemote = new DataQueryLanguageRemote()
    private static dml: DataManipulationLanguageRemote = new DataManipulationLanguageRemote()

    public static async findAll() {
        try {
            const [rows, fields] = await this.dql.execute(
                `select slip, pic, pic_truck from ${process.env.TABLE_TRANSACTION_IMG}`,
                []
            )

            return rows
        } catch (error) {
            LoggersApp.error('Failed find all transaction timbangan sp', error)
            return false
        }
    }

    public static async insertFileTransactionInventoryFromLocal(data: any) {
        try {
            const res = await this.dml.execute(
                `insert into ${process.env.TABLE_TRANSACTION_IMG} (slip, doc_url, ticket_url)
                VALUES(?,?,?)`,
                [data?.slip, data?.doc_url, data?.ticket_url]
            )

            return res
        } catch (error) {
            LoggersApp.warn(`Failed update status send file ftp`, error)
            return error
        }
    }
}