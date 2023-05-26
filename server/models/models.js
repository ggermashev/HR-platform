const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Profession = sequelize.define('profession', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    profession: {type: DataTypes.STRING, unique: true}
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    post: {type: DataTypes.STRING, unique: true}
    //professionId
})

const Education = sequelize.define('education', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    education: {type: DataTypes.STRING, unique: true}
})

const WorkExperience = sequelize.define('work_experience', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    workExperience: {type: DataTypes.STRING, unique: true}
})

const Skill = sequelize.define('skill', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    skill: {type: DataTypes.STRING, unique: true}
})

const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {type: DataTypes.STRING, unique: true}
})

const Question = sequelize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING},
    answer: {type: DataTypes.STRING}
    //vacancyId
})

const AnswerVariant = sequelize.define('answer_variant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    variant: {type: DataTypes.STRING},
    //questionID
})

const Contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //idVacancy
    //idResume
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: {type: DataTypes.STRING},
    //userIdFrom
    //userIdTo
    //contactId
})

const Like = sequelize.define('like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //idVacancy
    //idResume
    status: {type: DataTypes.STRING}
})

const University = sequelize.define('university', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    faculty: {type:DataTypes.STRING},
    specialization: {type:DataTypes.STRING},
    graduationYear: {type: DataTypes.INTEGER}
    //resumeId
})

const Job = sequelize.define('job', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    companyName: {type: DataTypes.STRING},
    profession: {type: DataTypes.STRING},
    post: {type: DataTypes.STRING},
    todos: {type: DataTypes.STRING},
    workFrom: {type: DataTypes.INTEGER},
    workTo: {type: DataTypes.INTEGER},
    //resumeId
})

const Resume = sequelize.define('resume', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //userId
    profession: {type: DataTypes.STRING},
    post: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    salary: {type: DataTypes.INTEGER},
    education: {type: DataTypes.STRING},
    workExperience: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

const Vacancy = sequelize.define('vacancy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //userId
    companyName: {type: DataTypes.STRING},
    profession: {type: DataTypes.STRING},
    post: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    salary: {type: DataTypes.INTEGER},
    workExperience: {type: DataTypes.STRING},
    todos: {type: DataTypes.STRING},
    requirements: {type: DataTypes.STRING},
    desirable: {type: DataTypes.STRING},
    offer: {type: DataTypes.STRING},
})

const ResumeSkills = sequelize.define('resume_skills', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const VacancySkills = sequelize.define('vacancy_skills', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Question.hasMany(AnswerVariant)
AnswerVariant.belongsTo(Question)
Vacancy.hasMany(Question)
Question.belongsTo(Vacancy)


Profession.hasMany(Post)
Post.belongsTo(Profession)


Resume.hasMany(Contact)
Contact.belongsTo(Resume)
Vacancy.hasMany(Contact)
Contact.belongsTo(Vacancy)
Contact.hasMany(Message)
Message.belongsTo(Contact)

User.hasMany(Message, {
    foreignKey: 'userIdFrom'
})
Message.belongsTo(User, {
    foreignKey: 'userIdFrom'
})
User.hasMany(Message, {
    foreignKey: 'userIdTo'
})
Message.belongsTo(User, {
    foreignKey: 'userIdTo'
})

Resume.hasMany(Like)
Like.belongsTo(Resume)
Vacancy.hasMany(Like)
Like.belongsTo(Vacancy)

Resume.hasMany(University)
University.belongsTo(Resume)

Resume.hasMany(Job)
Job.belongsTo(Resume)

User.hasMany(Resume)
Resume.belongsTo(User)
Resume.belongsToMany(Skill, {through: ResumeSkills})
Skill.belongsToMany(Resume, {through: ResumeSkills})

User.hasMany(Vacancy)
Vacancy.belongsTo(User)
Vacancy.belongsToMany(Skill, {through: VacancySkills})
Skill.belongsToMany(Vacancy, {through: VacancySkills})


module.exports = {
    User,
    Question,
    AnswerVariant,
    Contact,
    Message,
    Like,
    University,
    Profession,
    Post,
    Education,
    WorkExperience,
    Skill,
    City,
    Job,
    Resume,
    Vacancy,
    ResumeSkills,
    VacancySkills
}