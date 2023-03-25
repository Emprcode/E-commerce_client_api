import UserSchema from "./UserSchema.js"

export const createUser = (userObj) => {
    return UserSchema(userObj).save()
}

export const getSingleUser = ({filter}) => {
    return UserSchema.findOne(filter)
}

export const updateUser = (filter, Obj) => {
    return UserSchema.findByIdAndUpdate(filter, Obj)
}

export const deleteUser = (_id, obj) => {
    UserSchema.findByIdAndDelete(_id, obj)
}