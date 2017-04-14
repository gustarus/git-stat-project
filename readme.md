## Git project stat
A tool for git projects statistics generation per every user.

### Installation
#### 1. Use needed node.js version
```bash
nvm use
```

#### 2. Install dependencies
```bash
yarn
```


### Usage
```bash
yarn start -- --folder ~/projects/project --after 01.01.2017 --before 01.12.2017
```

### Example
I've used [rship repo](https://github.com/rambler-digital-solutions/rship) for this example.
```bash
pkondratenko@mac578rds:~/projects/experimental/git-stat-project
> yarn start -- --folder ~/projects/tmp/rship --after 01.01.2017 --before 01.12.2017                                                                                                                                                                                                            master [8da9a65] untracked
yarn start v0.18.1
$ NODE_PATH=$(pwd) node ./index.js --folder /Users/pkondratenko/projects/tmp/rship --after 01.01.2017 --before 01.12.2017

Total rating
  User name                                Percents value                  Commits pushed  Lines affected
  m.chernobrov@rambler-co.ru               ██████████████████████████████              16             691
  abietis@gmail.com                        ████░░░░░░░░░░░░░░░░░░░░░░░░░░               3              63
  me@mrsum.ru                              ███░░░░░░░░░░░░░░░░░░░░░░░░░░░               2              20
  mrsum@mrsum.local                        █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               1               4
  a-ignatov-parc@users.noreply.github.com  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               1               0

Done in 0.36s.
```
