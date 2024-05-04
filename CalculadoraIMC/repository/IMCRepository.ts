import { Task, UpdateTask } from '../models/Task'

type Response = {
    success: unknown,
    error: unknown
}

export interface IMCRepository {
    create (task: Task): Response
    getAll (): Response
    update (task: UpdateTask): Response
    delete (id: number) : Response
}