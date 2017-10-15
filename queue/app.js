/*
	Include modules
*/
const koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const router = require('koa-simple-router');
const error = require('koa-json-error');
const logger = require('koa-logger');
const koaRes = require('koa-res');
const handleError = require('koa-handle-error');
const task = require('./controller/task');
const kue = require('kue');
const json = require('koa-json')
const app = new koa()

/*
	Server Config
*/
// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

// logging
app.use(logger())
// body parsing
app.use(bodyParser())
// format response as JSON
// app.use(convert(koaRes()))
app.use(json())
// configure router
app.use(router(_ => {
	_.get('/saysomething', async (ctx) => {
		ctx.body = 'hello world'
	})
  _.post('/purchase', task.purchase)
	// _.get('/throwerror', async (ctx) => {
	// 	throw new Error('Aghh! An error!')
	// }),
	// _.get('/tasks', task.getTasks),
	// _.post('/task', task.createTask),
	// _.post('/multiply', task.multiply),
	// _.put('/task', task.updateTask),
	// _.delete('/task', task.deleteTask),
	// _.post('/task/multi', task.createConcurrentTasks),
	// _.delete('/task/multi', task.deleteConcurrentTasks)
}));

app.listen(3000)
console.log(`Listening on port 3000`);
