import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, requird: true },
  email: { type: String, requird: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionTokken = (sessionToken: any) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
export const updatePasswordById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
export const deleteToken = async (sessionToken: string) => {
  await UserModel.findOneAndDelete({
    "UserSchema.authentication.sessionToken": sessionToken,
  });
};
