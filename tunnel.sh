#!/bin/bash
while :; do 
   date
   ./node_modules/.bin/lt --port $SERVER_PORT --subdomain $SUBDOMAIN
   sleep 1
done