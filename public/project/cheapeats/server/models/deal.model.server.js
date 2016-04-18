/**
 * Created by branden on 3/4/16.
 */
module.exports = function(db, mongoose) {

    //load deal schema
    var dealSchema = require('./deal.schema.server.js')(mongoose);

    ////create deal model from schema
    var DealModel = mongoose.model('Deal', dealSchema);

    var api = {
        findDealById: findDealById,
        findDealsByIds: findDealsByIds,
        findLocalDeals: findLocalDeals,
        createDeal: createDeal,
        updateDeal: updateDeal,
        getUserLocalDeals: getUserLocalDeals,
        findDealBySqootId: findDealBySqootId
    };
    return api;

    function findDealById(dealId) {
        return DealModel.findById(dealId);
    }

    function findLocalDeals() {
        return DealModel.find({type: "LOCAL"});
    }

    function findDealsByIds(dealIds) {
        return DealModel.find({'_id': { $in: dealIds}});
    }

    function findDealBySqootId(sqootId) {
        return DealModel.find({'sqootId': sqootId});
    }

    function createDeal(deal) {
        return DealModel.create(deal);
    }

    function updateDeal(dealId, deal) {
        return DealModel.update({_id: dealId}, {$set: deal});
    }

    function getUserLocalDeals(userId) {
        return DealModel.find({'userId': userId});
    }

};