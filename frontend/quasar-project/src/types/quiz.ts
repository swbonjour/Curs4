export interface QuizDto {
    _id: string;
    question: string;
    answers: string[];
    correct_answer: string;
    score: number;
    group_id: string;
}