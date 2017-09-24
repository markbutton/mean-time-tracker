var config = require('config.json');
var express = require('express');
var router = express.Router();
var userStateService = require('services/userState.service');

// routes
router.post('/', _create);
router.get('/', _getAll);
router.get('/:_id', _getCurrent);
router.put('/:_id', _update);
router.delete('/:_id', _delete);

module.exports = router;

// Create
function _create(req, res) {
    userStateService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Read
function _getAll(req, res) {
    userStateService.getAll()
        .then(function (userStates) {
            res.send(userStates);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _getCurrent(req, res) {
    userStateService.getById(req.params._id)
        .then(function (userState) {
            if (userState) {
                res.send(userState);
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
    userStateService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Delete
function _delete(req, res) {
    userStateService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}