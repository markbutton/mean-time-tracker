var config = require('config.json');
var _ = require('lodash');
//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var querystring = require('querystring');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('time');

var service = {};

service.create = _create;
service.getAll = _getAll;
service.getById = _getById;
service.getOpen = _getOpen;
service.update = _update;
service.delete = _delete;

module.exports = service;

// Create
function _create(timeParam) {
    var deferred = Q.defer();

    // set time object to timeParam
    var time = timeParam;

    db.time.insert(
        time,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

// Read
function _getAll() {
    var deferred = Q.defer();

    db.time.find().toArray(function (err, time) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return time 
        time = _.map(time, function (time) {
            return time;
        });

        deferred.resolve(time);
    });

    return deferred.promise;
}

function _getById(_id) {
    var deferred = Q.defer();

    db.time.findById(_id, function (err, time) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (time) {
            // return time
            deferred.resolve(time);
        } else {
            // time not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function _getOpen(userId, timeType) {
    var deferred = Q.defer();
    //console.log(userId + timeType);

    db.time.findOne({ 'userId' : userId, 'timeType' : timeType, 'timeOut' : 0 }, function (err, time) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (time) {
            // return time
            deferred.resolve(time);
        } else {
            // time not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

// Update
function _update(_id, timeParam) {
    var deferred = Q.defer();

    // fields to update
    var set = {
        userId: timeParam.userId,
        locationId: timeParam.locationId,
        timeType: timeParam.timeType,
        timeIn: timeParam.timeIn,
        timeOut: timeParam.timeOut,
    };

    db.time.update(
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

    db.time.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}