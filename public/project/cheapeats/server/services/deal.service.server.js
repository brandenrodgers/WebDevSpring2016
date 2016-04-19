/**
 * Created by branden on 3/4/16.
 */
module.exports = function(app, dealModel, userModel) {
    app.post("/api/cheapeats/deal", createDeal);
    app.put("/api/cheapeats/deal/:id", updateDeal);
    app.get("/api/cheapeats/deal/:id", getDealById);
    app.get("/api/cheapeats/localsearch", findLocalDeals);
    app.get("/api/cheapeats/deal/sqoot/:id", getDealBySqootId);
    app.get("/api/cheapeats/user/:userId/deal/profile", getUserLocalDeals);
    app.post("/api/cheapeats/user/deal/favorites", getUserFavorites);
    app.post("/api/cheapeats/user/deal/favorite/:userId", userFavoritesDeal);
    app.get("/api/cheapeats/favorites/deal/:dealId", findDealFavorites);


    function createDeal(req, res){
        var deal = req.body;
        dealModel.createDeal(deal)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function getDealById(req, res){
        var dealId = req.params.id;
        dealModel.findDealById(dealId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function findLocalDeals(req, res){
        dealModel.findLocalDeals()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function getDealBySqootId(req, res){
        var sqootId = req.params.id;
        dealModel.findDealBySqootId(sqootId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function updateDeal(req, res){
        var newDeal = req.body;
        var dealId = req.params.id;
        delete newDeal._id;
        dealModel.updateDeal(dealId, newDeal)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function getUserLocalDeals(req, res){
        var userId = req.params.userId;
        dealModel.getUserLocalDeals(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function getUserFavorites(req, res){
        var dealIds = req.body;
        dealModel.findDealsByIds(dealIds)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }


    function userFavoritesDeal(req, res) {
        var reqDeal  = req.body.deal;
        var user = req.body.user;
        var userId = req.params.userId;
        var resultingId = null;
        if (reqDeal.sqootId) {
            dealModel
                .findDealBySqootId(reqDeal.sqootId)
                .then(
                    function (deal) {
                        if (deal._id) {
                            return deal;
                        } else {
                            return dealModel.createDeal(reqDeal);
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (deal) {
                        if (deal) {
                            user.favorites.push(deal._id);
                            resultingId = deal._id;
                            delete user._id;
                            return userModel.updateUser(userId, user)
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (user) {
                        res.json({resultingId: resultingId});
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        } else {
            user.favorites.push(reqDeal._id);
            resultingId = reqDeal._id;
            userModel.updateUser(user._id, user)
               .then(
                    function (user) {
                        res.json({resultingId: resultingId});
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findDealFavorites (req, res) {
        var dealId = req.params.dealId;
        userModel.findDealFavorites(dealId)
            .then(
                function (response) {
                    res.json(response)
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

};