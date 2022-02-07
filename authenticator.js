// for pages that require client to be logged in
exports.checkAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

// for pages that require client to NOT be logged in
exports.checkNotAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};
