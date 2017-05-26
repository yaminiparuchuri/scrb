export DABASE_HOST='stage.wonderwe.com';
export DATABASE_USER='root';
export DATABASE_PASSWORD='stage1$';
export DATABASE='scrb';
# server start
#cd /var/www/html/scrb
npm install
forever stop 0
forever start -l forever.log -o out.log -e err.log -a ./bin/www
