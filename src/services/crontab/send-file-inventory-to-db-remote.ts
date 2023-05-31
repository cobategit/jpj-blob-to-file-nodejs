import { LoggersApp } from "@jpj-common/module"
import { TransactionImgRemote, TransactionTimbanganLocal } from "../../data"
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

    const res = await TransactionTimbanganLocal.findFileNotYetSendToRemote()
    bar.start(res.length, 0, {
        speed: '125'
    });
    let cnt = 1, start: any = new Date(), hrstart = process.hrtime()

    if (res.length > 0) {
        await PromisePool.withConcurrency(100).for(res).process(async (data: any, index: any, pool: any) => {
            let dataInsert = {}
            dataInsert = {
                slip: data['slip'],
                ticket_url: data['pic_truck_file_nas'],
                doc_url: data['pic_file_nas']
            }
            const insert = await TransactionImgRemote.insertFileTransactionInventoryFromLocal(dataInsert)

            if (insert[0].insertId) {
                let dataUpdateLocal = {}
                dataUpdateLocal = {
                    sync_file_db: 1,
                    slip: data['slip']
                }
                await TransactionTimbanganLocal.updateStatusSendFileDb(dataUpdateLocal)
            }

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