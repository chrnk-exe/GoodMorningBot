pm2 delete index
rm -rf App
mkdir App
git clone https://github.com/chrnk-exe/TS_Bot_VK_service ./App
cd App
# install dependencies
# install Python deps
cd bot 
pip install -r requirements.txt
cd ..
# install App deps
cd server
npm install
# initial DB
npm run migrate
#-startpm2
npm run startpm2
cd ..
# start bot
cd bot
source venv/bin/activate
python3 main.py