import { getAllUsers } from '../controllers/userController'
import express from 'express'
 
export default (router: express.Router) => {
    router.get("/users", getAllUsers)
}