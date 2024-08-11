// route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { validatePhoneNumber } from "./EmailValidation";
import { isNumber } from "util";

export async function post(req: NextApiRequest, res: NextApiResponse) {
  const { number } = req.body;
  const isValid = validatePhoneNumber(number);

  if (isValid) {
    res.status(200).json({ message: "Email is valid." });
  } else {
    res.status(400).json({ message: "Invalid email." });
  }
}
