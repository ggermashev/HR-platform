const {Resume, University, Job, Skill, ResumeSkills, Vacancy, WatchedResumes} = require('../models/models')

class ResumeController {
    async getByUser(req, res) {
        const {userId} =  req.params
        const resumes = await Resume.findAll({where: {userId: userId}})
        return res.json(resumes)
    }

    async getForLikes(req, res) {
        const {vacancyId} = req.params
        const vacancy = await Vacancy.findOne({where: {id: vacancyId}})
        const existResumes = await WatchedResumes.findAll({where: {vacancyId: vacancy.id}})
        let resumes = await Resume.findAll()
        resumes = resumes.filter(r => {return !existResumes.map(e_r => e_r.resumeId).includes(r.id)})
        return res.json(resumes)
    }

    async getOne(req, res) {
        const {resumeId} =  req.params
        console.log(resumeId)
        const resume = await Resume.findOne({where: {id: resumeId}})
        return res.json(resume)
    }

    async getAll(req, res) {
        const resumes = await Resume.findAll()
        return res.json(resumes)
    }

    async create(req, res) {
        const {userId, profession, post, city, salary, education, workExperience, description, universities, jobs, skills} =  req.body
        const resume = await Resume.create({userId, profession, post, city, salary, education, workExperience, description})
        for (let univ of universities) {
            const university = await University.create({name: univ.name, faculty: univ.faculty,
                specialization: univ.specialization, graduationYear: univ.graduationYear, resumeId: resume.id})
        }
        for (let job of jobs) {
            const j = Job.create({companyName: job.companyName, profession: job.profession, post: job.post,
            todos: job.todos, workFrom: job.workFrom, workTo: job.workTo, resumeId: resume.id})
        }
        for (let s of skills) {
            let skill = Skill.findOne({where: {skill: s}})
            if (!skill) {
                skill = Skill.create({skill: s})
            }
            const resumeSkill = await ResumeSkills.create({resumeId: resume.id, skillId: skill.id})
        }
        return res.json(resume)
    }

    async update(req, res) {
        const {resumeId} =  req.params
        const body =  req.body
        const resume = await Resume.update(body, {where: {resumeId: resumeId}})
        return res.json(resume)
    }

    async delete(req, res) {
        const {resumeId} = await req.params
        const resume = await Resume.destroy({where: {id: resumeId}})
        return res.json(resume)
    }
}

module.exports = new ResumeController()