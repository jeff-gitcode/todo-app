// login
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password } = await req.json();
    console.log(email, password);
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ error: "No user found with this email" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid);
    if (!isValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    return NextResponse.json(user);
}