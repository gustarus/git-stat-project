'use strict';

// base components
module.exports.Base = require('./components/base/base');
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
