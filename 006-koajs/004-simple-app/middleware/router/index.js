const Router = require('@koa/router');
const booksController = require('./../../controllers/books')

const router = new Router({prefix: '/api'})

const noop = (ctx, next) => {
  ctx.status = 501;
  return next();
}

router.get('/books', booksController.getAll);
router.get('/books/:id', booksController.getById);
router.post('/books', booksController.create);
router.put('/books/:id', noop);
router.delete('/books/:id', noop);

module.exports = router;
