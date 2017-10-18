module.exports = {
  NO_SUBJECT: {
    subject: 'Ayuda',
    message: `
      Estimado/a afortunado/a,
      La aplicación soporta las siguientes solicitudes, por favor considerar puntos y comas tal como son explicitados en el cuerpo:

      1) Ver todos los productos:
      - Asunto: Catalogo
      - Cuerpo: No es necesario

      2) Ver todas las categorias de productos:
      - Asunto: Categorias
      - Cuerpo: No es necesario

      3) Ver una categoría:
      - Asunto: Categoria
      - Cuerpo: Categoria: idCategoria.

      4) Ver todos los productos de una categoría (puede ser más de una categoría)
      - Asunto: Productos por categoria
      - Cuerpo: Categoria: idCategoria1;idCategoria2.

      5) Consultar uno o varios productos:
      - Asunto: Consulta
      - Cuerpo: Producto: idProducto1;idProducto2.

      6) Comprar productos:
      - Asunto: Compra
      - Cuerpo: Producto: idProducto1;idProducto2.
      
      7) Ver todos los productos separados por categoría:
      - Asunto: Catalogo por categoria
      - Cuerpo: No es necesario

      Saludos cordiales
    `,
  },
  GET_CATEGORIES: {
    subject: 'Respuesta consulta categorías',
    message: categories => {
      let message =
        'Estimado/a, las categorías disponibles son las siguientes:\n'
      for (const category of categories) {
        message = message.concat(
          '\nId: ' +
            category.id +
            ', Contexto: ' +
            category.context +
            ', Area: ' +
            category.area +
            ', Grupo: ' +
            category.group
        )
      }
      message = message.concat('\n\nSaludos cordiales')
      return message
    },
  },
  GET_CATEGORY: {
    subject: category => 'Respuesta consulta categoria ' + category.id,
    message: category => {
      let message =
        'Estimado/a, la categoría tiene la siguiente información: \n'
      message = message.concat('\nId: ' + category.id)
      message = message.concat('\nContexto: ' + category.context)
      message = message.concat('\nArea: ' + category.area)
      message = message.concat('\ngroup: ' + category.group)
      message = message.concat('\n\nSaludos cordiales')
      return message
    },
  },
  GET_CATEGORY_WITH_PRODUCTS: {
    subject: 'Respuesta consulta categorias con productos',
    message: (categories, failIDs) => {
      let message =
        'Estimado/a, los productos separados por categoría son los siguientes: \n'
      for (const category of categories) {
        message = message.concat('\nId: ' + category.id)
        message = message.concat('\nContexto: ' + category.context)
        message = message.concat('\nArea: ' + category.area)
        message = message.concat('\ngroup: ' + category.group)
        message = message.concat('\nProductos: ')
        for (const product of category.products) {
          message = message.concat(
            '\n\tId: ' +
              product.id +
              ', nombre: ' +
              product.name +
              ', categoria: ' +
              product.category +
              ', precio: $' +
              product.price
          )
        }
      }
      for (const failID of failIDs) {
        message = message.concat(
          '\nLa categoria de Id ' +
            failID +
            ' no fue encontrada, consulte en otro momento'
        )
      }
      message = message.concat('\n\nSaludos cordiales')
      return message
    },
  },
  GET_PRODUCTS: {
    subject: 'Respuesta consulta catalogo',
    message: products => {
      let message = 'Estimado/a, los productos del catálogo son: \n'
      for (const product of products) {
        message = message.concat(
          '\nId: ' +
            product.id +
            ', nombre: ' +
            product.name +
            ', categoria: ' +
            product.category +
            ', precio: $' +
            product.price
        )
      }
      message = message.concat('\n\nSaludos cordiales.')
      return message
    },
  },
  GET_PRODUCT: {
    subject: 'Respuesta a Consulta de productos',
    message: (products, failIDs) => {
      let message = 'Estimado/a, los productos son los siguientes: \n'
      for (const product of products) {
        message = message.concat(
          '\nId: ' +
            product.id +
            ', nombre: ' +
            product.name +
            ', categoria: ' +
            product.category +
            ', precio: $' +
            product.price
        )
      }
      for (const failID of failIDs) {
        message = message.concat(
          '\nEl producto de Id ' +
            failID +
            ' no fue encontrado, consulte en otro momento'
        )
      }
      message = message.concat('\n\nSaludos cordiales')
      return message
    },
  },
  GET_ORDER_SENT: {
    subject: 'Orden de compra recivida',
    message:
      'Estimado/a,\nSu orden de compra ha sido archivada. Por favor espere a la confirmacion de esta misma. \n\nSaludos cordiales.',
  },
  GET_PRODUCTS_BY_CATEGORY: {
    subject: 'Respuesta a Consulta de productos por categoria',
    message: categories => {
      let message = 'Estimado/a, los productos separados por categoría son: \n'
      for (const category of categories) {
        message = message.concat('\nId: ' + category.id)
        message = message.concat('\nContexto: ' + category.context)
        message = message.concat('\nArea: ' + category.area)
        message = message.concat('\nGrupo: ' + category.group)
        message = message.concat('\nProductos: ')
        for (const product of category.products) {
          message = message.concat(
            '\n\tId: ' +
              product.id +
              ', nombre: ' +
              product.name +
              ', categoria: ' +
              product.category +
              ', precio: $' +
              product.price
          )
        }
        message = message.concat('\n')
        //message = message.concat('\nId: '+product.id+', nombre: '+product.name+', categoria: '+product.category+', precio: $'+product.price)
      }
      // for (let failID of failIDs ) {
      //   message = message.concat('\nEl producto de Id '+failID+' no fue encontrado, consulte en otro momento')
      // }
      message = message.concat('\n\nSaludos cordiales')
      return message
    },
  },
  STATUS_CODE_503: {
    subject: 'La solicitud no pudo ser atentida',
    message:
      'Lo sentimos, La solicitud no pudo ser atendida. \nPor favor intente nuevamente. ',
  },
  SECRET: {
    TOKEN: process.env.API_MAILER_SECRET || 'apimailersecret',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || 'arquitectura',
  },
  ORDER_RESPONSE_SUCCESS: {
    subject: 'Orden realizada con exito',
    message: product => {
      let message =
        'Felicitaciones :)!. El siguiente producto han sido comprado con éxito:'
      message = message.concat(
        '\nId: ' + product.productId + ', nombre: ' + product.productName
      )
      return message
    },
  },
  ORDER_RESPONSE_FAILURE: {
    subject: 'Fallo la orden de compra',
    message: errors => {
      let message =
        'Estimado, \n Lamentamos informale que la solicitud de los siguientes productos ha sido rechazada por ser medicamentos o haber sido comprados por usted el día de hoy:\n '
      for (const error of errors.notMedicine) {
        message = message.concat(
          '\n\tId: ' + error.id + ', nombre: ' + error.name
        )
      }
      for (const error of errors.notBeenBoughtToday) {
        message = message.concat(
          '\n\tId: ' + error.id + ', nombre: ' + error.name
        )
      }

      message = message.concat('\n\nSaludos cordiales')
      return message
    },
  },
}
