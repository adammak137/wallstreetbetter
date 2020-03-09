# Wall Street Better

## Introduction

This is a web app created to track stock portfolios per user.
A User can register with a unique email, create portfolios, buy/sell stock, and view transaction history.
This was created over the week of March 2, 2020 - March 9, 2020

## Tech Stack

* React: Keeps UI and state in sync in a performant way through the diffing algorithm and the VDOM.
* Redux: Manages global state which will allow the app to scale if needed. Prevents the drill down Problem
* Found in React props managemet.
* Express: Web framework that allows us to create API end points, kept routes as RESTFULL as possible. Using passport and session in order to keep sessions stored within our database and sets the app up for OAuth.
* Sequelize: Used to create datebase models and offers protection from SQL injections and allows developers to
* write code to query fast if the query is simple. Offers validation hooks as well.
* PostgreSQL: Free relational database with a lot of support. Requires PG drivers and PG HSTORE (Serialize/ deSerialize)
* SQL: Complex queries with many associations are easier to do in SQL in my opinion.
* IEX AI: Used to get data for our stock information.
* MaterializeCSS: Grid system and styling allows for quick prototyping
* BoilerMaker from fullstack is used which includes rudimentary testing templates thats kept in and also a login/register page. There is modifactions done to these files in order for it to work for the user story provided.

## Design Process

The SQL Model was created first shown in Client/Models/WallStreetBetter

I wanted this app to be able to scale and usable for an individual so I wanted users to be able to have multiple portfolios and allow a particular user to have one account for everything they need. All portfolio balances are stored integers rather than floats because of javascripts poor handling of division with fractions and trailing numbers.

## User Story Data Flow

1.  As a user, I want to create a new account with my name, email, and password so that I can buy and
    trade stocks.
    • Default the user’s cash account balance to $5000.00 USD.
    • A user can only register once with any given email.

* Users will input information into an uncontrolled form and register for an account.
  Unique email is tested through sequelizes isEmail validation.
  Password is hashed through Sequelize hooks and class methods.
  Salt adds additional values to the end of the passport that will change the hash value. Each account is also created with a default portfolio with $5000.

2.  As a user, I want to authenticate via email and password so that I can access my account.

* Authication is used by finding the users email in our db and validating the password. Then we use req.login within passport to store the the users session by serializing the identity and placing the information in the req, res header as a session cookie.

3.  As a user, I want to buy shares of stock at its current price by specifying its ticker symbol and the
    number of shares so that I can invest.
    • A user can only buy whole number quantities of shares.
    • A user can only buy shares if they have enough cash in their account for a given purchase.
    • A user can only buy shares if the ticker symbol is valid.

* A User can buy shares of stocks and there is additional functionality to sell stocks as well
* User will input there information into a state controlled form which will determine if the user can buy or sell the stock. The stock quantity and the portfolio balance is checked on the back end as this is the most secure way to purchase/sell stock. This is created as a transaction and the state will refresh which will allow for a user to see their transaction in real time.

4.  As a user, I want to view a list of all transactions I’ve made to date (trades) so that I can perform an
    audit.

* Currently only allows users to see all transactions for every portfolio, but can be expanded for a view per portfolio.
* This user story was done through a simple check of the users session id and querying all of the transactions the user and using a few joins to get the relevant information.

5.  As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so
    that I can review performance.
    • Current values should be based on the latest price and quantity owned for a given stock.
    • Each stock owned should only appear once.

* This is done much the same with as the user story above but with a more comple SQL query.

6.  As a user, I’d like to see the font color of stock symbols and current prices in my portfolio change
    dynamically to indicate performance.
    • Display red when the current price is less than the day’s open price.
    • Display grey when the current price is equal to the day’s open price.
    • Display green when the current price is greater than the day’s open price.

* Currently using IEX Close data and IEX Open data as the API does not show Open data due to nasdaq restrictions. "For Nasdaq-listed symbols ONLY, if you do NOT have UTP authorization, you will encounter the following:
  "Quote”: open, openTime, close, closeTime, delayedPrice, delayedPriceTime,extendedPrice, extendedPriceTime, extendedChange, extendedChangePercent, week52High, week52Low, high, low will return null." -IEX website
  https://intercom.help/iexcloud/en/articles/3210401-how-do-i-get-nasdaq-listed-stock-data-utp-data-on-iex-cloud

* This is done through a simple ternary statement to check if close data is > open data and have the color change based on that.

# Future

## Updates

1.  Create more robust error prompts and informations.
2.  Robust route protection, currently most of the protection is done through checks for req.session.passport
    * This can be accomplished through a custom made middleware
3.  More tests, due to the time constraints I forgone tests as I was the only one developing it, but adding tests would drastically cut down future development costs as technical debt will be mitigated.
4.  Change how routes link to each other for cleaner browser history.

## Future

1.  Allow users to delete portfolios if there are no stocks.
2.  Allow users to transfer their personal balance (Included in the model) to a particular portfolio.
3.  Create admin API End points
4.  Create D3. js charts
    * Would require a lot of messages to the api so it may not be viable in a hobby app thats actually usable
5.  Allow users to see transactions per portfolio.
6.  Create a bidding system
    * May be complicated as it most likely will involve a constant ping to IEX and maybe a message queue?
