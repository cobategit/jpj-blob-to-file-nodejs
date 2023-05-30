import cronNode from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'

export const taskBlobToFile = cronNode.schedule(
    `0,5,10,15,20,25,30,35,40,45,50,55 * * * *`,
    () => {
        if (shelljs.exec(`node ${path.join(__dirname, './../../services/crontab/send-file-to-ftp.js')}`).code !== 0) {
            console.log(`terjadi kesalahan cron job convert blob to file and send to ftp storage`)
        }
        console.log(`schedule convert blob to file and send to ftp storage running...`)
    },
    { scheduled: true, timezone: 'Asia/Jakarta' }
)

taskBlobToFile.start()