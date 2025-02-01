# Notes

Notes for intro into node forntendMasters class

# Node has a non-blocking I/O

it can run things concurrently using event loop. A regisry for
work that handles requests and calls a function that tells us
it's done.

# Node RELP (Read-Eval-Print_loop)

basicaly a console like in browser, you can acess it typing node

# Process and Environment

Node runs in operating system unlike javasript. So it contains process object.

1.  process

    contains argv, it contains the parameters when a node file is run
    argv[0] is the instance of Node
    argv[1] is the file
    argv[2-n] are the parameters

    so node index.js 1, 2, 3

    has arg[2] == 1;

2.  env

    environment variables from the system. So you can inject variables
    if you want to be safe.

# start program

```Javascript
run npm init --y
```

this will add a package.json file to project

# init cli

1.  add a bin to package.json, that is a object containing the cli name
    and the file that will be run

```Javascript
"bin": {
"note": "./index.js"
}
```

2.  run npm link that creates a symlink from the the operating system
    to our js code.

3.  add a hashbang that tells the file to entepreter the environment as javasript
    #!/usr/bin/env node

# modules basically isolates code like an IIFE

```Javascript
(() => {
console.log();
})()
```

it can be a file, package ex
to enable module behaviour of es6, you add "type" : "module" in package.json

1. in es6:

```Javascript
export const var = 2;

import { var } from './file.js'

2. in commonjs

const var = 2;

module.exports = {
var
}

const { var } = require('./file.js')
```

# using index.js

you can export multiple things from files using index.js acting as a module router

so if we had a project with a folder utils, that has multiple js files

- project
  - utils
    - index.js
    - utils.js
    - otherUtils.js
  - src
    - index.js

we can import everything in utils/index.js and export them from there in src/index.js

1.  utils/index.js

```Javascript
export { fun1, fun2 } from './utils.js'
    export { var } from './otherUtils.js'
```

2.  src/index.js

```Javascript
    import \* as utils from '../utils'
```

# import a file to just execute the file

```Javascript
import './file.js';
```

you can include the hashbang only in the entry file

# package.lock.json

locks the verions of all things we install with npms

# yarg

1. hidebin() -> skips the first two arguments
2. command() -> does a command like npm ...
   demandCommand(n) -> requires at least n arguments

   when creating a command you can also tell it the type of argument passed
   whith the first passed function:

```Javascript
   yargs(hideBin(process.argv))
   .command('new <note>', 'create a new note', (yargs) => {
   return yargs.positional('note', {
   type: 'string',
   description: 'The content of note to be created'
   })
   }, (argv) => {
   console.log(argv.note);

   })
   .demandCommand(1)
   .parse()
```

you can also give it optional params

```Javascript
   .option('tags', {
   alias: 't',
   type: 'string',
   describe: 'tags to add to the note'
   })
```

you could also make default args optional and have default values
you do that with [] and default in first function

```Javascript
   .command('web [port]', 'launch website to see notes', yargs => {
   return yargs
   .positional('port', {
   describe: 'port to bind on',
   default: 5000,
   type: 'number'
   })
   }, async (argv) => {

   })
```

# Promise instead of callbacks

you can chain functions with promises intead of calling callbacks on end

1. with callbakcs

```Javascript
const waitAndRun = (time, cb) => {

setTimeout(() => {
cb();
}, time)
}
```

so you would do

```Javascript
waitAndRun(1000, () => {
console.log(1000, "passed");
waitAndRun(1000, () => {

      })
    })
```

2. with promises

```Javascript
const waitAndRun = (time, cb) => {
return new Promise((reject, resolve) => {
try {
setTimeout(() => {
cb();
resolve();
}, time)
} catch (e) {
reject(e)
}
})
}
```

so you can chain them

```Javascript
waitAndRun(1000, () => { console.log("1s passed") }).catch((e) => { })
.then(() => {
return waitAndRun(1000, () => { console.log("1s passed") }).catch((e) => { })
})
.then(() => {
return waitAndRun(1000, () => { console.log("1s passed") }).catch((e) => { })
})
```

node has async by default, you can await directly

One of the most commonly used methods in the FS module is the `fs.readFile()` method, which reads the content of a file asynchronously and returns its content in a callback function. Another popular method is `fs.writeFile()`, which writes data to a file asynchronously.

Other frequently used methods include:

- `fs.mkdir()` to create a new directory
- `fs.readdir()` to read the contents of a directory
- `fs.stat()` to get information about a file
- `fs.unlink()` to delete a file
- `fs.rename()` to rename a file

1. fs.readfile()

you used to be able to use `__dirname` to get the file you are in form the code,
now you need to create it or create the path yourself

```Javascript
  const pjsonPath = new URL('./package.json', import.meta.url).pathname
```

`readfile()` is a non blocking method that needs a callback, but if you import fs from `'fs/promises'`,
it does not, so you can do

```Javascript
  JSON.parse(await fs.readFile(pjsonPath, 'utf-8'))
```

2. fs.writeFile()

you can write file with the same way

```Javascript
 fs.writeFile(pjsonPath, 'console.log('a')')
```

# Running Things in Parallel or Serial

1.  using `&` runs files in node parallel

`node test.js & test2.js`

2.  using `&&` run things when the privious thing is finished

`node index.js && test2.js`
