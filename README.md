### Services

this is a services cronjobs for convert blob to file, save to local storage and send file to server NAS

### Prepare installation, and setup environment

- install Nodejs >= 16.0 LTS
- install PM2 => https://github.com/jessety/pm2-installer , PM2 startup https://blog.cloudboost.io/nodejs-pm2-startup-on-windows-db0906328d75
- npm install -g nodemon typscript ts-node
- check configuration setups on file .env
- run script on folder project : npm install
- create folder public->img->transaction->inventory->do & public->img->transaction->inventory->truck
- alter table transaction_timbangan: pic_file_local text, pic_file_nas text, pic_truck_file_local text, pic_truck_file_nas text, sync_file_ftp tinyint(1) default 0
