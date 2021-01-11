'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')
const debug = require('debug')('platziverse:db:setup')
const minimist = require('minimist')
const db = require('./')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()

async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy the database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log(`${chalk.yellow('no')}` + `${chalk.red('thi')}` + `${chalk.green('ng')}` + `${chalk.blueBright(' happened ')}` + `${chalk.magentaBright(' :)')}`)
    }
  }
  
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    loggin: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
