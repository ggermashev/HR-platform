const {Vacancy, Question, AnswerVariant, VacancySkills, Skill, Resume, WatchedVacancies} = require('../models/models')
const ApiError = require('../error/ApiError')

class VacancyController {
    async getOne(req, res, next) {
        try {
            const {vacancyId} = req.params
            if (vacancyId === "undefined") {
                return next(ApiError.badRequest('Неверный vacancyId'))
            }
            const vacancy = await Vacancy.findOne({where: {id: vacancyId}})
            return res.json(vacancy)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getByUser(req, res, next) {
        try {
            const {userId} = req.params
            const vacancies = await Vacancy.findAll({where: {userId}})
            return res.json(vacancies)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getAll(req, res, next) {
        try {
            const vacancies = await Vacancy.findAll()
            return res.json(vacancies)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }


    async getForLikes(req, res, next) {
        try {
            const {resumeId} = req.params
            if (!resumeId) {next()}
            const resume = await Resume.findOne({where: {id: resumeId}})
            const existVacancies = await WatchedVacancies.findAll({where: {resumeId: resume.id}})
            let vacancies = await Vacancy.findAll()
            vacancies = vacancies.filter(v => {return !existVacancies.map(e_v => e_v.vacancyId).includes(v.id)})
            return res.json(vacancies)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }


    async create(req, res, next) {
        try {
            const {userId, companyName, profession, post, city, salary, workExperience,
                todos, requirements, desirable, offer, questions, skills} = req.body
            const vacancy = await Vacancy.create({userId, companyName, profession, post, city, salary, workExperience,
                todos, requirements, desirable, offer})
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].answer === ""){
                    continue;
                }
                const q = await Question.create({question: questions[i].question, answer: questions[i].answer, vacancyId: vacancy.id})
                for (let variant of questions[i].variants) {
                    let answerVariant =  await AnswerVariant.create({variant: variant.variant, questionId: q.id})
                }
            }
            for (let s of skills) {
                let skill = Skill.findOne({where: {skill: s}})
                if (!skill) {
                    skill = Skill.create({skill: s})
                }
                const vacancySkill = VacancySkills.create({vacancyId: vacancy.id, skillId: skill.id})
            }
            return res.json(vacancy)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async update(req, res, next) {
        try {
            const {vacancyId} = req.params
            const body = req.body
            const vacancy = await Vacancy.update(body, {where: {vacancyId}})
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async delete(req, res, next) {
        try {
            const {vacancyId} = await req.params
            const vacancy = Vacancy.destroy({where: {id: vacancyId}})
            return res.json(vacancy)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new VacancyController()