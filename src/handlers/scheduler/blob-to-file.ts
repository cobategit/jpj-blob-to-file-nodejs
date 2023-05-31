import cronNode from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'

export const taskBlobToFile = cronNode.schedule(
    `0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57 * * * *`,
    () => {
        if (shelljs.exec(`node ${path.join(__dirname, './../../services/crontab/send-file-to-ftp-inventory-local.js')}`).code !== 0) {
            console.log(`terjadi kesalahan cron job convert blob to file and send to ftp storage`)
        }
        console.log(`schedule convert blob to file and send to ftp storage running...`)
    },
    { scheduled: true, timezone: 'Asia/Jakarta' }
)

export const tasksendFileToDbRemote = cronNode.schedule(
    `5,8,11,14,17,20,23,26,29,32,35,38,41,44,47,50,53,56 * * * *`,
    () => {
        if (shelljs.exec(`node ${path.join(__dirname, './../../services/crontab/send-file-inventory-to-db-remote.js')}`).code !== 0) {
            console.log(`terjadi kesalahan cron job convert blob to file and send to ftp storage`)
        }
        console.log(`schedule convert blob to file and send to ftp storage running...`)
    },
    { scheduled: true, timezone: 'Asia/Jakarta' }
)

taskBlobToFile.start()
tasksendFileToDbRemote.start()