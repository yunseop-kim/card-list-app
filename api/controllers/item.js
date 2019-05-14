import db from '../db';

async function getItems(req, res) {
  const item = await db.item.findAll();

  return res.status(200).json(item);
}

async function addItem(req, res) {
  try {
    const {
      name,
      image_path
    } = req.body;
    const user = await db.user.findOne(req.body.userId)
    const item = await db.item.create({
      name,
      image_path
    })
    await user.addItem(item)
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({
      error: error.stack
    });
  }
}

async function updateItem(req, res) {
  try {
    const {
      name,
      image_path
    } = req.body

    const item = db.item.update({
      name,
      image_path
    }, {
      where: {
        id: req.params.id,
        user_id: req.params.userId
      }
    })

    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({
      error: error.stack
    });
  }
}

async function removeItem(req, res) {
  const result = await db.item.destroy({
    where: {
      id: req.params.id,
      user_id: req.params.userId
    }
  });
  if (result) {
    return res.status(200).json({
      result: "success",
      message: "성공적으로 삭제했습니다."
    });
  } else {
    return res.status(400).json({
      result: "fail",
      message: "항목을 찾을 수 없습니다."
    });
  }
}

export default {
  getItems,
  addItem,
  updateItem,
  removeItem
};