import mongodbconnect from "@/utils/functions/mongoconnect";
import { NextApiRequest, NextApiResponse } from "next";
import user from "@/utils/database/Model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  const userfind = await user.findOne({ email }).lean();
  if (!userfind) {
    return res
      .status(400)
      .json({ status: 400, error: "invalid  email / password" });
  }
  if (await bcrypt.compare(password, userfind.password)) {
    const decode = jwt.verify(userfind.token2, process.env.NEXT_PUBLIC_JWT_KEY);
    if (decode) {
      try{
      const userupdate = await user
        .findByIdAndUpdate(userfind.id, {
          islogin: true,
        });
      }catch(err) {
            return res
            .status(500)
            .json({ status: 500, data: "internal server error", data2: err });
      }
      return res
        .status(200)
        .json({ status: 200, data: "user logged in", data2: decode });
    } else {
      return res.status(400).json({ status: 400, error: "try again wrong" });
    }
  }
  return res.status(400).json({ status: 400, error: "try again wrong" });
}
