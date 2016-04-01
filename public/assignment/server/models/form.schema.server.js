

module.exports = function(mongoose) {

    var Field = require('./field.schema.server')(mongoose);

    var formSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: 'New Form'},
        fields: [Field],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'assignment.form'});

    return formSchema;
};