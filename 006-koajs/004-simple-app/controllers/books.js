const books = require('./../db/data.json');

module.exports = {
  getAll(ctx, next) {
    ctx.status = 200;
    ctx.body = books
  },

  getById(ctx, next) {
    const {id} = ctx.params;

    const book = books.find(b => b.id === Number(id));

    ctx.assert(book, 404)

    ctx.status = 200;
    ctx.body = book;
  },

  create(ctx, next) {
    // ctx.request.body <- request body
    // ctx.body == ctx.response.body <- response body

    const {id, author, title} = ctx.request.body;
    books.push({id: Number(id), author, title});

    ctx.status = 201;
    ctx.body = {id, author, title};
  }
}
