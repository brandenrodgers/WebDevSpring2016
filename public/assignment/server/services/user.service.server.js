/**
 * Created by branden on 3/16/16.
 */

module.exports = function(app, userModel) {
    app.post("/api/assignments/user", createUser);
    app.post("/api/assignments/logout", logoutUser);
    app.get("/api/assignments/loggedin", loggedIn);
    app.get("/api/assignments/user", findAllUsers);
    app.get("/api/assignments/user/:id", findUserById);
    app.post("/api/assignments/creds", findUserByCredentials);
    app.put("/api/assignments/user/:id", updateUser);
    app.delete("/api/assignments/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body;

        userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    userModel.findUserById(userId)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function ( err ) {
                                res.status(400).send(err);
                            }
                        );
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel.deleteUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedIn(req, res) {
        res.send(req.session.currentUser);
    }

    function logoutUser(req, res) {
        req.session.destroy();
        res.send(200);
    }

};