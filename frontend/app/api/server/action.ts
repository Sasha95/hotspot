import executeQuery from "../lib/db";
import { addHours, formatDate } from "@/app/utils";

export const insertData = async (mac: string, additionalHours: number) => {
    try {
    const result = await executeQuery({
      query: `SELECT * FROM hotspot_users WHERE mac="${mac}"`,
    });
    if (result.length > 0) {
        await executeQuery({
            query: `UPDATE hotspot_users SET id="${result[0].id}", mac="${mac}", start_date="${formatDate(new Date())}", expiration_date="${formatDate(addHours(new Date(), additionalHours))}" WHERE mac="${mac}"`,
        })
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
    }
  } catch (error) {
    console.log(error);
  }
};

export const activate = async (mac: string) => {
    await fetch(`http://ip_адрес_микротика/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: mac,
            password: mac,
        }),
    })
} 
