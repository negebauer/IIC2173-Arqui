/* eslint-disable no-console */

const axios = require('axios')
const taskQueue = require('../queue/tasks')

const API_QUEUE_SECRET = process.env.API_QUEUE_SECRET || 'apiqueuesecret'
const API = process.env.API || 'http://localhost:3000'

exports.purchase = async ctx => {
  if (ctx.request.header['secret'] === API_QUEUE_SECRET) {
    // const { userId, productsIds, orderId } = ctx.request.
    const { orders } = ctx.request.body

    orders.forEach(function(order) {
      let error = null
      console.log('esta es la orden\n')
      console.log(order)
      const task = taskQueue.create(
        'purchase',
        {},
        {
          userId: order.userId,
          productId: order.productId,
          sentAt: order.sentAt,
        },
        err => {
          if (err) {
            console.error(err)
            error = err
          }
        }
      )

      task.on('complete', async result => {
        const url = API + '/orders/resolved'
        const response = await axios.post(
          url,
          {
            userId: result.userId,
            productId: result.productId,
            sentAt: result.sentAt,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Secret: API_QUEUE_SECRET,
            },
          }
        )
        if (response.status !== 200) {
          console.log('Error validating order.')
        }
      })

      task.on('failed attempt', function(errorMessage, doneAttempts) {
        console.log(errorMessage)
        console.log(`Request failed: ${doneAttempts}`)
      })

      if (task) {
        ctx.body = { created: true, job_id: task.id }
        ctx.status = 200
      } else {
        ctx.body = { created: false, error }
        ctx.status = 500
      }
    }, this)
  } else {
    ctx.body = { created: false, error: 'unauthorized' }
    ctx.status = 401
  }
}

//
// exports.getTasks = async (ctx) => {
// }
//
// exports.createTask = async (ctx) => {
// 	const order = ctx.request.body;
//   const task = taskQueue.create('task', {}, order, (err) => {
//     if (err) {
// 			console.log('entra a un error');
//     } else {
// 			console.log('tarea encolada');
//     }
// 	});
// 	if (!task){
// 		ctx.body = {message: 'Failure'};
// 	}
// 	else{
// 		ctx.body = {message: 'Task created!', data: order};
// 	}
//
// 	task.on('complete', function(result){
//   	console.log('Job completed with data ', result);
// 	}).on('failed attempt', function(errorMessage, doneAttempts){
// 	  console.log('Job failed');
// 	}).on('failed', function(errorMessage){
// 	  console.log('Job failed');
// 	}).on('progress', function(progress, data) {
// 	  console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );
// 	});
// }
//
// exports.multiply = async (ctx) => {
// 	const {a, b} = ctx.request.body;
//
//   const task = taskQueue.create('multiply', {}, {a, b}, (err) => {
//     if (err) {
// 			console.log('mult: entra a un error');
//     } else {
// 			console.log('mult: tarea encolada');
//     }
// 	});
//
// 	task.on('complete', function(result){
// 		console.log(`Multiplied ${result.a} * ${result.b} = ${result.c}`);
// 		//acá se require una variable de entorno.
// 		//
// 		request.post('http://localhost:3000/task').form({name:'tarea', priority: 'nullo'});
// 	}).on('failed attempt', function(errorMessage, doneAttempts){
// 	  console.log('Job failed');
// 	}).on('failed', function(errorMessage){
// 	  console.log('Job failed');
// 	}).on('progress', function(progress, data) {
// 	  console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );
// 	});
// }
//
// exports.updateTask = async (ctx) => {
// }
//
// exports.deleteTask = async (ctx) => {
// }
//
// exports.createConcurrentTasks = async (ctx) => {
// }
//
// exports.deleteConcurrentTasks = async (ctx) => {
// }
