import express  from 'express'
import { delteteGroup, getGroupsByUser , registerUserGroup } from './../controllers/groupController';
import { isAuthenticated } from '../middlewares';


export default (router: express.Router)=> {
    router.get('/groups',isAuthenticated , getGroupsByUser)
    router.post('/:userId/group/register', registerUserGroup);
    router.delete('/group/delete/:id',  delteteGroup)
}