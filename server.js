const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
  "/api/accounting/*/:id": "/$1/:id",
  "/apps": "/api/accounting/apps",
}));
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running')
});