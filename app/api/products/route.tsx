import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./Schema";

export async function GET(request: NextRequest){
    const users = await prisma.product.findMany()
    return NextResponse.json(users)
}

export async function POST(request: NextRequest)
{
    const body = await request.json()
    const validation =  schema.safeParse(body)
    if(!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400})

    const craeteProduct = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price
        }
    })

    return NextResponse.json(craeteProduct, {status: 201});


}