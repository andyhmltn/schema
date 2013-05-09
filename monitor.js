module.exports = function(app) {
    return function() {
        console.log(app.user_connections);
    }
};
