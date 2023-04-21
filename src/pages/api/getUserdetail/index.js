import mongodbconnect from "@/utils/functions/mongoconnect";
import { NextApiRequest, NextApiResponse } from "next";
import user from "@/utils/database/Model";

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */

export default async function handler(req, res) {
      await mongodbconnect();
      const email = req.body.email;
      const userfind = await user.findOne({email}).lean();
      if (!userfind) {
            return res
              .status(400)
              .json({ status: 400, error: "kindly login again please!! there is problem in getting data" });
      }
      return res.status(200).json({status : 200 , data : userfind});
}
