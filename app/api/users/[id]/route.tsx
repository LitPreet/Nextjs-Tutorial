// get single object

import { NextRequest, NextResponse } from "next/server";
import schema from "../Schema";
import prisma from "@/prisma/client";

export async function GET(
  requet: NextRequest,
  { params }: { params: { id: number } }
) {
  const users = await prisma.user.findMany({
    where: {
      id: +params.id,
    },
  });
  if (params.id > 10)
    return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: "Mosh" });
}


//for updating user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //validate the request body
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updateUser);
}



export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //fetch user from db
  //if not found return 404
  //Delete the user
  //return 200

  const user = await prisma.user.findUnique({
    where: {
        id: parseInt(params.id)
    }
  })

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

     await prisma.user.delete({
        where : { id: user.id}
    })
  return NextResponse.json({});
}
