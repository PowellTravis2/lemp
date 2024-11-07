import { mysqlServerInit } from '../../../lib/mysqlServerInit';
import { NextResponse } from "next/server";
let isInitialized = false;

export async function GET(request) {
  if (!isInitialized) {
    try {
      await mysqlServerInit();
      isInitialized = true; // Set the flag so it only runs once.
      return NextResponse.json({ message: "Hello World" }, { status: 200 })
      // res.status(200).json({ message: "Hello World" }, { status: 200 });
    } catch (error) {
      console.error("Initialization error:", error);
      return NextResponse.json({ message: "error" }, { status: 500 })
    }
  } else {
    return NextResponse.json({ message: "Hello World" }, { status: 200 })
  }
}