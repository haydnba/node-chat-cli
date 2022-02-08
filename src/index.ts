#!/usr/bin/env npx ts-node

import yargs from 'yargs/yargs';

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command('open [options]', 'Open a chat client', {
    u: { type: 'string', alias: 'username', nargs: 1, demandOption: true },
    s: { type: 'string', alias: 'secret', nargs: 1, demandOption: true },
    p: { type: 'number', alias: 'port', nargs: 1, default: 8000 },
  })
  .command('serve [options]', 'Invoke the chat server', {
    p: { type: 'number', alias: 'port', nargs: 1, default: 8000 }
  })
  .demandCommand(1, 1, 'commands: serve, open')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .parseSync();

const cmd = String(argv._[0]);
const path = { open: './client', serve: './server' } as const;
const args = [ argv.username, argv.secret, argv.port ].filter(Boolean);

// console.log(cmd, path, args);

import(path[cmd]).then(module => module.app(...args));
