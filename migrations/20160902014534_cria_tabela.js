
exports.up = function(knex, Promise) {
  return knex.schema.createTable("imagem",function(table){
    table.increments("idimagem");
    table.string("nomeimagem").notNullable();
    table.string("mimeimagem").notNullable();
    table.binary("dataimagem").notNullable();
    table.timestamp("dtcriacaoimagem").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("imagem");
};
