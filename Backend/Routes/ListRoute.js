import express from 'express'
import VerifyToken from '../middleware/VerifyToken.js';
import { create, deleteList, getListsByUser, updateListColor } from '../Controller/ListController.js';
const route = express.Router();

route.post('/create', create )
route.get("/:userId",VerifyToken, getListsByUser);
route.put("/updatecolor", updateListColor);
route.delete("/deleteList", deleteList);

export default route;