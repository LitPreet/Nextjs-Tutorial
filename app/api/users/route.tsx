import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./Schema";

// export function GET(requet: NextRequest){
//     return NextResponse.json([{id:1, name: 'preet'}, {id:2, name: 'frun'}])
// }
// export async function POST(requet: NextRequest){
//     const body = await requet.json();
//     const validation = schema.safeParse(body)
//     if(!validation.success)
//     return NextResponse.json(validation.error.errors, {status: 400});
//     return NextResponse.json({id:1, name: body.name}, {status:201});
// }

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}
export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body)
    if(!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400})
const user = await prisma.user.findUnique({
    where: {
        email: body.email
    }
})
 // Create an array with two objects
  // Process the validated array
//   const responseArray = body.map((item:any) => ({
//     id: item.id,
//     name: item.name,
//     price: item.price
// }));
if(user)
return NextResponse.json({error: 'User already exist'}, {status: 400})

const newUser = await prisma.user.create({
    data: {
        name: body.name,
        email: body.email
    }
})
return NextResponse.json(newUser, {status: 201})
}