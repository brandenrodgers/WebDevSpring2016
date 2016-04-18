/**
 * Created by branden on 3/3/16.
 */

module.exports = function(app, db, mongoose){
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var dealModel = require("./models/deal.model.server.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, dealModel, userModel);
    var dealService = require("./services/deal.service.server.js")(app, dealModel, userModel);
};