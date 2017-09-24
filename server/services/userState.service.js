var config = require('config.json');
var _ = require('lodash');
var querystring = require('querystring');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('userState');

var service = {};

service.create = _create;
service.getAll = _getAll;
service.getById = _getById;
service.update = _update;
service.delete = _delete;

module.exports = service;

// Create
function _create(userStateParam) {
    var deferred = Q.defer();

    // set userState object to userStateParam
    var userState = userStateParam;

    db.userState.insert(
        userState,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

// Read
function _getAll() {
    var deferred = Q.defer();

    db.userState.find().toArray(function (err, userState) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return userState 
        userState = _.map(userState, function (userState) {
            return userState;
        });

        deferred.resolve(userState);
    });

    return deferred.promise;
}

function _getById(_id) {
    var deferred = Q.defer();

    db.userState.findById(_id, function (err, userState) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (userState) {
            // return userState
            deferred.resolve(userState);
        } else {
            // userState not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

// Update
function _update(_id, userStateParam) {
    var deferred = Q.defer();

    // fields to update
    var set = {
        userId: userStateParam.userId,
        atWork: userStateParam.atWork,
        atLunch: userStateParam.atLunch,
        driving: userStateParam.driving,
    };

    db.userState.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

// Delete
function _delete(_id) {
    var deferred = Q.defer();

    db.userState.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}