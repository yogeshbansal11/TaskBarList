import express from 'express'
import {expiryTime, getUser, login, resetPassword, setreferralCode, signUp, updateName} from '../Controller/userController.js'
import VerifyToken from '../middleware/VerifyToken.js';

const route = express.Router();

route.post('/signup', signUp)
route.post('/login',login)
route.post('/setreferralCode',setreferralCode)
route.post('/getUser',VerifyToken,getUser)
route.post('/resetPassword',resetPassword)
route.post('/updateName',updateName)
route.post('/expiryTime',expiryTime)

export default route;