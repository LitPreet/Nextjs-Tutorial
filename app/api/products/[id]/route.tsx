import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../Schema";
// { params }: { params: { id: number } }

export async function GET(request: NextRequest, {params}: {params: {id: number}})
{
    const product = await prisma.product.findUnique({
        where : {
            id:  +params.id 
        }
    })

    return NextResponse.json(product)

}

export async function PUT(request: NextRequest, {params}: {params: {id: string}})
{
    const body = await request.json();
    const validation = schema.safeParse(body)
    if(!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400})

    const product = await prisma.product.findUnique({
        where: {
          id: parseInt(params.id),
        },
      });
    
      if (!product)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    const upDatedproduct = await prisma.product.update({
        where: { id: product.id },
        data : {
            name:  body.name,
            price: body.price
        }
    })

    return NextResponse.json(upDatedproduct)

}