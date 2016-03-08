/**
 * Created by branden on 3/4/16.
 */
module.exports = function() {
    var deals = [];
    var api = {
        findDealById: findDealById,
        findDealsByIds: findDealsByIds,
        createDeal: createDeal,
        updateDeal: updateDeal
    };
    return api;

    function findDealById(dealId) {
        dealId = parseInt(dealId);
        for(var deal in deals) {
            if(deals[deal].id == dealId) {
                return deals[deal];
            }
        }
        return null;
    }

    function findDealsByIds(dealIds) {
        var deals = [];
        for (var id in dealIds) {
            var dealId = parseInt(dealIds[id]);
            var deal = findDealById(dealId);
            if (deal) {
                deals.push(deal);
            }
        }
        return deals;
    }

    function createDeal(deal) {
        deal.favorites= [];
        deals.push(deal);
        console.log("created new deal: " + deal.id);
        return deal;
    }

    function updateDeal(dealId, deal) {
        dealId = parseInt(dealId);
        for(var d in deals) {
            if(deals[d].dealId === dealId) {
                deals[d] = deal;
                return;
            }
        }
    }

};