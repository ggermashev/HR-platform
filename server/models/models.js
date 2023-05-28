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
    question: {type: DataTypes.STRING(2048), },
    answer: {type: DataTypes.STRING(1024)}
    //vacancyId
})

const AnswerVariant = sequelize.define('answer_variant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    variant: {type: DataTypes.STRING(1024)},
    //questionID
})

const Contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //idVacancy
    //idResume
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: {type: DataTypes.STRING(2048)},
    //userIdFrom
    //userIdTo
    //contactId
})

const Like = sequelize.define('like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //idVacancy
    //idResume
    status: {type: DataTypes.STRING},
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
    todos: {type: DataTypes.STRING(2048)},
    workFrom: {type: DataTypes.INTEGER},
    workTo: {type: DataTypes.INTEGER},
    //resumeId
})

const Resume = sequelize.define('resume', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //userId
    userName: {type: DataTypes.STRING},
    profession: {type: DataTypes.STRING},
    post: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    salary: {type: DataTypes.INTEGER},
    education: {type: DataTypes.STRING},
    workExperience: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING(2048)},
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
    todos: {type: DataTypes.STRING(2048)},
    requirements: {type: DataTypes.STRING(2048)},
    desirable: {type: DataTypes.STRING(2048)},
    offer: {type: DataTypes.STRING(2048)},
})

const ResumeSkills = sequelize.define('resume_skills', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const VacancySkills = sequelize.define('vacancy_skills', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const WatchedResumes = sequelize.define('watched_resumes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const WatchedVacancies = sequelize.define('watched_vacancies', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const TestResults = sequelize.define('test_results', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    points: {type: DataTypes.INTEGER},
    maxPoints: {type: DataTypes.INTEGER},
})

const NewMessage = sequelize.define("new_message", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //ContactId
    //userId
})

User.hasMany(NewMessage)
NewMessage.belongsTo(User)
Contact.hasMany(NewMessage)
NewMessage.belongsTo(Contact)

Question.hasMany(AnswerVariant, {
    onDelete: 'CASCADE'
})
Vacancy.hasMany(Question, {
    onDelete: 'CASCADE'
})


Profession.hasMany(Post, {
    onDelete: 'CASCADE'
})


Resume.hasMany(Contact, {
    onDelete: 'CASCADE'
})
Vacancy.hasMany(Contact, {
    onDelete: 'CASCADE'
})
Contact.hasMany(Message, {
    onDelete: 'CASCADE'
})

User.hasMany(Message, {
    foreignKey: 'userIdFrom',
    onDelete: 'CASCADE'
})
User.hasMany(Message, {
    foreignKey: 'userIdTo',
    onDelete: 'CASCADE'
})

Resume.hasMany(Like, {
    onDelete: 'CASCADE'
})
Vacancy.hasMany(Like, {
    onDelete: 'CASCADE'
})

Resume.hasMany(University, {
    onDelete: 'CASCADE'
})

Resume.hasMany(Job, {
    onDelete: 'CASCADE'
})

User.hasMany(Resume, {
    onDelete: 'CASCADE'
})
Resume.belongsToMany(Skill, {through: ResumeSkills, onDelete: 'RESTRICT'})
Skill.belongsToMany(Resume, {through: ResumeSkills, onDelete: 'CASCADE'})

User.hasMany(Vacancy)
Vacancy.belongsToMany(Skill, {through: VacancySkills, onDelete: 'RESTRICT'})
Skill.belongsToMany(Vacancy, {through: VacancySkills, onDelete: 'CASCADE'})

Resume.hasMany(WatchedResumes)
WatchedResumes.belongsTo(Resume)
Vacancy.hasMany(WatchedResumes)
WatchedResumes.belongsTo(Vacancy)

Resume.hasMany(WatchedVacancies)
WatchedVacancies.belongsTo(Resume)
Vacancy.hasMany(WatchedVacancies)
WatchedVacancies.belongsTo(Vacancy)

User.hasMany(TestResults)
TestResults.belongsTo(User)
Vacancy.hasMany(TestResults)
TestResults.belongsTo(Vacancy)

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
    VacancySkills,
    WatchedVacancies,
    WatchedResumes,
    TestResults,
    NewMessage
}