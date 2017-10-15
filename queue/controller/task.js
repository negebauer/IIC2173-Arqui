const request = require('request');
const taskQueue = require('../queue/tasks');


exports.purchase = async(ctx) => {
	const {user_id,products_array, amounts_array} = ctx.request.body;
	let error = null;
	const task = taskQueue.create('purchase',{},{user_id,products_array,amounts_array}, (err) =>{
		if (err){
			console.error(err);
			console.log("asdasd")
			error = err;
		}
	});

	task.on('complete', (result) =>{
		//Acá se debería mandar el request para avisar que se completo la compra.
		console.log('  job #' + task.id + ' completed')
	})

	if(task){
		ctx.body = {created:true,job_id:task.id}
		ctx.status = 200
	}else{
		ctx.body = {created:false,error}
		ctx.status = 500
	};
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
