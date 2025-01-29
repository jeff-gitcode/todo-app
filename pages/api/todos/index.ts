import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
}