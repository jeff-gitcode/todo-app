// tests/mocks/prisma.ts
import { PrismaClient } from '@prisma/client';

const prismaMock = {
    todo: {
        findMany: () => [{
            id: 1,
            title: 'Test todo 1',
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            title: 'Test todo 2',
            completed: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        ],
        findUnique: () => { },
        create: () => { },
        update: () => { },
        delete: () => { },
    },
    // Add other models as needed
} as unknown as PrismaClient;

export default prismaMock;