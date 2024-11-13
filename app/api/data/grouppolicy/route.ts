import { gpQuery } from '@/lib/gpQuery';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        // return NextResponse.json({ message: `${JSON.stringify(serverQuery({isAdmin: userIsAdmin}))}`}, { status: 200})
        // console.log(await serverQuery({isAdmin: userIsAdmin}))
        return NextResponse.json(await gpQuery(), { status: 200})
    }
    
}