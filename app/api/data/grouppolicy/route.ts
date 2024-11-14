import { gpQuery } from '@/lib/gpQuery';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { gpWrite } from '@/lib/gpWrite';

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        // return NextResponse.json({ message: `${JSON.stringify(serverQuery({isAdmin: userIsAdmin}))}`}, { status: 200})
        // console.log(await serverQuery({isAdmin: userIsAdmin}))
        return NextResponse.json(await gpQuery(), { status: 200})
    }
    
}

export async function PUT(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        let systemName = req.headers.get('name');
        // console.log(systemName)
        let systemKey = req.headers.get('valName');
        let systemVal = req.headers.get('valVal');
        return NextResponse.json(await gpWrite({system: systemName, key: systemKey, value: systemVal}), { status: 200})
    }
}