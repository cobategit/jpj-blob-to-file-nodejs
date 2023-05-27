import { LoggersApp } from "@jpj-common/module"
import { TransactionTimbanganSp } from "../../data"
import dotenv from 'dotenv'
import { BlobToFile } from "../../handlers"
import { UploadFileToFtp } from "../server"
import path from 'path'
import cliProgress from 'cli-progress'
import PromisePool from "@supercharge/promise-pool"

(async () => {
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    dotenv.config()
    LoggersApp.configureLogger()

    const res = await TransactionTimbanganSp.findAll()
    bar.start(res.length, 0, {
        speed: '125'
    });
    let cnt = 1;

    await PromisePool.withConcurrency(100).for(res).process(async (data: any, index: any, pool: any) => {
        const convertFileDO = await BlobToFile.execute(data[index]['slip'], data[index]['pic'], 'img', 'transaction/do')
        const convertFileTruck = await BlobToFile.execute(data[index]['slip'], data[index]['pic_truck'], 'img', 'transaction/truck')

        if (convertFileDO && convertFileTruck) {
            const uploadFileFtpDo = await UploadFileToFtp.execute(`${path.join(process.cwd(), `public/img/transaction/do/${data[index]['slip']}.png`)}`, `${data[index]['slip']}.png`, `storage/img/pic/test/do`)
            const uploadFileFtpTruck = await UploadFileToFtp.execute(`${path.join(process.cwd(), `public/img/transaction/truck/${data[index]['slip']}.png`)}`, `${data[index]['slip']}.png`, `storage/img/pic/test/truck`)

            if (uploadFileFtpDo && uploadFileFtpTruck) {
                const dataUpdate = {
                    sync_file_ftp: 1,
                    pic: res[0]['pic'],
                    pic_truck: res[0]['pic_truck'],
                    pic_file: process.env.FTP_URL + `/storage/img/pic/test/do/` + `${data[index]['slip']}.png`,
                    pic_truck_file: process.env.FTP_URL + `/storage/img/pic/test/truck/` + `${data[index]['slip']}.png`,
                }
                const updateFileFtp = await TransactionTimbanganSp.updateStatusSendFileFtp(dataUpdate)
                LoggersApp.info('Update sync file ftp success', updateFileFtp[0].changedRows)
            }
        }

        bar.update(cnt);
        cnt++
    })

    bar.stop();
})()