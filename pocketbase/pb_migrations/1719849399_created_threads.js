/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "rgl3x3dr4l5kbxz",
    "created": "2024-07-01 15:56:39.324Z",
    "updated": "2024-07-01 15:56:39.324Z",
    "name": "threads",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mj1oicor",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rgl3x3dr4l5kbxz");

  return dao.deleteCollection(collection);
})
