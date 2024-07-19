import UserSchema from "./UserSchema.js";

export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUser = (filter) => {
  return UserSchema.findOne(filter);
};

export const updateUser = (filter, obj) => {
  return UserSchema.findOneAndUpdate(filter, obj, { new: true });
};

export const deleteUser = (_id, obj) => {
  UserSchema.findByIdAndDelete(_id, obj);
};
