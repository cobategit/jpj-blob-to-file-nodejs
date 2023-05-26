import path from 'path'
import fs from 'fs'
import { AppError, LoggersApp } from '@jpj-common/module'

export class BlobToFile {

    public static async execute(id?: string, data?: string, directory?: string, folder?: string) {
        let res: boolean = false
        const pathFile = path.join(process.cwd(), `public/${directory}`)
        const base64Img = Buffer.from(data!, 'binary').toString('base64')
        fs.writeFile(pathFile + `/${folder}/${id}.png`, base64Img, { encoding: 'base64' }, (err) => {
            if (err) {
                LoggersApp.warn('Failed write file blob', err)
                res = false
            }
            LoggersApp.info('Success file created', `${id}.jpg`)
            res = true
            return res
        })
    }
}