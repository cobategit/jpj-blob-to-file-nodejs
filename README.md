### Services

this is a services cronjobs for convert blob to file, save to local storage and send file to server NAS

### Prepare installation, and setup environment on stockpile

- install Nodejs >= 16.0 LTS
- install Gitbash
- install notepad++
- install PM2 => https://github.com/jessety/pm2-installer on directory C:\, kemudian lakukan perintagh pada dokumentasinya, referensi: ( PM2 startup https://blog.cloudboost.io/nodejs-pm2-startup-on-windows-db0906328d75 )
- npm install -g nodemon typscript ts-node pm2
- clone project di github => https://github.com/cobategit/jpj-blob-to-file-nodejs, kemudian lakukan => npm install
- check configuration setups on file .env
- create folder public->img->transaction->inventory->do & public->img->transaction->inventory->truck
- alter table transaction_timbangan ( pc timbangan ): pic_file_local text, pic_file_nas text, pic_truck_file_local text, pic_truck_file_nas text, sync_file_ftp tinyint(1) default 0, sync_file_db tinyint(1) default 0
- buka terminal windows run administrator
- build project => npm run build
- arahkan ke project, jalankan perintah => pm2 start dist/app.js --name="url sevices api", setelah itu => pm2 save
- jalankan perintah => pm2 start dist\handlers\scheduler\blob-to-file.js, setelah itu => pm2 save
- buat file .bat pada directory C:\ => %windir%\system32\CMD.exe /k "pm2 resurrect", kemudian buat task scheduler untuk menjalakan file .bat ketika pc startup### Services

this is a services cronjobs for convert blob to file, save to local storage and send file to server NAS

### Prepare installation, and setup environment on stockpile

- install Nodejs >= 16.0 LTS
- install Gitbash
- install notepad++
- install PM2 => https://github.com/jessety/pm2-installer on directory C:\, kemudian lakukan perintagh pada dokumentasinya, referensi: ( PM2 startup https://blog.cloudboost.io/nodejs-pm2-startup-on-windows-db0906328d75 )
- npm install -g nodemon typscript ts-node pm2
- clone project di github => https://github.com/cobategit/jpj-blob-to-file-nodejs, kemudian lakukan => npm install
- check configuration setups on file .env
- create folder public->img->transaction->inventory->do & public->img->transaction->inventory->truck
- alter table transaction_timbangan ( pc timbangan ): pic_file_local text, pic_file_nas text, pic_truck_file_local text, pic_truck_file_nas text, sync_file_ftp tinyint(1) default 0, sync_file_db tinyint(1) default 0
- buka terminal windows run administrator
- build project => npm run build
- arahkan ke project, jalankan perintah => pm2 start dist/app.js --name="url sevices api", setelah itu => pm2 save
- jalankan perintah => pm2 start dist\handlers\scheduler\blob-to-file.js, setelah itu => pm2 save
- buat file .bat pada directory C:\ => %windir%\system32\CMD.exe /k "pm2 resurrect", kemudian buat task scheduler untuk menjalakan file .bat ketika pc startup
