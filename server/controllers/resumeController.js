const {Resume, University, Job, Skill, ResumeSkills, Vacancy, WatchedResumes} = require('../models/models')
const ApiError = require("../error/ApiError");

class ResumeController {
    async getByUser(req, res, next) {
        try {
            const {userId} =  req.params
            const resumes = await Resume.findAll({where: {userId: userId}})
            return res.json(resumes)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getForLikes(req, res, next) {
        try {
            const {vacancyId} = req.params
            const vacancy = await Vacancy.findOne({where: {id: vacancyId}})
            const existResumes = await WatchedResumes.findAll({where: {vacancyId: vacancy.id}})
            let resumes = await Resume.findAll()
            resumes = resumes.filter(r => {return !existResumes.map(e_r => e_r.resumeId).includes(r.id)})
            return res.json(resumes)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getOne(req, res, next) {
        try {
            const {resumeId} =  req.params
            const resume = await Resume.findOne({where: {id: resumeId}})
            return res.json(resume)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getAll(req, res, next) {
        try {
            const resumes = await Resume.findAll()
            return res.json(resumes)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async create(req, res, next) {
        try {
            const {userId, userName, profession, post, city, salary, education, workExperience, description, universities, jobs, skills} =  req.body
            const resume = await Resume.create({userId, userName, profession, post, city, salary, education, workExperience, description})
            for (let univ of universities) {
                const university = await University.create({name: univ.name, faculty: univ.faculty,
                    specialization: univ.specialization, graduationYear: univ.graduationYear, resumeId: resume.id})
            }
            for (let job of jobs) {
                const j = await Job.create({companyName: job.companyName, profession: job.profession, post: job.post,
                    todos: job.todos, workFrom: job.workFrom, workTo: job.workTo, resumeId: resume.id})
            }
            for (let s of skills) {
                let skill = await Skill.findOne({where: {skill: s}})
                if (!skill) {
                    skill = await Skill.create({skill: s})
                }
                console.log(skill)
                const resumeSkill = await ResumeSkills.create({resumeId: resume.id, skillId: skill.id})
            }
            return res.json(resume)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async update(req, res, next) {
        try {
            const {resumeId} =  req.params
            const body =  req.body
            const resume = await Resume.update(body, {where: {resumeId: resumeId}})
            return res.json(resume)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async delete(req, res, next) {
        try {
            const {resumeId} = await req.params
            const resume = await Resume.destroy({where: {id: resumeId}})
            return res.json(resume)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new ResumeController()