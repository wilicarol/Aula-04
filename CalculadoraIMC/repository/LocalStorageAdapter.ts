import { Task, UpdateTask } from "../models/Task";
import { IMCRepository } from "./IMCRepository";

export class LocalStorageAdapter implements IMCRepository {
    create(task: Task) {
        try {
            const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]')
            tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            return {
                success: true,
                error: null
            }
        } catch (error) {
            return {
                success: null,
                error: true
            }
        }
    }
    getAll() {
        try {
            const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '')
            return {
                success: tasks,
                error: null
            }
        } catch (error) {
            return {
                success: null,
                error: true
            }
        }
    }
    update(updatedTask: UpdateTask): { success: unknown; error: unknown; } {
        try {
            const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '')

            const updatedTasks = tasks.map((task) => {
                if (task.id !== updatedTask.id) {
                    return task
                }
                return {
                    ...task,
                    ...updatedTask
                }
            })
            localStorage.setItem('tasks', JSON.stringify(updatedTasks))
            return {
                success: true,
                error: null
            }
        } catch (error) {
            return {
                success: null,
                error: true
            }
        }
    }
    delete(id: number): { success: unknown; error: unknown; } {
        try {
            const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '')
            const newTaskList = tasks.filter((task) => task.id !== id)
            localStorage.setItem('tasks', JSON.stringify(newTaskList))
            return {
                success: true,
                error: null
            }
        } catch (error) {
            return {
                success: null,
                error: true
            }
        }
    }

}