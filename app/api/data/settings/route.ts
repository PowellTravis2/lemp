import { settingsQuery } from '@/lib/settingsQuery';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        return NextResponse.json(await settingsQuery(), { status: 200})
    }
}