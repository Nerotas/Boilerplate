// Load environment variables before running jest tests.
// You can load this script using the "setupFiles" section in the "jest" block in the package.json file like so:
// "setupFiles": ["<rootDir>/jestSetup.js"]
require('dotenv').config({ path: './.env' });
