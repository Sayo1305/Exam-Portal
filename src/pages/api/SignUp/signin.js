import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongodbconnect from "@/utils/functions/mongoconnect";
import jwt from "jsonwebtoken";
import user from "@/utils/database/Model";

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */

export default async function handler(req, res) {
  await mongodbconnect();
  const name = req.body.Name;
  const email = req.body.email;
  const password = req.body.password;
  const imageget = req.body.ImageUrl;
  const hash_password = await bcrypt.hash(password, 10);
  const user_check = user.findOne({ email: req.body.email });
  if (await user_check) {
    return res
      .status(400)
      .send({ error: "cannot add", data: "already user exist" });
  }
  const Token = jwt.sign(
    { email: req.body.email },
    process.env.NEXT_PUBLIC_JWT_KEY,
    { expiresIn: 31556926 }
  );
  if (Token) {
    const response = await user.create({
      image: imageget,
      name: name,
      email: email,
      password: hash_password,
      token2: Token,
    });
    return res
      .status(200)
      .send({ success: "added to database", data: response, token: Token });
  } else {
    return res
      .status(400)
      .json({ error: "cannnot add", data: "JWT authentication failed" });
  }
}
