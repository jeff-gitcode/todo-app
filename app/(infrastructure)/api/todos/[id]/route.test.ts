import httpMocks from 'node-mocks-http';
import { GET, PUT } from './route';
import { prisma } from '@/app/(infrastructure)/database/prisma';

jest.mock('@/app/(infrastructure)/database/prisma', () => ({
    prisma: {
        todo: {
            update: jest.fn(),
        },
    },
}));

// describe('PUT /api/todos/[id]', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     xit('updates a todo successfully', async () => {
//         const req = httpMocks.createRequest({
//             method: 'PUT',
//             url: '/api/todos/1',
//             body: { title: 'Updated Todo', completed: true },
//             params: { id: '1' },
//         });
//         const res = httpMocks.createResponse();

//         const mockTodo = { id: 1, title: 'Updated Todo', completed: true };
//         (prisma.todo.update as jest.Mock).mockResolvedValue(mockTodo);

//         await PUT(req, { params: { id: '1' }, body: { title: 'Updated Todo', completed: true } });

//         expect(res.statusCode).toBe(200);
//         expect(res._getJSONData()).toEqual(mockTodo);
//     });

//     xit('returns an error if the update fails', async () => {
//         const req = httpMocks.createRequest({
//             method: 'PUT',
//             url: '/api/todos/1',
//             body: { title: 'Updated Todo', completed: true },
//             params: { id: '1' },
//         });
//         const res = httpMocks.createResponse();

//         (prisma.todo.update as jest.Mock).mockRejectedValue(new Error('Update failed'));

//         await PUT(req, { params: { id: '1' }, body: { title: 'Updated Todo', completed: true } });

//         expect(res.statusCode).toBe(500);
//         expect(res._getJSONData()).toHaveProperty('error', 'Update failed');
//     });
// });


// write test for GET /api/todos/[id]
describe('GET /api/todos/[id]', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns a todo successfully', async () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/todos/1',
            params: { id: '1' },
        });
        const res = httpMocks.createResponse();

        const mockTodo = { id: 1, title: 'Existing Todo' };
        (prisma.todo.findUnique as jest.Mock).mockResolvedValue(mockTodo);

        await GET(req, { params: { id: '1' } });

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockTodo);
    });

    it('returns an error if the todo is not found', async () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/todos/1',
            query: { id: '1' },
        });
        const res = httpMocks.createResponse();

        (prisma.todo.findUnique as jest.Mock).mockResolvedValue(null);

        await GET(req, { params: { id: '1' } });

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toHaveProperty('error', 'Todo not found');
    });
});