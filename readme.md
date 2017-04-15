## Git project stat
A tool for git projects statistics generation per every user.

### What does the result look like?
I've used [rship repo](https://github.com/rambler-digital-solutions/rship) for this example.

```bash
pkondratenko:~/projects/experimental/git-stat-project (*)
> yarn start -- --folder ~/projects/tmp/rship --after 01.01.2017 --before 31.12.2017                                                                                               refactoring/change-components-hierarchy [55cce1e] modified
yarn start v0.18.1
$ node ./script.js --folder /Users/pkondratenko/projects/tmp/rship --after 01.01.2017 --before 31.12.2017

Commits pushed report
  User name                                Total value ratio                                   Count
  m.chernobrov@rambler-co.ru               |██████████████████████████████████████████████████     16
  abietis@gmail.com                        |█████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      3
  me@mrsum.ru                              |██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      2
  a-ignatov-parc@users.noreply.github.com  |███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      1
  mrsum@mrsum.local                        |███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      1

Lines affected report (added plus removed)
  User name                                Total value ratio                                   Count
  m.chernobrov@rambler-co.ru               |██████████████████████████████████████████████████    691
  abietis@gmail.com                        |█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     63
  me@mrsum.ru                              |█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     20
  mrsum@mrsum.local                        |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      4
  a-ignatov-parc@users.noreply.github.com  |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      0

Lines diff report (added minus removed)
  User name                                Total value ratio                                   Count
  a-ignatov-parc@users.noreply.github.com  ░░░░░░░░░░░░░░░░░░░░░░░░░|░░░░░░░░░░░░░░░░░░░░░░░░░      0
  me@mrsum.ru                              ░░░░░░░░░░░░░░░░░░░░░░░░░|░░░░░░░░░░░░░░░░░░░░░░░░░      0
  mrsum@mrsum.local                        ░░░░░░░░░░░░░░░░░░░░░░░░░|░░░░░░░░░░░░░░░░░░░░░░░░░      0
  m.chernobrov@rambler-co.ru               ░░░░█████████████████████|░░░░░░░░░░░░░░░░░░░░░░░░░    -33
  abietis@gmail.com                        █████████████████████████|░░░░░░░░░░░░░░░░░░░░░░░░░    -39

Done in 0.33s.
```


### Installation as separate project

#### 1. Clone the repo
```bash
git clone git@github.com:gustarus/git-stat-project.git && cd git-stat-project
```

#### 2. Use needed node.js version
```bash
nvm use
```

#### 3. Install dependencies
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
const {Log, GitProject, CommitsReport, LinesAffectedReport, LinesDiffReport} = components;
const reports = [CommitsReport, LinesAffectedReport, LinesDiffReport];

const log = new Log();
const git = new GitProject({folder});
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
  log.info('\n' + blocks.join('\n\n') + '\n');
}).catch(error => {
  log.error(`\n${error.stack}\n`);
  process.exit(1);
});
```
