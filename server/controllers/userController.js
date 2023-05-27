const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const {where} = require("sequelize");

const generateJwt = (id, firstName, lastName, login, role) => {
    return jwt.sign(
        {id, firstName, lastName, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {firstName, lastName, login, password, role} = req.body
            if (!login || !password) {
                return next(ApiError.badRequest('Некорректный login или password'))
            }
            const candidate = await User.findOne({where: {login}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким login уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({firstName, lastName, login, role, password: hashPassword})
            const token = generateJwt(user.id, user.firstName, user.lastName, user.login, user.role)
            return res.json({token})
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const user = await User.findOne({where: {login}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.firstName, user.lastName, user.login, user.role)
            return res.json(token)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.firstName, req.user.lastName, req.user.login, req.user.role)
            return res.json(token)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new UserController()