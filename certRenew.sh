#!/bin/bash

sudo iptables -D PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443
sudo iptables -D PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080


sudo certbot renew

sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080

sudo cp /etc/letsencrypt/live/www.mapper.bike/privkey.pem .
sudo cp /etc/letsencrypt/live/www.mapper.bike/fullchain.pem .

pm2 restart map