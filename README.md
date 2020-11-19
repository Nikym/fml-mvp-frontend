# Client for Find My Lines
To run the client, ensure that you have node installed. This can be done by following the instructions here: https://github.com/nvm-sh/nvm

Create a `.env.production` file in the root of the `client` directory. Inside it, paste the following text:
```
URL=localhost
```

Once installed, run the `runMe.sh` sh file to install the relevant npm modules, build the gatsby client and serve it.
**NOTE:** Ensure you run it from the directory that it is located in, ie the `client` directory.

Once run, it should be accessible via the url `http://localhost:2015`.