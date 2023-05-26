const {Vacancy, Question, AnswerVariant, VacancySkills, Skill} = require('../models/models')

class VacancyController {
    async getOne(req, res) {
        const {vacancyId} = req.params
        const vacancy = await Vacancy.findOne({where: {id: vacancyId}})
        return res.json(vacancy)
    }

    async getByUser(req, res) {
        const {userId} = req.params
        console.log(userId)
        const vacancies = await Vacancy.findAll({where: {userId: userId}})
        return res.json(vacancies)
    }

    async create(req, res) {
        const {companyName, profession, post, city, salary, workExperience,
            todos, requirements, desirable, offer, questions, variants, skills} = req.body
        const vacancy = await Vacancy.create({companyName, profession, post, city, salary, workExperience,
            todos, requirements, desirable, offer})
        for (let i = 0; i < questions.length; i++) {
            const q = await Question.create({question: questions[i].question, answer: questions[i].answer, vacancyId: vacancy.id})
            for (let variant of variants[i]) {
                let answerVariant =  await AnswerVariant.create({variant: variant, questionId: q.id})
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
    }

    async update(req, res) {
        const {vacancyId} = req.params
        const body = req.body
        const vacancy = await Vacancy.update(body, {where: {vacancyId}})
    }

    async delete(req, res) {
        const {vacancyId} = await req.params
        const vacancy = Vacancy.destroy({where: {id: vacancyId}})
        return res.json(vacancy)
    }
}

module.exports = new VacancyController()