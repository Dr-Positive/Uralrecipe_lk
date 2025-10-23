import { Mailing } from '../models/models.js';
import ApiError from '../error/ApiError.js';


class mailingController {
    async create(req, res, next ) {
        try {
            let {title,text, div, dispt,date } = req.body
            const mailing = await Mailing.create({title, text, div, dispt,date});
            return res.json(mailing)

        }

        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res) {
        const mailing = await Mailing.findAll()
        return res.json(mailing)

    }
    async getOne(req, res) {
        const {id} = req.params
        const mailing = await Mailing.findOne({where: {id}})
        return res.json(mailing)

    }
}

export default new mailingController()


