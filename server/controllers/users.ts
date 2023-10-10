import { Express, Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    if (!username || !email) {
      res.status(400).json({
        status: "failed",
        message: "Requst has no required data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Bad requst",
    });
  }
};
