/**
 * Created by branden on 3/4/16.
 */
module.exports = function(app, dealModel, userModel) {
    app.post("/api/cheapeats/user/:userId/deal/:dealId", userFavoritesDeal);
    app.post("/api/cheapeats/user/:userId/deal/unfavorite/:dealId", userUnfavoritesDeal);
    app.get("/api/cheapeats/deal/:dealId/user", findDealFavorites);

    function userFavoritesDeal(req, res) {
        var SqootDeal  = req.body;
        var userId = req.params.userId;
        var dealId = req.params.dealId;
        var deal = dealModel.findDealById(dealId);
        if(!deal) {
            deal = dealModel.createDeal(SqootDeal);
        }
        deal.favorites.push(userId);
        dealModel.updateDeal(dealId, deal);

        var user = userModel.findUserById(userId);

        user.favorites.push(dealId);
        userModel.updateUser(userId, user);
        res.send(200);
    }

    function userUnfavoritesDeal(req, res) {
        var userId = req.params.userId;
        var dealId = req.params.dealId;
        var deal = dealModel.findDealById(dealId);

        for(var i=0; i < deal.favorites.length; i++){
            if (deal.favorites[i] == userId){
                deal.favorites.splice(i, 1);
                dealModel.updateDeal(dealId, deal);
                break;
            }
        }

        var user = userModel.findUserById(userId);

        for(var x=0; i < user.favorites.length; i++){
            if (user.favorites[x] == dealId){
                user.favorites.splice(x, 1);
                userModel.updateUser(userId, user);
                break;
            }
        }

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