import { settingsQuery } from '@/lib/settingsQuery';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { settingsWrite } from '@/lib/settingsWrite';

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        return NextResponse.json(await settingsQuery(), { status: 200})
    } else {
        return NextResponse.json({ status: 403})
    }
}

export async function PUT(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        let id = req.headers.get('id');
        let settingName = req.headers.get('valName');
        let settingValue = req.headers.get('valVal');
        return NextResponse.json(await settingsWrite({id: id, settingName: settingName, settingValue: settingValue}), {status: 200})
    } else {
        return NextResponse.json({ status: 403})
    }
}