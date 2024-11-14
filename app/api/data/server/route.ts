import { serverQuery } from '@/lib/serverQuery';
import { serverSQLWrite } from '@/lib/serverSQLWrite';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        var userIsAdmin = session?.roles.includes("Admin")
        return NextResponse.json(await serverQuery({isAdmin: userIsAdmin}), { status: 200})
    }
}

export async function PUT(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        let systemName = req.headers.get('name');
        // console.log(systemName)
        let systemKey = req.headers.get('valName');
        let systemVal = req.headers.get('valVal');
        return NextResponse.json(await serverSQLWrite({system: systemName, key: systemKey, value: systemVal}), { status: 200})
    }
}