import cronNode from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'

export const taskBlobToFile = cronNode.schedule(
    `30 * * * *`,
    () => {
        if (shelljs.exec(`node ${path.join(process.cwd(), 'dist/services/crontab/send-file-to-ftp.js')}`).code !== 0) {
            console.log(`terjadi kesalahan cron job weekly`)
        }
        console.log(`schedule convert blob to file and send to ftp storage running...`)
    },
    { scheduled: true, timezone: 'Asia/Jakarta' }
)

taskBlobToFile.start()