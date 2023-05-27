import { AppError, LoggersApp } from '@jpj-common/module'
import { Client } from 'basic-ftp'

export class UploadFileToFtp {
    private static clientFtp = new Client()

    public static async execute(localFile: string, remoteFile: string, directoryRemote: string) {
        this.clientFtp.ftp.verbose = true
        try {
            await this.clientFtp.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USERNAME,
                password: process.env.FTP_PASSWORD
            })

            await this.clientFtp.ensureDir(directoryRemote)
            await this.clientFtp.uploadFrom(localFile, remoteFile)
            return true
        } catch (error) {
            LoggersApp.warn('Failed send file ftp', error)
            return false
        }
    }
}