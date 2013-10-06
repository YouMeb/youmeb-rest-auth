'use strict';

module.exports = function ($youmeb, $restAuth) {

  this.$({
    name: '',
    path: ''
  });

  this.nonce = {
    path: '/nonce',
    methods: ['get'],
    security: [$restAuth.USER_GROUP],
    handler: function (req, res, next) {
      var nonce = $restAuth.generateNonce();
      $restAuth.saveNonce(nonce, function (err, key) {
        if (err) {
          return next(err);
        }
        res.jsonp({
          success: true,
          data: {
            nonce: nonce,
            key: key
          }
        });
      });
    }
  };

  this.login = {
    path: '/login',
    methods: ['post'],
    security: [$restAuth.USER_GROUP],
    handler: function (req, res, next) {
      var login = req.body.login;
      var cnonce = req.body.cnonce;
      var hash = req.body.hash;
      var key = req.body.key;
      $restAuth.getNonce(key, function (err, nonce) {
        if (err) {
          return done(err);
        }
        $restAuth.getPassword(login, function (err, password) {
          console.log(nonce, cnonce);
          var success = $restAuth.check(password, nonce, cnonce, hash);
          res.jsonp({
            success: true,
            data: {
              loginSuccess: success
            }
          });
          if (success) {
            $restAuth.saveToken(login, token);
          }
        });
      });
    }
  };

};
