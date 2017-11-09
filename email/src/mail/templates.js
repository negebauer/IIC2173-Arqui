module.exports = {
  GET_CATEGORIES: {
    subject: 'Consulta por categorías',
    message: categories => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">A continuación encontrará la información sobre las categorías</p>

        <table style="width:60%;font-size:15px">
          <tr style="padding-bottom: 16px">
            <th align="left">Id</th>
            <th align="left">Contexto</th>
            <th align="left">Área</th>
            <th align="left">Grupo</th>
          </tr>
        ${categories
          .map(
            category => `
              <tr style="padding-bottom: 16px">
                <td>${category.id}</td>
                <td>${category.context}</td>
                <td>${category.area}</td>
                <td>${category.group}</td>
              </tr>`
          )
          .join('')}
        </table><br />

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_CATEGORY: {
    subject: category => `Consulta por categoría ${category.id}`,
    message: category => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">A continuación encontrará información sobre la categoría solicitada</p>

      <ul>
        <li>Id: ${category.id}</li>
        <li>Contexto: ${category.context}</li>
        <li>Área: ${category.area}</li>
        <li>Grupo: ${category.group}</li>
      </ul>

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_CATEGORY_WITH_PRODUCTS: {
    subject: 'Consulta por categorías con productos',
    message: (categories, failIds) => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">A continuación encontrará las categorías con sus respectivos productos</p>

      <ul>
      ${categories
        .map(
          category => `
            <li><strong>Categoría ${category.id}</strong></li>
              <ul>
                <li>Contexto: ${category.context}</li>
                <li>Area: ${category.area}</li>
                <li>Grupo: ${category.group}</li>
                <li>
                  ${
                    category.products && category.products.length
                      ? `Productos:
                  <table>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                    </tr>
                  ${category.products
                    .map(
                      product => `
                        <tr>
                          <td>${product.id}</td>
                          <td>${product.name}</td>
                          <td>$${product.price}</td>
                        </tr>`
                    )
                    .join('')}
                  </table>`
                      : 'No tiene productos'
                  }
                </li>
              </ul>`
        )
        .join('<br />')}
      </ul><br />

      ${
        failIds && failIds.length
          ? `
          <p style="font-size:14px;">No se han podido encontrar categorías con ids: ${failIds.join(
            ', '
          )}</p>
      `
          : ''
      }

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_ORDER_SENT: {
    subject: 'Orden de compra recibida',
    message: `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">Su orden de compra ha sido recibida.<br /><br />
      Por favor espere por su confirmación.</p>

      <h3>Saludos cordiales.</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_ORDER_HISTORY: {
    subject: 'Historial de compras',
    message: orders => `
      <h2>Estimado usuario,</h2>

      ${
        orders && orders.length
          ? `
      <p style="font-size:16px;">A continuación encontrará el listado de
        productos para los que ha confirmado su compra</p>

      <table style="width:40%;font-size:15px">
        <tr style="padding-bottom: 12px">
          <th align="left">Id</th>
          <th align="left">Nombre</th>
          <th align="left">Fecha</th>
          <th align="left">Exitosa</th>
        </tr>
      ${orders
        .map(
          order => `
            <tr style="padding-bottom: 12px">
              <td>${order.productId}</td>
              <td>${order.productName}</td>
              <td>${order.sentAt}</td>
              <td>${
                order.completed
                  ? '&#10003;'
                  : '<b style="font-size:12px;">X</b>'
              }</td>
            </tr>`
        )
        .join('')}
      </table><br />`
          : `
        <p style="font-size:16px;">Aún no tiene órdenes de
      compra confirmadas<br />Para realizar una debe enviar un mail con las
      siguientes características:
      <ul style="font-size:16px;"><li>Asunto: Comprar</li><li>Cuerpo: idProducto1;idProducto2</li></p>`
      }

      <h3>Saludos cordiales.</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_PRODUCT: {
    subject: 'Consulta por productos',
    message: (products, failIds) => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">A continuación encontrará la información sobre los productos solicitados</p>

        <table style="width:40%;">
          <tr style="padding-bottom: 12px">
            <th align="left">Id</th>
            <th align="left">Nombre</th>
            <th align="left">Id categoría</th>
            <th align="left">Precio</th>
          </tr>
        ${products
          .map(
            product => `
              <tr style="padding-bottom: 12px">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
              </tr>`
          )
          .join('')}
        </table><br />

        ${
          failIds && failIds.length
            ? `
            <p style="font-size:14px;">No se han podido encontrar productos con ids: ${failIds.join(
              ', '
            )}</p>
        `
            : ''
        }<br />

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_PRODUCTS: {
    subject: 'Consulta catálogo',
    message: products => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">A continuación encontrará la información sobre los productos</p>

        <table style="width:40%;">
          <tr style="padding-bottom: 12px">
            <th align="left">Id</th>
            <th align="left">Nombre</th>
            <th align="left">Id categoría</th>
            <th align="left">Precio</th>
          </tr>
        ${products
          .map(
            product => `
              <tr style="padding-bottom: 12px">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
              </tr>`
          )
          .join('')}
        </table><br />

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_PRODUCTS_BY_CATEGORY: {
    subject: 'Consulta por productos por categoría',
    message: (categories, failIds) => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">A continuación encontrará las categorías con sus respectivos productos</p>

      <ul>
      ${categories
        .map(
          category => `
            <li><h4>Categoría ${category.id}</h4></li>
              <ul>
                <li>Contexto: ${category.context}</li>
                <li>Area: ${category.area}</li>
                <li>Grupo: ${category.group}</li>
                <li>
                  ${
                    category.products && category.products.length
                      ? `Productos:
                  <table>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                    </tr>
                  ${category.products
                    .map(
                      product => `
                        <tr>
                          <td>${product.id}</td>
                          <td>${product.name}</td>
                          <td>$${product.price}</td>
                        </tr>`
                    )
                    .join('')}
                  </table>`
                      : 'No tiene productos'
                  }
                </li>
              </ul>`
        )
        .join('<br />')}
      </ul>

      ${
        failIds && failIds.length
          ? `
          <p style="font-size:14px;">No se han podido encontrar categorías con ids: ${failIds.join(
            ', '
          )}</p>
      `
          : ''
      }<br />

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  GET_HELP: {
    subject: 'Ayuda',
    message: `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">La aplicación soporta las siguientes solicitudes, por favor considere la puntuación y acentuación como se indica:</p>

      <ol style="font-size:16px;">
        <li>
          Consultar <b>todos los productos</b>:
          <ul><br />
            <li>Asunto: Catalogo</li>
            <li>Cuerpo: No necesario</li>
          </ul>
        </li><br />
        <li>
          Consultar <b>todas las categorías de productos</b>:
          <ul><br />
            <li>Asunto: Categorias</li>
            <li>Cuerpo: No necesario</li>
          </ul>
        </li><br />
        <li>
          Consultar <b>una categoría</b>:
          <ul><br />
            <li>Asunto: Categoria</li>
            <li>Cuerpo: idCategoria</li>
          </ul>
        </li><br />
        <li>
          Consultar los <b>productos por categoría(s)</b>:
          <ul><br />
            <li>Asunto: Productos por categoria</li>
            <li>Cuerpo: idCategoria1;idCategoria2</li>
          </ul>
        </li><br />
        <li>
          Consultar por <b>producto(s)</b>:
          <ul><br />
            <li>Asunto: Productos</li>
            <li>Cuerpo: idProducto1;idProducto2</li>
          </ul>
        </li><br />
        <li>
          Consultar todos los <b>productos separados por categoría</b>:
          <ul><br />
            <li>Asunto: Catalogo por categoria</li>
            <li>Cuerpo: No necesario</li>
          </ul>
        </li><br />
        <li>
          Consultar su <b>historial de compras</b>:
          <ul><br />
            <li>Asunto: Historial</li>
            <li>Cuerpo: 1 [<i>si desea la más antigua al inicio</i>]</li>
          </ul>
        </li><br />
        <li>
          <b>Comprar producto(s)</b>:
          <ul><br />
            <li>Asunto: Compra</li>
            <li>Cuerpo: idProducto1;idProducto2</li>
          </ul>
        </li>
      </ol>

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  ORDER_RESPONSE_STATUS: {
    subject: 'Confirmar orden de compra',
    message: (products, errors, confirmationUrl) => `
      <h2>Estimado usuario,</h2>

      ${
        (errors.notMedicine && errors.notMedicine.length) ||
        (errors.notBeenBoughtToday && errors.notBeenBoughtToday.length)
          ? `<p style="font-size:15px;">Lamentamos informarle que su solicitud de compra ha sido ${
              products && products.length ? '<b>parcialmente</b>' : ''
            } rechazada por los siguientes motivos:</p>

         <ul>
           ${
             errors.notMedicine && errors.notMedicine.length
               ? `
               <li><p style="font-size:16px;">No se admite la compra de <b>medicamentos</b> por esta vía</p>
                 <table style="width:30%;">
                   <tr style="padding-bottom: 12px">
                     <th align="left">Id</th>
                     <th align="left">Nombre</th>
                     <th align="left">Precio</th>
                   </tr>
                   ${errors.notMedicine
                     .map(
                       product => `
                         <tr style="padding-bottom: 12px">
                           <td>${product.id}</td>
                           <td>${product.name}</td>
                           <td>$${product.price}</td>
                         </tr>`
                     )
                     .join('')}
                 </table>
             </li>`
               : ''
           }<br />
           ${
             errors.notBeenBoughtToday && errors.notBeenBoughtToday.length
               ? `
               <li><p style="font-size:16px;">No se admite la compra de un <b>mismo producto</b> más de dos veces al día</p>
                 <table style="width:30%;">
                   <tr style="padding-bottom: 12px">
                     <th align="left">Id</th>
                     <th align="left">Nombre</th>
                     <th align="left">Precio</th>
                   </tr>
                   ${errors.notBeenBoughtToday
                     .map(
                       product => `
                         <tr style="padding-bottom: 12px">
                           <td>${product.id}</td>
                           <td>${product.name}</td>
                           <td>$${product.price}</td>
                         </tr>`
                     )
                     .join('')}
                 </table>
             </li>`
               : ''
           }
         </ul>
         `
          : ''
      }
      ${
        products && products.length && confirmationUrl
          ? `
          <h3>Los siguientes productos le pueden ser entregados:</h3>

          <table style="width:30%;">
            <tr style="padding-bottom: 12px">
              <th align="left">Id</th>
              <th align="left">Nombre</th>
              <th align="left">Precio</th>
            </tr>
            ${products
              .map(
                product => `
                  <tr style="padding-bottom: 12px">
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>$${product.price}</td>
                  </tr>`
              )
              .join('')}
          </table>

          <p style="font-size:15px;"><strong>Suma total: $${products.reduce(
            (cp, prod) => cp + prod.price,
            0
          )}</strong></p>

          <p style="font-size:16px;">Para confirmar la entrega de estos productos
            haga click <a href="${confirmationUrl}">aquí</a></p>
          `
          : ''
      }

        <h3>Saludos cordiales</h3>
        <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  ORDER_RESPONSE_SUCCESS: {
    subject: 'Orden realizada con éxito',
    message: ({ productId, productName }) => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">Nos contenta informarle que su orden va camino a su domicilio</p>

      <ul>
        <li>
          <p style="font-size:16px;">Producto ${productId}: ${productName}</p>
        </li>
      </ul>

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  STATUS_CODE_404: {
    subject: 'Consulta no resuelta',
    message: (type, id) => `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">No se ha podido encontrar ${type} con id "${
      id
    }"
        <br /><br />¿Está seguro de que se encuentra en el catálogo?</p>

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
  STATUS_CODE_503: {
    subject: 'Servicio deshabilitado temporalmente',
    message: `
      <h2>Estimado usuario,</h2>

      <p style="font-size:16px;">Lo sentimos, el servicio no está disponible en estos momentos.
        <br /><br />Por favor, intente más tarde</p>

      <h3>Saludos cordiales</h3>
      <img src="https://goo.gl/7kFKvT" width="30%">
    `,
  },
}
