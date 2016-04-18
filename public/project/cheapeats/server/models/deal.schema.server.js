
module.exports = function(mongoose) {

    var dealSchema = mongoose.Schema({
        userId: String,
        sqootId: String,
        type: {
            type: String,
            default: 'PUBLIC',
            enum: ["PUBLIC", "LOCAL"]
        },
        title: String,
        discount_amount: Number,
        short_title: String,
        price: Number,
        image_url: {
            type: String,
            default: "images/logo-image.png"
        },
        description: String,
        url: String,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'project.deal'});

    return dealSchema;
};