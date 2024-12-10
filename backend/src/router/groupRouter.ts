import express  from 'express'
import { delteteGroup, getAllGroupts, getGroupt , registerGroup } from './../controllers/groupController';


export default (router: express.Router)=> {
    router.get('/groups' , getAllGroupts)
    router.get('/group/:id', getGroupt)
    router.post('/group/register', registerGroup);
    router.delete('/group/delete/:id',  delteteGroup)
}