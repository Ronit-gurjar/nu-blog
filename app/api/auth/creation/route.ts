import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        let dbUser = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    firstName: user.given_name ?? "",
                    lastName: user.family_name ?? "",
                    email: user.email ?? "",
                    profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                },
            });
        }

        // For API routes, it's better to return a JSON response
        return NextResponse.json({ success: true, user: dbUser });
    } catch (error) {
        console.error("Error in /api/auth/creation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}