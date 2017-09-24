var config = require('config.json');
var express = require('express');
var router = express.Router();
var timeService = require('services/time.service');

// routes
router.post('/', _create);
router.post('/open', _getOpen);
router.get('/', _getAll);
router.get('/:_id', _getCurrent);
router.put('/:_id', _update);
router.delete('/:_id', _delete);

module.exports = router;

// Create
function _create(req, res) {
    timeService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Read
function _getAll(req, res) {
    timeService.getAll()
        .then(function (times) {
            res.send(times);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _getCurrent(req, res) {
    timeService.getById(req.params._id)
        .then(function (time) {
            if (time) {
                res.send(time);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _getOpen(req, res) {
    timeService.getOpen(req.body.userId, req.body.timeType)
        .then(function (time) {
            if (time) {
                res.send(time);
            } else {
                res.sendStatus(204);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Update
function _update(req, res) {
    timeService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Delete
function _delete(req, res) {
    timeService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}