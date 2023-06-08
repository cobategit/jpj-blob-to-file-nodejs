import cronNode from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'

export const taskBlobToFile = cronNode.schedule(
    `0,3,6,9,12,15,18,21,24,27,33,36,39,42,45,48,51,54,57 * * * *`,
    () => {
        console.log(`schedule convert blob to file and send to ftp storage running...`)

        let child = shelljs.exec(`node ${path.join(__dirname, './../../services/crontab/send-file-to-ftp-inventory-local.js')}`, {
            async: true
        });

        setTimeout(() => {
            return shelljs.exit(1)
        }, 80000)

    },
    { scheduled: true, timezone: 'Asia/Jakarta' }
)

export const tasksendFileToDbRemote = cronNode.schedule(
    `30 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * *`,
    () => {
        console.log(`schedule insert file to db remote transaction img remote running...`)

        let child = shelljs.exec(`node ${path.join(__dirname, './../../services/crontab/send-file-inventory-to-db-remote.js')}`, {
            async: true
        });

        setTimeout(() => {
            return shelljs.exit(1)
        }, 80000)

    },
    { scheduled: true, timezone: 'Asia/Jakarta' }
)

taskBlobToFile.start()
tasksendFileToDbRemote.start()