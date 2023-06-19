import { LoggersApp } from "@jpj-common/module"
import { TransactionTimbanganLocal } from "../../data"
import dotenv from 'dotenv'
import { BlobToFile } from "../../handlers"
import { UploadFileToFtp } from "../server"
import path from 'path'
import cliProgress from 'cli-progress'
import PromisePool from "@supercharge/promise-pool"

(async () => {
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    dotenv.config({ path: path.join(__dirname, './../../../.env') })
    LoggersApp.configureLogger()
    LoggersApp.info('Execute file convert blob and send to nas storage', {})

    const res = await TransactionTimbanganLocal.findAll()
    bar.start(res.length, 0, {
        speed: '125'
    });
    let cnt = 1, start: any = new Date(), hrstart = process.hrtime()

    if (res.length > 0) {
        await PromisePool.withConcurrency(100).for(res).process(async (data: any, index: any, pool: any) => {
            let dataUpdate = {}
            // const convertFileDO = await BlobToFile.execute(data['slip'], data['pic'], 'img', 'transaction/inventory/do')
            // const convertFileTruck = await BlobToFile.execute(data['slip'], data['pic_truck'], 'img', 'transaction/inventory/truck')

            // if (convertFileDO && convertFileTruck) {
            // const uploadFileFtpDo = await UploadFileToFtp.execute(`${path.join(process.cwd(), `public/img/transaction/inventory/do/${data['slip']}.png`)}`, `${data['slip']}.png`, `storage/img/pic/nodejs/inventory/${process.env.STOCKPILE}/do`)
            // const uploadFileFtpTruck = await UploadFileToFtp.execute(`${path.join(process.cwd(), `public/img/transaction/inventory/truck/${data['slip']}.png`)}`, `${data['slip']}.png`, `storage/img/pic/nodejs/inventory/${process.env.STOCKPILE}/truck`)
            const uploadFileFtpDo = await UploadFileToFtp.execute(`C:/gambar_timbangan/do/${data['slip']}.png`, `${data['slip']}.png`, `storage/img/pic/nodejs/inventory/${process.env.STOCKPILE}/do`)
            const uploadFileFtpTruck = await UploadFileToFtp.execute(`C:/gambar_timbangan/truck/${data['slip']}.png`, `${data['slip']}.png`, `storage/img/pic/nodejs/inventory/${process.env.STOCKPILE}/truck`)

            if (uploadFileFtpDo && uploadFileFtpTruck) {
                dataUpdate = {
                    slip: data['slip'],
                    sync_file_ftp: 1,
                    // pic: null,
                    // pic_truck: null,
                    // pic_file_local: process.env.URL_FILE + `/img/transaction/inventory/do/` + `${data['slip']}.png`,
                    // pic_truck_file_local: process.env.URL_FILE + `/img/transaction/inventory/truck/` + `${data['slip']}.png`,
                    pic_file_nas: process.env.FTP_URL + `/storage/img/pic/nodejs/inventory/${process.env.STOCKPILE}/do/` + `${data['slip']}.png`,
                    pic_truck_file_nas: process.env.FTP_URL + `/storage/img/pic/nodejs/inventory/${process.env.STOCKPILE}/truck/` + `${data['slip']}.png`,
                }
                const updateFileFtp = await TransactionTimbanganLocal.updateStatusSendFileFtp(dataUpdate)
                // LoggersApp.info('Update sync file ftp success', updateFileFtp[0].changedRows)
            }
            // }

            let tmpDate: any = new Date()
            let end: any = tmpDate - start,
                hrend = process.hrtime(hrstart)

            console.info('Execution time: %dms', end)
            console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

            bar.update(cnt);
            cnt++
        })
    }

    bar.stop();
})()