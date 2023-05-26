import { LoggersApp } from "@jpj-common/module"
import { TransactionTimbanganSp } from "../../data"
import dotenv from 'dotenv'
import { BlobToFile } from "../../handlers"
import { UploadFileToFtp } from "../server"
import path from 'path'
import cliProgress from 'cli-progress'

(async () => {
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    dotenv.config()
    LoggersApp.configureLogger()
    const res = await TransactionTimbanganSp.findAll()
    const convertFile = await BlobToFile.execute(res[1]['slip'], res[1]['pic'], 'img', 'transaction')
    const uploadFileFtp = await UploadFileToFtp.execute(`${path.join(process.cwd(), `public/img/transaction/${res[1]['slip']}.png`)}`, `${res[1]['slip']}.png`, `storage/img/pic/do`)
    console.log(`convert file`, convertFile)
    console.log(`upload file ftp`, uploadFileFtp)

    bar.start(res.length, 0, {
        speed: '125'
    });

    var cnt = 1;

    res.forEach((row: any) => {
        bar.update(cnt);
        cnt++;
    });

    bar.stop();
    return true
})()