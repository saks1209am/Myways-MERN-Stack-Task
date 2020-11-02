![Homepage](https://user-images.githubusercontent.com/30996074/97889144-01397a80-1d52-11eb-8a03-2718a4a90d8a.jpg)


## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```


![signup_web](https://user-images.githubusercontent.com/30996074/97889279-2e862880-1d52-11eb-87d3-6cf344eac075.jpg)


## Server-side usage(PORT: 5000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> ./server/src/.env
```

![reset_password](https://user-images.githubusercontent.com/30996074/97890236-50cc7600-1d53-11eb-86a1-ec80548d83ce.jpg)



### Start

```terminal
$ npm i       // npm install pacakges
$ node app // run it locally
