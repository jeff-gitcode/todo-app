import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@prisma/client';
// import { withAuth } from '../../../middleware/withAuth';

// export default withAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {

import { PrismaClient, Todo } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (req.method === 'PUT') {
        const { title, completed } = req.body;
        const todo: Todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title, completed },
        });
        res.status(200).json(todo);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

    if (req.method === 'DELETE') {
        await prisma.todo.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};