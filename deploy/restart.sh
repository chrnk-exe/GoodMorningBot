pm2 delete index
rm -rf App
# download app
mkdir -p App
git clone https://github.com/chrnk-exe/TS_Bot_VK_service ./App
# install pm2
npm install -g pm2
cd App
# install dependencies
# install Python deps
cd bot 
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
# install App deps
cd server
npm install
# initial DB
npm run migrate
# startpm2
npm run startpm2 
cd ..
# start bot
cd bot
python3 main.py
