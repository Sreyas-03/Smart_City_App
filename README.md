# Smart City Living Lab
A configurable web app to help users view useful sensor data on the IIIT campus.

## Setup
### Requirements
To run this code, you will require `Node.js`, `nvm` (if your `Node.js` version is <14), `npm`, `yarn`, and `MongoDB`.

To start the server, create a `.env` file in the `backend` directory with the following content:

```
PORT=8000
MONGO_URL=mongodb://127.0.0.1:27017/SmartCityLivingLab
```

Then start a local MongoDB
instance. [This](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04#step-3-managing-the-mongodb-service)
might help.

Then run the following commands:

```shell
$ cd backend
$ yarn
$ yarn dev
```

To start the client:

```shell
$ cd frontend
$ yarn
$ yarn dev
```
Upon running this code, you will be redirected to a login page. If you do not already have an account, create an accoung using the 'sign in' section and login. You will arrive on the widgets homepage, from which you can navigate to the 'map' tab to see a map view of the data, and the 'others' tab to log out.