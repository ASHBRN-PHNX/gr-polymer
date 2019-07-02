const errors = require('restify-errors');

const User = require('../../user/models/user.v1.model.js');

const register = async (req, res, next) => {
  let user = await User.findOne({
    username: req.body.username,
  });

  if (!user.validPassword(req.body.password)) {
    return next(new errors.InvalidCredentialsError('Invalid Credentials.'));
  }

  try {
    const token = user.generateJWT(user);

    res.send({ token: token });

    return next();
  } catch (err) {
    return next(new errors.InternalError('Could not generate token'));
  }
};

module.exports = {
  register: register,
};
