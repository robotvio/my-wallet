This is a [Next.js]  project that manager user crypto wallets  



Open [http://mywallet.sabertest.online/login](http://mywallet.sabertest.online/login) with your browser to see login page

Also register page is available

[http://mywallet.sabertest.online/register](http://mywallet.sabertest.online/regidter)
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

**Please use google chrome**


## Self-evaluation

Test was good, just some part was not clear that is also acceptable because also this is a challenge

Bonus tasks was good and I tried to do all of them

unfortunately I did not have enough time as I was so busy these days, but I can say code can be more clean with better error handling

But in general was good test


## Database

For database I used aws dynamo db ,there are 3 tables

**Users** save the user data, username, password(hash) and role
**Wallets** store the user's wallet
**transactions** store all the transactions


##API: List the endpoints
/login   POST use for login
/register POST use for register
/transactions GET use for getting Transactions
/verify POST use for authenticate user
/wallet GET, POST, DELETE use for get wallets, add new wallet and delete wallet
/fake/btc  /fake/eth  use for simulation fetching transactions, this endpoints generate random data


##LOGIC

All backend and front end developed by using Next js

By using jwt user make registration and also can login
in wallet page user can add wallet ,that wallet will store in aws dynamo db, also list of wallets getting from api
also by delete method user can delete a wallet

when new wallet add to database by using BullMq backend create a queue to fetch the transactions, and as soon as get the result ,transaction will store in database
for showing the transaction one api provide the transactions list

according user role in transactions list page user see the download button that will download the transactions

BullMq has automatic retry, in a case request to fetch data from remote data will retry again 

all apis protected by jwt and in each request token will validate

there is ratelimiter in one of the api, that we can limit the rates

##Tests

Unfortunately I did have time to write test yet, test is important part but not challenging part, I will do it as soon as possible




