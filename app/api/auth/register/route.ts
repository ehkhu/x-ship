import { hashPassword } from "@/lib/utils";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {userFullName, username, password } = await request.json();
    // YOU MAY WANT TO ADD SOME VALIDATION HERE
    // console.log(request.json());
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        userFullName,
        userName:username,
        userPassword: hashedPassword,
      },
    });
    console.log({userFullName, username, password });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}