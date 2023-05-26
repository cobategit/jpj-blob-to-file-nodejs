import { AppError, LoggersApp } from "@jpj-common/module";
import { DataManipulationLanguage, DataQueryLanguage } from "../mysql";

export class TransactionTimbanganSp {
    private static dql: DataQueryLanguage = new DataQueryLanguage()
    private static dml: DataManipulationLanguage = new DataManipulationLanguage()

    public static async findAll(statusFileFtp: number = 0) {
        try {
            const [rows, fields] = await this.dql.execute(
                `select slip, pic, pic_truck from ${process.env.TABLE_TRANSACTIONTIMBANGANSP} where sync_file_ftp = ? order by transaction_id asc`,
                [0]
            )

            return rows
        } catch (error) {
            LoggersApp.error('Failed find all transaction timbangan sp', error)
            throw new AppError(500, false, `Failed find all transaction timbangan sp - ${error}`, '500')
        }
    }

    public static async updateStatusSendFileFtp(data: any, statusFileFtp: number = 0) {
        try {
            const res = await this.dml.execute(
                `update ${process.env.TABLE_TRANSACTIONTIMBANGANSP} set sync_file_ftp = ?, pic = ?, pic_truck = ?, pic_file = ?, pic_file_truck = ? where sync_file_ftp = ?`,
                [data.sync_file_ftp, data.pic, data.pic_truck, data.pic_file, data.pic_file_truck, statusFileFtp]
            )

            return res
        } catch (error) {
            LoggersApp.warn(`Failed update status send file ftp`, error)
            throw new AppError(500, false, `Failed update status send file ftp - ${error}`, '500')
        }
    }
}