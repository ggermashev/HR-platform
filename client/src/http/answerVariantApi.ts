import {$host} from "./index"

export const getAnswerVariants = async (questionId: number) => {
    const {data} = await $host.get(`api/answer_variants/${questionId}`)
    return data
}
