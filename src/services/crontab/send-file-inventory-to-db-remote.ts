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
    const arrayInsert: any[] = []

    const res = await TransactionTimbanganLocal.findFileNotYetSendToRemote(1, 0)
    bar.start(res.length, 0, {
        speed: '125'
    });
    let cnt = 1, start: any = new Date(), hrstart = process.hrtime()

    if (res.length > 0) {
        await PromisePool.withConcurrency(10).for(res).process(async (data: any, index: any, pool: any) => {
            const dataInsert: any[] = []
            const existsSlip = await TransactionImgRemote.findOne(data['slip'])

            if (existsSlip.length == 0) {
                dataInsert.push(data['slip'])
                dataInsert.push(data['pic_truck_file_nas'])
                dataInsert.push(data['pic_file_nas'])
                arrayInsert.push(dataInsert)
            }

            let tmpDate: any = new Date()
            let end: any = tmpDate - start,
                hrend = process.hrtime(hrstart)

            console.info('Execution time: %dms', end)
            console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

            bar.update(cnt);
            cnt++
        })

        if (arrayInsert.length > 0) {
            await TransactionImgRemote.insertFileTransactionInventoryFromLocal(arrayInsert)
        }
    }

    bar.stop();
})()