'use strict';

var uuid = require('node-uuid');
var crypto = require('crypto');
var path = require('path');

module.exports = function ($youmeb, $config, $routes) {

  var restAuth = this;
  
  restAuth.USER_GROUP = $config.get('restAuth.userGroup') || 'user';
  restAuth.ANONYMOUS_GROUP = $config.get('restAuth.userGroup') || 'anonymous';

  $routes.source(path.join(__dirname, 'controllers'));

  restAuth.on('init', function (config, done) {
    $youmeb.register('restAuth', restAuth);
    done();
  });

  restAuth.generateNonce = function () {
    var shasum = crypto.createHash('sha1');
    return shasum.update(uuid.v4()).digest('hex');
  };

  restAuth.generateToken = function () {
    return crypto.createHash('sha1').update(Date.now().toString(16) + crypto.randomBytes(6).toString('hex')).digest('hex');
  };

  // hash = sha1([sha1(password), nonce, cnonce].sort().join(''))
  restAuth.check = function (password, nonce, cnonce, chash) {
    var shasum = crypto.createHash('sha1');
    var hash = shasum.update([password, cnonce, nonce].sort().join('')).digest('hex');
    return chash === hash;
  };

  restAuth.saveNonce = function (nonce, done) {
    var key;
    restAuth.emit('saveNonce', nonce, function (k) {
      key = k;
    }, function (err) {
      done(err, key);
    });
    return restAuth;
  };

  restAuth.getNonce = function (key, done) {
    var nonce;
    restAuth.emit('getNonce', key, function (n) {
      nonce = n;
    }, function (err) {
      done(err, nonce);
    });
    return restAuth;
  };

  restAuth.getPassword = function (login, done) {
    var pass;
    restAuth.emit('getPassword', login, function (p) {
      pass = p;
    }, function (err) {
      done(err, pass);
    });
    return restAuth;
  };

  restAuth.saveToken = function (login, done) {
    var token;
    restAuth.emit('saveToken', login, function (t) {
      token = t;
    }, function (err) {
      done(err, token);
    });
    return restAuth;
  };

  restAuth.getUser = function (token, done) {
    var user;
    restAuth.emit('getUser', token, function (u) {
      user = u;
    }, function (err) {
      done(err, user);
    });
    return restAuth;
  };
};
