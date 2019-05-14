import express from 'express';
import itemController from '../controllers/item';

const router = express.Router();
const path = '/user/:userId/item';
// TODO: Item 에 대해서 create, read, update, delete api 를 작성해주세요.

router.get(`${path}s`, itemController.getItems);
router.post(`${path}`, itemController.addItem);
router.put(`${path}/:id`, itemController.updateItem);
router.delete(`${path}/:id`, itemController.removeItem);

export default router;