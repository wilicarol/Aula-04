import { Task, UpdateTask } from '../../models/Task'

export interface IMCInt {
    add: (task: Task) => string | Error
    getTasks: () => Task [] | string | unknown
    updateTask: (task: UpdateTask) => void
    removeTask: (index: number) => void
}