git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/THAM-SANQA/Node-JS.git
git push -u origin main

curl -d "email=jon@jonwexler.com&password=12345"http://localhost:3000/api/login

curl -d "email=a@g.com&password=12345"http://localhost:3000/api/login
a@g.com

npm install express ejs express-ejs-layouts http-status-codes --save