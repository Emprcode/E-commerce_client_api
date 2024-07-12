import SessionSchema from "./SessionSchema.js";

export const createSession = (obj) => {
  return SessionSchema(obj).save();
};

export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};
export const deleteSession = (filter) => {
  SessionSchema.findOneAndDelete(filter);
};
