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
# install pyvenv
apt install python3.8-venv
# install git
sudo apt-get install git
# install pm2
npm install -g pm2


# clear history
history -c
echo "" | sudo tee /var/log/auth.log
rm -rf ~/.bash_history
kill -9 $$