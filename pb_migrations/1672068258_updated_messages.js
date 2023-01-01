migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2andt4hqc1ud0my")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2andt4hqc1ud0my")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
