const mongo = require("../db")
const Dummy = require("./dummy")

beforeAll(async () => {
  mongo.test()
  const dummies = await Dummy.find()
  await Promise.all(dummies.map(d => d.remove()))
})

afterAll(() => {
  mongo.disconnect()
})

it("is empty", async () => {
  const dummies = await Dummy.find()
  return expect(dummies.length).toBe(0)
})
