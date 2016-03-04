/**
 * Created by branden on 3/4/16.
 */
module.exports = function(app, dealModel, userModel) {
    app.post("/api/cheapeats/user/:userId/deal/:dealId", userFavoritesDeal);
    app.get("/api/cheapeats/deal/:dealId/user", findDealFavorites);

    function userFavoritesDeal(req, res) {
        var SqootDeal  = req.body;
        var userId = parseInt(req.params.userId);
        var dealId = parseInt(req.params.dealId);
        var deal = dealModel.findDealById(dealId);
        if(!deal) {
            deal = dealModel.createDeal(SqootDeal);
        }
        if(!deal.favorites) {
            deal.favorites = [];
        }
        deal.favorites.push(userId);
        dealModel.updateDeal(dealId, deal);

        var user = userModel.findUserById(userId);
        if(!user.favorites) {
            user.favorites = [];
        }
        user.favorites.push(dealId);
        userModel.updateUser(userId, user);
        res.send(200);
    }

    function findDealFavorites (req, res) {
        var dealId = parseInt(req.params.dealId);
        var deal = dealModel.findDealById(dealId);
        if(!deal) {
            console.log("could not find deal by id");
            res.json(null);
        }
        else {
            var dealFavoritesIds = deal.favorites;
            var users = userModel.findUsersByIds(dealFavoritesIds);
            res.json(users);
        }
    }
};