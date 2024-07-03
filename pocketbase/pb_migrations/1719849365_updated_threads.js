/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z8b8mk4lmog0alo")

  collection.name = "posts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z8b8mk4lmog0alo")

  collection.name = "threads"

  return dao.saveCollection(collection)
})
