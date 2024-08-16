import OrderSchema from "./OrderSchema.js";

export const createNewOrder = (obj) => {
  return OrderSchema(obj).save();
};

export const getOrders = (userId) => {
  return OrderSchema.findOne(userId).sort({ createdAt: -1 }).exec();
};

export const deleteOldOrder = (userId) => {
  return OrderSchema.deleteMany({ userId, _id: { $ne: newDocument._id } });
};
