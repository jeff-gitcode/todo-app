import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma/client';
import { withAuth } from '../../../middleware/withAuth';

export default withAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title } = req.body;
        const todo = await prisma.todo.create({
            data: { title },
        });
        res.status(201).json(todo);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
});