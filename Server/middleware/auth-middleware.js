const passport = require("passport");

exports.userAuth = passport.authenticate("jtw", { session: false });
