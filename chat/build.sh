#/bin/bash
npm install            # installs prod dependencies
npm run build          # builds the Vue.js app
cd ..
npm install
node server.js