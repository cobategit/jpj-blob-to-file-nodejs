import { AppError, LoggersApp } from "@jpj-common/module";
import { DataManipulationLanguage, DataQueryLanguage } from "../mysql";

export class TransactionTimbanganLocal {
    private static dql: DataQueryLanguage = new DataQueryLanguage()
    private static dml: DataManipulationLanguage = new DataManipulationLanguage()

    public static async findAll(statusFileFtp: number = 0) {
        try {
            const [rows, fields] = await this.dql.execute(
                `select slip, pic, pic_truck from ${process.env.TABLE_TRANSACTIONTIMBANGAN} where sync_file_ftp = ? and pic_file_local is not null and pic_truck_file_local is not null order by transaction_id asc limit 50`,
                [statusFileFtp]
            )

            return rows
        } catch (error) {
            LoggersApp.error('Failed find all transaction timbangan sp', error)
            return false
        }
    }

    public static async findFileNotYetSendToRemote(statusFileFtp: number = 1, statusFileDb: number = 0) {
        try {
            const [rows, fields] = await this.dql.execute(
                `select slip, pic_file_nas, pic_truck_file_nas from ${process.env.TABLE_TRANSACTIONTIMBANGAN} where sync_file_ftp = ? and sync_file_db = ? order by transaction_id asc limit 100`,
                [statusFileFtp, statusFileDb]
            )

            return rows
        } catch (error) {
            LoggersApp.error('Failed find all transaction timbangan sp', error)
            return false
        }
    }

    public static async updateStatusSendFileFtp(data: any, statusFileFtp: number = 0) {
        try {
            const res = await this.dml.execute(
                `update ${process.env.TABLE_TRANSACTIONTIMBANGAN} set sync_file_ftp = ?, pic_file_nas = ?, pic_truck_file_nas = ? where slip = ? and sync_file_ftp = ?`,
                [data.sync_file_ftp, data.pic_file_nas, data.pic_truck_file_nas, data.slip, statusFileFtp]
            )

            return res
        } catch (error) {
            LoggersApp.warn(`Failed update status send file ftp`, error)
            return error
        }
    }

    public static async updateStatusSendFileDb(data: any, statusFileDb: number = 0) {
        try {
            const res = await this.dml.execute(
                `update ${process.env.TABLE_TRANSACTIONTIMBANGAN} set sync_file_db = ? where slip IN(?) and sync_file_db = ?`,
                [1, data, statusFileDb]
            )

            return res
        } catch (error) {
            LoggersApp.warn(`Failed update status send file db`, error)
            return error
        }
    }
}