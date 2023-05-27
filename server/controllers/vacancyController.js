const {Vacancy, Question, AnswerVariant, VacancySkills, Skill, Resume, WatchedVacancies} = require('../models/models')

class VacancyController {
    async getOne(req, res) {
        const {vacancyId} = req.params
        const vacancy = await Vacancy.findOne({where: {id: vacancyId}})
        return res.json(vacancy)
    }

    async getByUser(req, res) {
        const {userId} = req.params
        const vacancies = await Vacancy.findAll({where: {userId}})
        return res.json(vacancies)
    }

    async getAll(req, res) {
        const vacancies = await Vacancy.findAll()
        return res.json(vacancies)
    }


    async getForLikes(req, res) {
        const {resumeId} = req.params
        const resume = await Resume.findOne({where: {id: resumeId}})
        const existVacancies = await WatchedVacancies.findAll({where: {resumeId: resume.id}})
        let vacancies = await Vacancy.findAll()
        vacancies = vacancies.filter(v => {return !existVacancies.map(e_v => e_v.vacancyId).includes(v.id)})
        return res.json(vacancies)
    }


    async create(req, res) {
        const {userId, companyName, profession, post, city, salary, workExperience,
            todos, requirements, desirable, offer, questions, variants, skills} = req.body
        const vacancy = await Vacancy.create({userId, companyName, profession, post, city, salary, workExperience,
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