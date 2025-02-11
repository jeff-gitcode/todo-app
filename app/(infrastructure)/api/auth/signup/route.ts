import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    try {
        const cryptedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: cryptedPassword },
        });
        return NextResponse.json(user, { status: 201 });
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
}