const passport = require('passport-restify');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config/config.development.js');
const User = require('../modules/user/models/user.v1.model.js');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
options.secretOrKey = config.JWT_SECRET;

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    await User.findOne({ _id: jwtPayload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }

      return user ? done(null, user) : done(null, false);
    });
  })
);
