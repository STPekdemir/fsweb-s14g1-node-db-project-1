const router = require("express").Router();

const accountModel = require("./accounts-model");
const express = require("express");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");
router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const data = await accountModel.getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  try {
    res.status(200).json(req.idData);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await accountModel.create(req.payload);
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const updatedAccount = await accountModel.updateById(
        req.params.id,
        req.payload
      );
      res.status(201).json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    await accountModel.deleteById(req.params.id);
    res.status(200).json(req.idData);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
});

module.exports = router;
