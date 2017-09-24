var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('location');

var service = {};

service.create = _create;
service.getAll = _getAll;
service.getById = _getById;
service.update = _update;
service.delete = _delete;

module.exports = service;

function _getAll() {
    var deferred = Q.defer();

    db.location.find().toArray(function (err, location) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return location 
        location = _.map(location, function (location) {
            return location;
        });

        deferred.resolve(location);
    });

    return deferred.promise;
}

function _getById(_id) {
    var deferred = Q.defer();

    db.location.findById(_id, function (err, location) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (location) {
            // return location
            deferred.resolve(location);
        } else {
            // location not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function _create(locationParam) {
    var deferred = Q.defer();

    // set location object to locationParam
    var location = locationParam;

    db.location.insert(
        location,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function _update(_id, locationParam) {
    var deferred = Q.defer();

    // fields to update
    var set = {
        name: locationParam.name,
        address: locationParam.address,
    };

    db.location.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.location.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}