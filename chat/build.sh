#/bin/bash
npm install --only=dev # installs dev dependencies
npm install            # installs prod dependencies
npm run build          # builds the Vue.js app
cd ..
npm install --only=dev
npm install
node server.js