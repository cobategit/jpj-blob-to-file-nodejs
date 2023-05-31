import { AppError, LoggersApp } from '@jpj-common/module'
import { Client } from 'basic-ftp'

export class UploadFileToFtp {

    public static async execute(localFile: string, remoteFile: string, directoryRemote: string) {
        const clientFtp = new Client()
        clientFtp.ftp.verbose = true
        try {
            await clientFtp.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USERNAME,
                password: process.env.FTP_PASSWORD
            })

            await clientFtp.ensureDir(directoryRemote)
            await clientFtp.uploadFrom(localFile, remoteFile)
            clientFtp.close()
            // LoggersApp.info('Success send file ftp created', `${localFile}`)
            return true
        } catch (error) {
            LoggersApp.warn('Failed send file ftp', error)
            return false
        }
    }
}