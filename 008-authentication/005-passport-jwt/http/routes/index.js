const Router = require('@koa/router');
const {register, user, jwt, oauth, refresh} = require('./../controllers/authentication');

const router = new Router({prefix: '/api'});

router.post('/register', register);
router.post('/refresh', refresh);

router.get('/oauth/:provider', oauth);
router.post('/oauth/:provider', oauth);
router.get('/oauth/:provider/callback', oauth);

router.get('/user', jwt, user);

module.exports = router;
