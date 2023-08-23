import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        // If any of these is not filled
        if (!email || !name || !password) {
            // return error message. Note-- NextResponsr needs 'new' keyword
            return new NextResponse("Missing info", { status: 400 });
        }

        // If all required fields are filled, hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Then create the user
        const user = await prisma.user.create({
            data: { email, name, hashedPassword },
        });

        // Note-- NextResponse does not need 'new' keyword when use with '.json()'
        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, "REGISTRATION_ERROR");
        return new NextResponse("INTERNAL_ERROR", { status: 500 });
    }
}
