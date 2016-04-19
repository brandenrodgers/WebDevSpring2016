/**
 * Created by branden on 3/16/16.
 */
module.exports = function(app, db, mongoose, userModel) {
    var formModel    = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel   = require("./models/field.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js")(app, userModel);
    var formService  = require("./services/form.service.server.js")(app, formModel);
    var fieldService  = require("./services/field.service.server.js")(app, fieldModel);
};