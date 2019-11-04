require('dotenv').config()

const ENV_VARS = {}

for (let key of Object.keys(process.env)) {
  if (key.slice(0, 10) === 'REACT_APP_')
    ENV_VARS[`process.env.${key}`] = JSON.stringify(process.env[key])
}

module.exports = ENV_VARS
