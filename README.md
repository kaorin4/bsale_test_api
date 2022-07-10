# BSALE Test API

API desarrollada con Nodejs y Express. Actualmente se encuentra desplegada en https://bsaletestapikmura.herokuapp.com

El API cuenta con dos endpoints:

- /api/categories: Listado de categorías
- /api/products: Listado de productos

### GET lista de categorias

- GET /api/categories retorna un JSON con lista de categorías

**Respuesta**
- La lista de categorías se obtiene en response.data, el cual es un arreglo donde cada elemento contiene el id y nombre de la categoría.

```
{
    "status": "success",
    "totalCount": 7,
    "data": [
        {
            "id": 1,
            "name": "bebida energetica"
        },
        {
            "id": 2,
            "name": "pisco"
        },
        {
            "id": 3,
            "name": "ron"
        },
        {
            "id": 4,
            "name": "bebida"
        },
        {
            "id": 5,
            "name": "snack"
        },
        {
            "id": 6,
            "name": "cerveza"
        },
        {
            "id": 7,
            "name": "vodka"
        }
    ]
}
```

### GET lista de products

- GET /api/products retorna un JSON con lista de productos

**Parámetros**

- *name*: permite buscar productos cuyo nombre contengan cierto término.
- *category*: permite filtrar por id de categoria.
- *orderField*: campo para ordernar. Por default es "name" (nombre del producto).
- *orderType*: orden ascendente or descendente. Por default es "ASC" (orden ascendente). Solo hay "ASC" o "DESC".
- *limit*: limita la cantidad de items de la respuesta. Por default es 20, el máximo es 50.
- *offset*: paginación de items. Por default es 0.

**Output**
- *totalCount*: total de productos.
- *totalReturned*: total de la respuesta, basado en el límite. Por default retorna hasta 20 elementos.
- *data*: Lista de productos
- *pagination.page*: Página actual de la paginación
- *pagination.prevPage*: Incluye offset de la página anterior
- *pagination.nextPage*: Incluye offset de la página siguiente
- *pagination.numberOFPages*: Total de páginas
- *pagination.limit*: Limite utilizado

**Ejemplos**

- GET /api/products
- GET /api/products?category=1&name=monst
- GET /api/products?orderField=price&orderType=ASC&category=5
- GET /api/products?offset=20&limit=20

**Respuesta**

- GET /api/products?category=1&name=monst
```
{
    "status": "success",
    "totalCount": 4,
    "totalReturned": 4,
    "data": [
        {
            "id": 34,
            "name": "ENERGETICA MONSTER RIPPER",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mosterriper0436.jpg",
            "price": 1990,
            "discount": 0,
            "category": 1
        },
        {
            "id": 77,
            "name": "ENERGETICA MONSTER RIPPER",
            "url_image": "",
            "price": 1990,
            "discount": 0,
            "category": 1
        },
        {
            "id": 36,
            "name": "ENERGETICA MONSTER VERDE",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/monsterverde0476.jpg",
            "price": 1990,
            "discount": 0,
            "category": 1
        },
        {
            "id": 79,
            "name": "ENERGETICA MONSTER VERDE",
            "url_image": "",
            "price": 1990,
            "discount": 0,
            "category": 1
        }
    ],
    "pagination": {
        "page": 1,
        "prevPage": null,
        "nextPage": null,
        "limit": 20,
        "numberOfPages": 1
    }
}
``` 
- GET /api/products?orderField=price&orderType=ASC&category=5
```
{
    "status": "success",
    "totalCount": 5,
    "totalReturned": 5,
    "data": [
        {
            "id": 53,
            "name": "Mani Sin Sal",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisinsalmp6988.jpg",
            "price": 500,
            "discount": 0,
            "category": 5
        },
        {
            "id": 55,
            "name": "Papas Fritas Bolsa Pequeña",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/papaslisas7271.jpg",
            "price": 500,
            "discount": 0,
            "category": 5
        },
        {
            "id": 47,
            "name": "Maní salado",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisaladomp4415.jpg",
            "price": 600,
            "discount": 0,
            "category": 5
        },
        {
            "id": 54,
            "name": "Papas Fritas Lisas Bolsa Grande",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/papaslisasgrande7128.jpg",
            "price": 1490,
            "discount": 0,
            "category": 5
        },
        {
            "id": 56,
            "name": "Papas Fritas Tarro",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/78028005335657432.jpg",
            "price": 1990,
            "discount": 0,
            "category": 5
        }
    ],
    "pagination": {
        "page": 1,
        "prevPage": null,
        "nextPage": null,
        "limit": 20,
        "numberOfPages": 1
    }
}
```