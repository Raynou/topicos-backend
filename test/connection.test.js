const { sequelize } = require("./src/connection.js");

test("Connection to database is working", async () => {
  const res = await connectionTest();
  expect(res).toBe(true);
});

const connectionTest = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.close();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
