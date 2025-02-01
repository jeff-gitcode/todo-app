// import { NextApiRequest, NextApiResponse } from 'next';
// // import prisma from '@prisma/client';
// import prismaMock from './prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "GET") {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     const todos = await prismaMock.todo.findMany();
//     res.status(200).json(todos);
// }

// import prisma from '@prisma/client';
import { PrismaClient, Todo } from '@prisma/client';
import { NextResponse } from 'next/server';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     // if (req.method !== "GET") {
//     //     return res.status(405).json({ message: "Method not allowed" });
//     // }

//     const todos = await prismaMock.todo.findMany();
//     res.status(200).json(todos);
// }

const prisma = new PrismaClient();

export async function GET(req: Request): Promise<Response> {
    try {
        // const response = await prismaMock.todo.findMany();
        const response: Todo[] = await prisma.todo.findMany();
        console.log(response);
        return NextResponse.json(response);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}