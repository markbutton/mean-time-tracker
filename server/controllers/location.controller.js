var config = require('config.json');
var express = require('express');
var router = express.Router();
var locationService = require('services/location.service');

// routes
router.post('/', _create);
router.get('/', _getAll);
router.get('/:_id', _getById);
router.put('/:_id', _update);
router.delete('/:_id', _delete);

module.exports = router;

// Create
function _create(req, res) {
    locationService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Read
function _getAll(req, res) {
    locationService.getAll()
        .then(function (locations) {
            res.send(locations);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _getById(req, res) {
    locationService.getById(req.params._id)
        .then(function (location) {
            if (location) {
                res.send(location);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Update
function _update(req, res) {
    locationService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Delete
function _delete(req, res) {
    locationService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}