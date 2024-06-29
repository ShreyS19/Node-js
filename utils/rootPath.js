const path = require("path");

// process.mainModule is deprecated. require.main is the alternative
module.exports = path.dirname(require.main.filename);
