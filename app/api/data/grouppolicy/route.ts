import { gpQuery } from '@/lib/gpQuery';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { gpWrite } from '@/lib/gpWrite';

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        return NextResponse.json(await gpQuery(), { status: 200})
    }
    
}

export async function PUT(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        let systemName = req.headers.get('name');
        let systemKey = req.headers.get('valName');
        let systemVal = await req.json();
        return NextResponse.json(await gpWrite({system: systemName, key: systemKey, value: systemVal.content}), { status: 200})
    }
}