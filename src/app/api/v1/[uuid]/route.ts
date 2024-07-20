import {NextRequest, NextResponse} from "next/server";
import RequestBinDb from "@/app/db/RequestBinDb";
import {cookies, headers} from "next/headers";


export async function POST(request: Request, {params}: { params: { uuid: string } }) {
    // const body = await request.json()
    const uuid = params.uuid;
    const headersList = headers()
    const cookieStore = cookies()
    let body: any;
    if (headersList.get("content-type").includes("json")) {
        body = await request.json();
    } else if (headersList.get("content-type").includes("form-data")) {
        const formdata = await request.formData();
        body = {};
        formdata.forEach((val, key) => {
            body[key] = val;
        })

    } else {
        body = await request.text();
    }

    const hlist = {};
    headersList.forEach((val, key) => {
        hlist[key] = val;
    })


    await RequestBinDb.update({
        uuid, dump: {
            headers: hlist,
            cookies: cookieStore.getAll(),
            body
        }
    })
    return NextResponse.json({success: true});
}

export async function GET(request: NextRequest, {params}: { params: { uuid: string } }) {
    const uuid = params.uuid;
    const data = await RequestBinDb.getOneBy({uuid});
    return NextResponse.json((data?.dump || {}));
}