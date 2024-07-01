import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const ret = NextResponse.json({ message: 'Logged Out' }, { status: 200 });
        ret.cookies.set('sessionid', '', { expires: new Date(0) });
        return ret;
    } catch (error) {
        NextResponse.json({ error: 'Could Not Delete Cookie' }, { status: 500 });
    }
}