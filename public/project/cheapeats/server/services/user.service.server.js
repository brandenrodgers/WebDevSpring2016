/**
 * Created by branden on 3/3/16.
 */
module.exports = function(app, dealModel, userModel) {
    app.post("/api/cheapeats/login", login);
    app.post("/api/cheapeats/logout", logout);
    app.post("/api/cheapeats/register", register);
    app.put("/api/cheapeats/update", update);
    app.get("/api/cheapeats/loggedin", loggedIn);
    app.get("/api/cheapeats/profile/:userId", profile);

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        res.json(user);
    }

    function update(req, res) {
        var user = req.body;
        user = userModel.updateUser(user._id, user);
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function loggedIn(req, res) {
        //TODO update this once I use session
        var user = {field: "test user"};
        res.json(user);
    }

    function logout(req, res) {
        //TODO update this once I use session
        res.send(200);
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        var dealIds = user.favorites;
        var deals = dealModel.findDealsByIds(dealIds);
        user.favoritesDeals = deals;
        res.json(user);
    }
};