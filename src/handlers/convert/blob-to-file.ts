import path from 'path'
import fs from 'fs'
import { LoggersApp } from '@jpj-common/module'

export class BlobToFile {

    public static async execute(id?: string, data?: string, directory?: string, folder?: string) {
        try {
            const pathFile = path.join(process.cwd(), `public/${directory}`)
            const base64Img = Buffer.from(data!, 'binary').toString('base64')
            fs.writeFileSync(pathFile + `/${folder}/${id}.png`, base64Img, { encoding: 'base64' })
            LoggersApp.info('Success file blob created', `${id}.jpg`)
            return true
        } catch (_) {
            LoggersApp.warn('Failed file blob created', `${id}.jpg`)
            throw false
        }
    }
}