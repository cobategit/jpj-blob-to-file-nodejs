### Services

this is a services cronjobs for convert blob to file, save to local storage and send file to server NAS

### Prepare installation, and setup environment

- install Nodejs >= 16.0 LTS
- npm install -g nodemon typscript ts-node
- check configuration setups on file .env
- run script on folder project : npm install
- create folder public->img->transaction->do & public->img->transaction->truck
- alter table transaction_timbangan_sp: pic_file text, pic_truck_file text, sync_file_ftp tinyint(1) default 0
