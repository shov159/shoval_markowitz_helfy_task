import { z } from 'zod';

export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    completed: z.boolean(),
    createdAt: z.date(),
    priority: z.enum(['low', 'medium', 'high'])
});

export const createTaskSchema = taskSchema.omit({ id: true, createdAt: true });
export const updateTaskSchema = taskSchema.omit({ createdAt: true, id: true });