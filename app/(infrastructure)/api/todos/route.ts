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
import { TodoSchema } from '@/app/domain/validation/todo-schema';
import { PrismaClient, Todo } from '@prisma/client';
import { NextResponse } from 'next/server';
import { PrismaTodoRepository } from '../../database/prisma-todo-repository';
import { CreateTodo } from '@/app/application/use-cases/create-todo';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     // if (req.method !== "GET") {
//     //     return res.status(405).json({ message: "Method not allowed" });
//     // }

//     const todos = await prismaMock.todo.findMany();
//     res.status(200).json(todos);
// }

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
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

// create a new todo
export async function POST(req: Request): Promise<Response> {
    try {
        const payload = await req.json();
        console.log(payload);

        const validation = TodoSchema.safeParse(payload);

        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
        }

        const { title } = payload;

        const repository = new PrismaTodoRepository();
        const createTodo = new CreateTodo(repository);
        const todo = await createTodo.execute({ title, completed: false });

        // const todo = await prisma.todo.create({
        //     data: { title, completed: false },
        // });
        return NextResponse.json(todo, { status: 201 });
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}