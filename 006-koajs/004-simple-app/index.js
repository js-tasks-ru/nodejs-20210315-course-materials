const Koa = require('koa');

const bootstrap = require('./middleware');

/**
 * Return a list of books
 * GET /books
 * GET /books?name=Dune
 *
 * Return a book by ID
 * GET /books/:id
 *
 * Create a new book
 * POST /books
 *
 * Update a book
 * PUT /books/:id
 * PATCH /books/:id
 *
 * Delete a book
 * DELETE /books/:id
 *
 * 200 - OK
 * 201 - Created
 * 204 - No Content
 *
 * 400 - Bad Request
 * 404 - Not Found
 * 401 - Unauthorized
 * 403 - Forbidden
 *
 * 500 - Internal Server Error
 *
 * POST /job -> {id:1, status: pending}
 *
 * HATEOAS
 * JSON:API - https://jsonapi.org/
 */

const app = new Koa();

bootstrap(app);

app.listen(3000, () => {
  console.log('Server started');
});

// process.on('uncaughtException', (error, origin) => {
// });
//
// process.on('unhandledRejection', error => {
// });
