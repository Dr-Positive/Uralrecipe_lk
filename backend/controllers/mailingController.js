const { Mailing } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class mailingController {
    async create(req, res, next ) {
        try {
            let {title,text, div, dispt } = req.body
            const alert = await Mailing.create({title, text, div, dispt});
            return res.json(alert)

        }

        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res) {

    }
}

module.exports = new mailingController()


