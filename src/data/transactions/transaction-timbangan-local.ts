import { AppError, LoggersApp } from "@jpj-common/module";
import { DataManipulationLanguage, DataQueryLanguage } from "../mysql";

export class TransactionTimbanganLocal {
    private static dql: DataQueryLanguage = new DataQueryLanguage()
    private static dml: DataManipulationLanguage = new DataManipulationLanguage()

    public static async findAll(statusFileFtp: number = 0) {
        try {
            const [rows, fields] = await this.dql.execute(
                `select slip, pic, pic_truck from ${process.env.TABLE_TRANSACTIONTIMBANGAN} where sync_file_ftp = ? order by transaction_id asc limit 20`,
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
                `select slip, pic_file_nas, pic_truck_file_nas from ${process.env.TABLE_TRANSACTIONTIMBANGAN} where sync_file_ftp = ? and sync_file_db = ? order by transaction_id asc limit 20`,
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
                `update ${process.env.TABLE_TRANSACTIONTIMBANGAN} set sync_file_ftp = ?, pic = ?, pic_truck = ?, pic_file_nas = ?, pic_truck_file_nas = ?, pic_file_local = ?, pic_truck_file_local = ? where slip = ? and sync_file_ftp = ?`,
                [data.sync_file_ftp, data.pic, data.pic_truck, data.pic_file_nas, data.pic_truck_file_nas, data.pic_file_local, data.pic_truck_file_local, data.slip, statusFileFtp]
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
                `update ${process.env.TABLE_TRANSACTIONTIMBANGAN} set sync_file_db = ? where slip = ? and sync_file_db = ?`,
                [data?.sync_file_db, data?.slip, statusFileDb]
            )

            return res
        } catch (error) {
            LoggersApp.warn(`Failed update status send file ftp`, error)
            return error
        }
    }
}