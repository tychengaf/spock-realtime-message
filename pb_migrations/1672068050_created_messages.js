migrate((db) => {
  const collection = new Collection({
    "id": "2andt4hqc1ud0my",
    "created": "2022-12-26 15:20:50.411Z",
    "updated": "2022-12-26 15:20:50.411Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mowmbqdf",
        "name": "message",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 140,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "z7jvgydu",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      }
    ],
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
  const collection = dao.findCollectionByNameOrId("2andt4hqc1ud0my");

  return dao.deleteCollection(collection);
})
