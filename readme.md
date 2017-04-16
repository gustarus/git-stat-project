## Git project stat
A tool for git projects statistics generation per every user.

### What does the result look like?
I've used [rship repo](https://github.com/rambler-digital-solutions/rship) for this example.

```bash
pkondratenko:~/projects/experimental/git-stat-project (*)
> yarn start -- --folder ~/projects/tmp/rship --after 01.01.2017 --before 31.12.2017
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


### Requirements
If you want to use this in your console, you need to use `node.js` >= `7.1`.


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


### How you can use this via console?
Clone and install this project and then type in console from this project dir:

```bash
yarn start -- --folder ~/projects/project --after 01.01.2017 --before 01.12.2017
```

Or via npm:
```bash
npm start -- --folder ~/projects/project --after 01.01.2017 --before 01.12.2017
```


### How you can use this in your project?
This code u can find in [script.js](script.js).

```javascript
const stat = require('git-stat-project');
const {helpers, Log, GitProject, CommitsReport, LinesAffectedReport, LinesDiffReport} = stat;
const {getArgv} = helpers;

const {folder, before, after} = getArgv(process.argv);
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


### Which kinds of reports do you have?
Each report can be required with the following syntax (where `collection` - git statistic results from `GitProject` instance):
```javascript
const {GeneralReport} = require('git-stat-project');
const report = new Report({collection});
const records = report.generate();
return report.render(records);
```

#### GeneralReport
```bash
General report - commits pushed and lines affected ratio
  User name                                Percents value                                       Commits  Lines
  m.chernobrov@rambler-co.ru               |██████████████████████████████████████████████████       16    691
  abietis@gmail.com                        |██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        3     63
  me@mrsum.ru                              |███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        2     20
  mrsum@mrsum.local                        |█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        1      4
  a-ignatov-parc@users.noreply.github.com  |█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        1      0
```

#### CommitsReport
```bash
Commits pushed report
  User name                                Total value ratio                                    Commits
  m.chernobrov@rambler-co.ru               |██████████████████████████████████████████████████       16
  abietis@gmail.com                        |█████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        3
  me@mrsum.ru                              |██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        2
  a-ignatov-parc@users.noreply.github.com  |███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        1
  mrsum@mrsum.local                        |███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        1
```

#### LinesAddedReport
```bash
Lines added report
  User name                                Total value ratio                                    Added
  m.chernobrov@rambler-co.ru               |██████████████████████████████████████████████████    329
  abietis@gmail.com                        |██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     12
  me@mrsum.ru                              |██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     10
  mrsum@mrsum.local                        |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      2
  a-ignatov-parc@users.noreply.github.com  |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      0
```

#### LinesRemovedReport
```bash
Lines removed report
  User name                                Total value ratio                                    Removed
  m.chernobrov@rambler-co.ru               |██████████████████████████████████████████████████      362
  abietis@gmail.com                        |███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░       51
  me@mrsum.ru                              |█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░       10
  mrsum@mrsum.local                        |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        2
  a-ignatov-parc@users.noreply.github.com  |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        0
```

#### LinesDiffReport
```bash
Lines diff report (added minus removed)
  User name                                Total value ratio                                    Diff
  a-ignatov-parc@users.noreply.github.com  ░░░░░░░░░░░░░░░░░░░░░░░░░|░░░░░░░░░░░░░░░░░░░░░░░░░     0
  me@mrsum.ru                              ░░░░░░░░░░░░░░░░░░░░░░░░░|░░░░░░░░░░░░░░░░░░░░░░░░░     0
  mrsum@mrsum.local                        ░░░░░░░░░░░░░░░░░░░░░░░░░|░░░░░░░░░░░░░░░░░░░░░░░░░     0
  m.chernobrov@rambler-co.ru               ░░░░█████████████████████|░░░░░░░░░░░░░░░░░░░░░░░░░   -33
  abietis@gmail.com                        █████████████████████████|░░░░░░░░░░░░░░░░░░░░░░░░░   -39
```

#### LinesAffectedReport
```bash
Lines affected report (added plus removed)
  User name                                Total value ratio                                    Affected
  m.chernobrov@rambler-co.ru               |██████████████████████████████████████████████████       691
  abietis@gmail.com                        |█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        63
  me@mrsum.ru                              |█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        20
  mrsum@mrsum.local                        |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         4
  a-ignatov-parc@users.noreply.github.com  |░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         0
```


### What does the module export?
```javascript
// base components
module.exports.Base = require('./components/base/base');
module.exports.Log = require('./components/base/log');
module.exports.GitProject = require('./components/base/git-project');
module.exports.Report = require('./components/base/report');
module.exports.KeyReport = require('./components/base/key-report');
module.exports.Table = require('./components/base/table');

// key reports
module.exports.CommitsReport = require('./components/reports/key/commits');
module.exports.LinesDiffReport = require('./components/reports/key/lines-diff');
module.exports.LinesAddedReport = require('./components/reports/key/lines-added');
module.exports.LinesRemovedReport = require('./components/reports/key/lines-removed');
module.exports.LinesAffectedReport = require('./components/reports/key/lines-affected');

// more complicated reports
module.exports.GeneralReport = require('./components/reports/general');
```
