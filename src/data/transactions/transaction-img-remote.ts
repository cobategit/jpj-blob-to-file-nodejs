import { AppError, LoggersApp } from "@jpj-common/module";
import { DataManipulationLanguageRemote, DataQueryLanguageRemote } from "../mysql";
import { TransactionTimbanganLocal } from "./transaction-timbangan-local";

export class TransactionImgRemote {
    private static dql: DataQueryLanguageRemote = new DataQueryLanguageRemote()
    private static dml: DataManipulationLanguageRemote = new DataManipulationLanguageRemote()
    public static async insertFileTransactionInventoryFromLocal(data: any) {
        try {
            await this.dml.execute(
                `insert into ${process.env.TABLE_TRANSACTION_IMG} (slip, doc_url, ticket_url)
                VALUES ?`,
                [data]
            )

            let dataUpdateTransactionLocal: any[] = []
            await Promise.all(
                data.map((val: any) => {
                    dataUpdateTransactionLocal.push(val[0])
                })
            )
            await TransactionTimbanganLocal.updateStatusSendFileDb(dataUpdateTransactionLocal)

            return true
        } catch (error) {
            LoggersApp.warn(`Failed insert status send file db remote`, error)
            throw error
        }
    }

    public static async findOne(slip: any) {
        try {
            const [rows, fields] = await this.dql.execute(
                `select * from ${process.env.TABLE_TRANSACTION_IMG} where slip = ? limit 1`,
                [slip]
            )

            return rows
        } catch (error) {
            LoggersApp.warn(`Failed find one transaction remote`, error)
            throw error
        }
    }
}