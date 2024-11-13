import { serverQuery } from '@/lib/serverQuery';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        var userIsAdmin = session?.roles.includes("Admin")
        console.log(userIsAdmin)
        return NextResponse.json({ message: `${JSON.stringify(serverQuery({isAdmin: userIsAdmin}))}`}, { status: 200})
    }
    
}