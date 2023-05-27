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


    // const convertFile = await BlobToFile.execute(res[0]['slip'], res[0]['pic'], 'img', 'transaction')
    // const uploadFileFtp = await UploadFileToFtp.execute(`${path.join(process.cwd(), `public/img/transaction/${res[0]['slip']}.png`)}`, `${res[0]['slip']}.png`, `storage/img/pic/test/do`)
    // const dataUpdate = {
    //     sync_file_ftp: 1,
    //     pic: res[0]['pic'],
    //     pic_truck: res[0]['pic_truck'],
    //     pic_file: process.env.FTP_URL + `/storage/img/pic/test/do/` + `${res[0]['slip']}.png`,
    //     pic_truck_file: process.env.FTP_URL + `/storage/img/pic/test/do/` + `${res[0]['slip']}.png`,
    // }
    // const resUpdateStatusSendFileFtp = await TransactionTimbanganSp.updateStatusSendFileFtp(dataUpdate)

    bar.start(res.length, 0, {
        speed: '125'
    });

    var cnt = 1;

    await PromisePool.withConcurrency(100).for(res).process(async (data, index, pool) => {
        bar.update(cnt);
        cnt++
    })

    bar.stop();
})()