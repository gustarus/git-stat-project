## Git project stat
A tool for git projects statistics generation per every user.


### Installation as separate project

#### 1. Clone the repo
```bash
git clone git@github.com:gustarus/git-stat-project.git && cd git-stat-project
```

#### 1. Use needed node.js version
```bash
nvm use
```

#### 2. Install dependencies
```bash
yarn
```

Or via npm:
```bash
npm i
```


### Usage

#### How you can use this via console?
Clone and install this project and then type in console from this project dir:

```bash
yarn start -- --folder ~/projects/project --after 01.01.2017 --before 01.12.2017
```

Or via npm:
```bash
npm start -- --folder ~/projects/project --after 01.01.2017 --before 01.12.2017
```

#### How you can use this in your project?
This code u can find in [script.js](script.js).

```javascript
'use strict';

const {Git, TotalReport, CommitsReport} = require('git-stat-project');
const argv = require('yargs').argv;
const {folder, after, before} = argv;
const reports = [TotalReport, CommitsReport];

if (!folder) {
  throw new Error('You have to pass `--folder` (via `yarn start -- ---folder path/to/folder` where git project is.');
}

const git = new Git({folder});
git.stat(after, before).then(collection => {
  if (!Object.keys(collection).length) {
    throw new Error('There is no history for this project. May be the folder is incorrect?');
  }

  return reports.map(Report => {
    const report = new Report({collection});
    const records = report.generate();
    return report.render(records);
  });
}).then(blocks => {
  console.log('\n' + blocks.join('\n\n') + '\n');
}).catch(error => {
  console.error(error);
});


```

#### What does the result look like?
I've used [rship repo](https://github.com/rambler-digital-solutions/rship) for this example.

```bash
pkondratenko@mac578rds:~/projects/experimental/git-stat-project (*)
> yarn start -- --folder ~/projects/tmp/rship --after 01.01.2017 --before 01.12.2017                                                                                                                                                                                                     master [06d6163] deleted modified
yarn start v0.18.1
$ node ./script.js --folder /Users/pkondratenko/projects/tmp/rship --after 01.01.2017 --before 01.12.2017

Total rating
  User name                                Percents value                     Commits pushed  Lines affected
  m.chernobrov@rambler-co.ru               █████████████████████████████████              16             691
  abietis@gmail.com                        █████░░░░░░░░░░░░░░░░░░░░░░░░░░░░               3              63
  me@mrsum.ru                              ███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               2              20
  mrsum@mrsum.local                        █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               1               4
  a-ignatov-parc@users.noreply.github.com  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               1               0

Commits rating
  User name                                Percents value                     Commits pushed
  m.chernobrov@rambler-co.ru               █████████████████████████████████              16
  abietis@gmail.com                        ███████░░░░░░░░░░░░░░░░░░░░░░░░░░               3
  me@mrsum.ru                              █████░░░░░░░░░░░░░░░░░░░░░░░░░░░░               2
  a-ignatov-parc@users.noreply.github.com  ███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               1
  mrsum@mrsum.local                        ███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               1

Done in 0.30s.
```
