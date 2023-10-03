import executeQuery from "../lib/db";
import { addHours, formatDate } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const mac = formData.get("mac");
  const hour = formData.get("hour");
  const additionalHours = Number(hour);

  try {
    const result = await executeQuery({
      query: `SELECT * FROM hotspot_users WHERE mac="${mac}"`,
    });
    
    if (result.length > 0) {
      await executeQuery({
        query: `UPDATE hotspot_users SET id="${
          result[0].id
        }", mac="${mac}", start_date="${formatDate(
          new Date()
        )}", expiration_date="${formatDate(
          addHours(new Date(), additionalHours)
        )}" WHERE mac="${mac}"`,
      });

      try {
          await fetch(`http://10.5.50.1/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: mac,
            password: mac,
          }),
        });
  
      } catch (error) {
        console.log(error);
      }

      return NextResponse.json({ msg: "success" }, { status: 200 });

    } else {
      await executeQuery({
        query:
          "INSERT INTO `hotspot_users` (`mac`, `start_date`, `expiration_date`) VALUES (?, ?, ?);",
        values: [
          mac,
          formatDate(new Date()),
          formatDate(addHours(new Date(), additionalHours)),
        ],
      });

     
      return NextResponse.json({ msg: "not implemented yet" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
}