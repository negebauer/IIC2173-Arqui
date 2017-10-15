'use strict';
const request = require('request');

let redisConfig;
if (process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS,
      options: {
        no_ready_check: false
      }
    }
  };
} else {
  redisConfig = {};
}

const kue = require('kue');
const queue = kue.createQueue(redisConfig);
queue.watchStuckJobs(1000 * 10);

queue.on('ready', () => {
  console.info('Queue is ready!');
});

queue.on('error', (err) => {
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});



// Set up UI
kue.app.listen(process.env.KUE_PORT);
kue.app.set('title', 'Kue');

function createTask(type, options, data, done) {
  const {
    priority,
    attempts,
    backoff,
    removeOnComplete,
  } = options;
  return queue.create(type, data)
    .priority(priority || 'critical')
    .attempts(attempts || 8)
    .backoff(backoff || true)
    .removeOnComplete( removeOnComplete || false)
    .delay(5000)
    .save(err => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        done();
      }
    });
}


// queue.process('task', 20, function(job, done){
//   console.log('Acá puedo hacer lo que quiera con mi data: ', job.data);
//   done(null, job.data);
// });
//
//
// queue.process('multiply', 1, function(job, done){
//   const {a , b} = job.data;
//   done(null, {a, b, c: a*b });
// });

queue.process('purchase',10,function(job,done){
  const {user_id,products_array, amounts_array} = job.data
  //Acá se manda el request a la api de productos. Url debería provenir de variable de entorno
  //Endpoint aun no disponible
  // const url = 'http://arqss17.ing.puc.cl:3000/purchase';
  // request.post({url,form:{user_id, products_array,amounts_array}},function(err,response,body){
  //   if(err){
  //     console.error(err)
  //     done(err)
  //   }else{
  //     console.log(response.status)
  //     console.log(body)
  //     done(null,{response,body})
  //   }
  // })
  const url = 'http://x.com';
  request(url,function(err,response,body){

    if(err){
      console.error(err)
      done(err)
    }else{
      console.log(response.statusCode)
      console.log(body)
      done(null,{response,body})
    }
  })

});


module.exports = {
  create: createTask,
};
