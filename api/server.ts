#!/usr/bin/env

// import dotenv from 'dotenv';
const dotenv = require("dotenv");

dotenv.config();

import server from './src';

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.listen(port, () => {
  console.log(`Hi!! Port = ${port}`);
});