import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, password } = body;

    if ( !username || !password ) {
        return NextResponse.json({ error: 'Invalid Credentials', status: 403 });
    }

    const response = await fetch('https://dev.answeringlegalapp.com/api/v1/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, variant: 'Answering Legal'}),
        credentials: 'include',
    });
    // console.log(response);
    if (response.status === 200 || response.status === 403) {
        const setCookieHeader = response.headers.get('set-cookie');
        const ret = NextResponse.json({ message: 'Autherization Granted', status: 200 });
        if (setCookieHeader) {
            const cookieValue = setCookieHeader.split(';')[0];
            ret.cookies.set('sessionid', cookieValue.split('=')[1]);
        }
        return ret;
    } else {
        return NextResponse.json({ error: 'Invalid Credentials', status: 403 });
    }
}