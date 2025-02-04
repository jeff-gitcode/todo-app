// import prisma from '@prisma/client';
// import { withAuth } from '../../../middleware/withAuth';

// export default withAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

// delete todo
export async function DELETE(req: Request,
    { params }: { params: { id: string } }): Promise<Response> {
    try {
        console.log(params);
        const { id } = await params;
        await prisma.todo.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({}, { status: 204 });
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

// update todo
export async function PUT(req: Request,
    { params, body }: { params: { id: string }, body: { title: string, completed: boolean } }): Promise<Response> {
    try {
        console.log(body);
        const { id } = await params;
        const { title, completed } = body;
        const todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title, completed },
        });
        return NextResponse.json(todo);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

// update todo by id with PATCH
export async function PATCH(req: Request,
    { params }: { params: { id: string } }): Promise<Response> {
    try {
        const payload = await req.json();
        console.log(payload);

        const { id } = await params;
        const { title, completed } = payload;
        const todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title, completed },
        });
        return NextResponse.json(todo);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

// fetch todo by id
export async function GET(req: Request,
    { params }: { params: { id: string } }): Promise<Response> {
    try {
        const { id } = await params;
        const todo = await prisma.todo.findUnique({
            where: { id: Number(id) },
        });
        return NextResponse.json(todo);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { id } = req.query;
//     if (req.method === 'PUT') {
//         const { title, completed } = req.body;
//         const todo: Todo = await prisma.todo.update({
//             where: { id: Number(id) },
//             data: { title, completed },
//         });
//         res.status(200).json(todo);
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }

//     if (req.method === 'DELETE') {
//         await prisma.todo.delete({
//             where: { id: Number(id) },
//         });
//         res.status(204).end();
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// };