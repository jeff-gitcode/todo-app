import { NextApiRequest, NextApiResponse } from 'next';
import { CreateTodo } from '@/app/application/use-cases/create-todo';
import { PrismaTodoRepository } from '@/app/infrastructure/database/prisma-todo-repository';
import { TodoSchema } from '@/app/domain/validation/todo-schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const validation = TodoSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }

    if (req.method === 'POST') {
        const { title } = req.body;
        const repository = new PrismaTodoRepository();
        const createTodo = new CreateTodo(repository);
        const todo = await createTodo.execute({ title, completed: false });
        res.status(201).json(todo);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}