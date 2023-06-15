import { LoggersApp } from "@jpj-common/module"
import { TransactionImgRemote, TransactionTimbanganLocal } from "../../data"
import dotenv from 'dotenv'
import path from 'path'
import cliProgress from 'cli-progress'
import PromisePool from "@supercharge/promise-pool"

(async () => {
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    dotenv.config({ path: path.join(__dirname, './../../../.env') })
    LoggersApp.configureLogger()
    LoggersApp.info('Execute send data from local to db remote and update status local', {})

    const res = await TransactionTimbanganLocal.findFileNotYetSendToRemote(1, 0)
    bar.start(res.length, 0, {
        speed: '125'
    });
    let cnt = 1, start: any = new Date(), hrstart = process.hrtime()

    if (res.length > 0) {
        await PromisePool.withConcurrency(100).for(res).process(async (data: any, index: any, pool: any) => {
            const existsSlip = await TransactionImgRemote.findOne(data['slip'])

            if (existsSlip.length == 0) {
                const dataInsert = new Map<string, any>()
                dataInsert.set('data', {
                    slip: data['slip'],
                    ticket_url: data['pic_truck_file_nas'],
                    doc_url: data['pic_file_nas']
                })
                await TransactionImgRemote.insertFileTransactionInventoryFromLocal(dataInsert.get('data'))
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