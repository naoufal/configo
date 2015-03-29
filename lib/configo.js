var _  = require('lodash');

// Set require path
var PATH = (process.env.NODE_ENV === 'configo') ? '../' : '../../../';

var createConf = function() {
  var C = {};
  var store;

  // Set public variables
  store = require(PATH + 'config/default/public');

  // Detect and set environment
  C._ENV = process.browser ? 'browser' : 'server';

  // Optionally set server variables
  if (C._ENV === 'server') {
    var server_store = require(PATH + 'config/default/private');
    store = _.assign(server_store, store);
  }

  // Get a variable
  C.get = function(key) {
    // Is the key a nested object
    if (key.match(/:/)) {
      // Transform getter string into object
      var store_key = getNestedKey(key);

      return store_key;
    }

    // Return regular key
    return store[key];
  };

  // Set a variable
  C.set = function(key, val) {
    if (key.match(/:/)) {
      var keys = key.split(':');
      var store_key = store;

      _.each(keys, function(k, i) {
        if (keys.length === (i + 1)) {
          store_key[k] = val;
        }

        if (store_key[k] === undefined) {
          store_key[k] = {};
        }

        store_key = store_key[k];
      });

    } else {
      store[key] = val;
    }
  };

  // Return store key
  var getNestedKey = function(nested_key) {
    // Transform getter string into object
    var keys = nested_key.split(':');
    var store_key = store;

    _.each(keys, function(k) {
      try {
        store_key = store_key[k];
      } catch(e) {
        return undefined;
      }
    });

    return store_key;
  };

  return C;
};

module.exports = createConf();

