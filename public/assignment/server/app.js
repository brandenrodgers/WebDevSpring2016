/**
 * Created by branden on 3/16/16.
 */
module.exports = function(app) {
    var userModel    = require("./models/user.model.server.js")();
    var userService  = require("./services/user.service.server.js")(app, userModel);

    var formModel    = require("./models/form.model.server.js")();
    var formService  = require("./services/form.service.server.js")(app, formModel);
    var fieldService  = require("./services/form.service.server.js")(app, formModel);
};