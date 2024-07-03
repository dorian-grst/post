/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z8b8mk4lmog0alo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ikfpld1w",
    "name": "threadId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "rgl3x3dr4l5kbxz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z8b8mk4lmog0alo")

  // remove
  collection.schema.removeField("ikfpld1w")

  return dao.saveCollection(collection)
})
