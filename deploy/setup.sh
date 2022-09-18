# install docker
sudo apt-get update -y
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo systemctl enable docker

# run docker-compose.yml
# cd /home/admin/app/
docker-compose up -d;

# install node
sudo apt install nodejs
# install npm
sudo apt install npm
# install pip
sudo apt-get -y install python3-pip

# install git
sudo apt-get install git
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

# clear history
history -c
echo "" | sudo tee /var/log/auth.log
rm -rf ~/.bash_history
kill -9 $$