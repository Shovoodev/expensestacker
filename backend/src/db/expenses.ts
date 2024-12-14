import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    expensename : { type : String , requied : true },
    group_id : { type : String , requied : true } ,
    created_at: {type: Date, default: Date.now}
})

export const expenseModel = mongoose.model("Expenses", expenseSchema)
export const getExpenses = (groupId: string) => expenseModel.find({ group_id: groupId })
export const getExpensesById = (id : string) => expenseModel.findById(id)
export const createExpenses = (values : Record<string, any>) => new expenseModel(values).save().then((user) => user.toObject())
export const deleteExpensesById = (id: string) => expenseModel.findByIdAndDelete({_id : id})
export const updateExpensesById = (id : string , values : Record<string ,any>) => expenseModel.findByIdAndUpdate(id , values)
