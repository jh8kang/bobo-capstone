const userData = require("../seed_data/users");
const storeData = require("../seed_data/stores");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("stores")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("stores").insert(storeData);
    })
    .then(() => {
      return knex("users").del();
    })
    .then(() => {
      // Inserts seed entries
      return knex("users")
        .pluck("id")
        .then(warehouseIds => {
          return warehouseIds;
        });
    })
    .then(warehouseIds => {
      const inventoryDataWithWarehouseIds = inventoryData.map(inventory => {
        inventory.warehouse_id =
          warehouseIds[Math.floor(Math.random() * warehouseIds.length)];
        return inventory;
      });
      return knex("inventories").insert(inventoryDataWithWarehouseIds);
    });
};