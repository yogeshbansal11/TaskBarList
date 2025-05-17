import express from 'express'
import { createAddUpdateNavList, getBgUrl, getNavList, getReferredUsers, sendReferral, setBgUrl } from '../Controller/settingController.js';

const route = express.Router();

route.post('/createAndUpdate', createAddUpdateNavList )
route.post('/getNavList', getNavList )
route.post('/setUrl',setBgUrl)
route.post('/getUrl',getBgUrl)
route.post('/sendReferral',sendReferral)
route.post('/getReferredUsers',getReferredUsers)

export default route;   