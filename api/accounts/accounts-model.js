const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};
const getAllName = (name) => {
  return db("accounts").select("name").where("name", name);
};

const getById = (id) => {
  return db("accounts").select("*").where("id", id).first();
};

const create = async (account) => {
  // KODLAR BURAYA
  const newAccountIdArray = await db("accounts").insert({
    name: account.name,
    budget: account.budget,
  });
  const newAccountId = newAccountIdArray[0];
  const createdAccount = await db("accounts").where("id", newAccountId).first();
  return createdAccount;
};

const updateById = (id, account) => {
  return db("accounts")
    .where("id", id)
    .update(account)
    .then((id) => {
      return getById(id);
    });
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getAllName,
};
