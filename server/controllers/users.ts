import { Express, NextFunction, Request, Response } from "express";
import { createUser, getUserByEmail } from "../database/users";
import { authentication, random } from "../helpers";

interface AuthenticatedRequest extends Request {
  identity?: {
    _id: string;
    email: string;
  };
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Provide email or password",
      });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.password +authentication.salt"
    );
    if (!user) {
      return res.sendStatus(400).json({
        status: "failed",
        message: "There is no user with this email. Please Register",
      });
    }

    if (
      !user.authentication ||
      !user.authentication.salt ||
      !user.authentication.password
    ) {
      return res.status(403).send("User authentication data is missing.");
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (
      expectedHash === null ||
      user.authentication.password !== expectedHash
    ) {
      return res.status(403).send("Incorrect password");
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("GRZEGORZ_AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Bad request",
    });
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("GRZEGORZ_AUTH");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !username || !password) {
      res.status(400).json({
        status: "failed",
        message: "Fields can't be empty",
      });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "This mail is used",
      });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "bad request",
    });
  }
};
