const accountModel = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  try {
    const reqName = req.body.name;
    const reqBudget = req.body.budget;
    if (reqName && reqBudget) {
      const name = reqName.trim();
      if (100 >= name.length >= 3) {
        const budget =
          typeof reqBudget === "number" ? reqBudget : Number(reqBudget);
        if (budget) {
          if (0 <= budget <= 1000000) {
            req.payload = { name: name, budget: budget };
            next();
          } else {
            res
              .status(400)
              .json({ message: "budget of account is too large or too small" });
          }
        } else {
          res
            .status(400)
            .json({ message: "budget of account must be a number" });
        }
      } else {
        res
          .status(400)
          .json({ message: "name of account must be between 3 and 100" });
      }
    } else {
      res.status(400).json({ message: "name and budget are required" });
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const name = req.body.name;
    const trimedName = name.trim();
    const valideteName = await accountModel.getAllName(trimedName);
    if (valideteName) {
      next();
    } else {
      res.status(400).json({ message: "that name is taken" });
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const idData = await accountModel.getById(id);
    if (idData) {
      req.idData = idData;
      next();
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (error) {
    next(error);
  }
};
