/**
 * Created by branden on 3/31/16.
 */

module.exports = function(mongoose) {

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        city: String,
        state:String,
        roles: [String],
        favorites: [String]
    }, {collection: 'project.user'});

    return userSchema;
};