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
        for(var deal in deals) {
            if(deals[deal].id == dealId) {
                console.log("successfully found deal by id: " + deals[deal].id);
                return deals[deal];
            }
        }
        return null;
    }

    function findDealsByIds(dealIds) {
        var deals = [];
        for (var id in dealIds) {
            var deal = findDealById(dealIds[id]);
            if (deal) {
                deals.push(deal);
            }
        }
        return deals;
    }

    function createDeal(deal) {
        deals.push(deal);
        console.log("created new deal: " + deal.id);
        return deal;
    }

    function updateDeal(dealId, deal) {
        for(var d in deals) {
            if(deals[d].dealId === dealId) {
                deals[d] = deal;
                return;
            }
        }
        console.log("after update, deal favorites: " + deals[0].favorites);
    }

};