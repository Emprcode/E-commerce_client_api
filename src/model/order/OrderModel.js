import OrderSchema from "./OrderSchema.js";

export const createNewOrder = (obj) => {
  return OrderSchema(obj).save();
};

export const getOrders = (userId) => {
  return OrderSchema.findOne(userId);
};
