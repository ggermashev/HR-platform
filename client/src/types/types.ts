
export interface IQuestion {
    id?: number;
    question: string;
    answer?: string;
    variants: IAnswerVariant[],//
    vacancyId?: number,
    createdAt?: string,
    updatedAt?: string,
}

export interface IAnswerVariant {
    id?: number,
    variant: string,
    questionId?: number,
    createdAt?: string,
    updatedAt?: string,
}

export interface IContact {
    id?: number;
    vacancyId: number;
    resumeId: number;
    createdAt?: string,
    updatedAt?: string,
}

export interface IMessage {
    id?: number,
    message: string,
    userIdFrom: number,
    userIdTo: number,
    contactId: number;
    createdAt?: string,
    updatedAt?: string,
}

export interface ILike {
    id?: number,
    idVacancy: number;
    idResume: number;
    status: "like" | "dislike"
}

export interface IRecentLikeVacancyToResume {
    id?: number,
    idVacancyFrom: number;
    idResumeTo: number;
}

export interface IRecentLikeResumeToVacancy {
    id?: number,
    idResumeFrom: number;
    idVacancyTo: number;
}

export interface IUser {
    id?: number,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
    phone?: string,

    role: "USER" | "HR",
}

export interface IUniversity {
    id?: number,
    name: string,
    faculty: string,
    specialization: string,
    graduationYear: number | null,
}

export interface IProfession {
    id: number,
    profession: string
}

export interface IPost {
    id?: number,
    post: string,
}

export interface IEducation {
    id?: number,
    education: string,
}

export interface IWorkExperience {
    id?: number,
    workExperience: string,
}

export interface ISkill {
    id?: number,
    skill: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface ICity {
    id?: number,
    city: string,
}

export interface IJob {
    id?: number,
    companyName: string,
    profession: string,
    post: string,
    todos: string,
    workFrom: number | null,
    workTo: number | null,
    resumeId: number | null
}

export interface IResume {
    id?: number,
    userId: number | null,
    userName: string,
    profession: string,
    post: string,
    city: string,
    salary: number,
    education: string | null,
    workExperience: string,
    universities: IUniversity[],
    jobs: IJob[],
    description: string,
    skills: string[],
    createdAt?: string,
    updatedAt?: string,
}

export interface IVacancy {
    id?: number,
    userId: number,
    companyName: string,
    profession: string,
    post: string,
    city: string,
    salary: number,
    workExperience: string,
    todos: string,
    requirements: string,
    desirable: string,
    offer: string,
    skills: string[],
    questions: IQuestion[],
    // answerVariants: IAnswerVariant[],
    createdAt?: string,
    updatedAt?: string,
}

export interface ITestResult {
    id?: number,
    points: number
    maxPoints: number,
    userId: number,
    vacancyId: number,
    createdAt?: string,
    updatedAt?: string,
}



