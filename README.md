# e-commerce-cms

#### API Demo:https://server-e-commerce-cms.herokuapp.com/
#### APP Demo :https://e-commerce-cms.web.app
> Demo User => email: malik@mail.com  |   password:123

&nbsp;

Content Management System for E-Commerce (Admin User)
* RESTful endpoint for product's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <your name>,
  "email": <your email>,
  "password": <your password>
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
  "id": <id>,
  "name": <your name>,
  "email": <your email >,
  "password": <your encrypted password>,
  "updatedAt": <date>,
  "createdAt": <date>
}
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
  "message": <detail message>
]
```

_Response (409 - conflict)_
```
{
  "message": "Email Already registered!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /login

> Process Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": <your email>,
  "password": <your password>
}
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "access_token": <your access token>
}
```

#### Error Response: ####

_Response (400 - Bad Request)_
```
[
  "message": <detail message>
]
```

_Response (404 - Not Found)_
```
{
  "message": "user not registered!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /products

> Create new product

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
{
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
},
```

#### Success Response: ####
_Response (201 - Created)_
```
{
  "id": <product id>,
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
  "UserId": <UserId>
},
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
  "message": <message detail>
]
```
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /products

> Get User's products

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
[
  {
    "id": <product id>,
    "name": <product name>,
    "description": <product description>,
    "category": <product category>,
    "price": <product price>,
    "stock": <product stock>,
    "image_url": <product image>,
    "UserId": <UserId>
  },
  {
    "id": <product id>,
    "name": <product name>,
    "description": <product description>,
    "category": <product category>,
    "price": <product price>,
    "stock": <product stock>,
    "image_url": <product image>,
    "UserId": <UserId>
  },
]
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /products/:id

> Get product by product's id

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "id": <product id>,
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
  "UserId": <UserId>
},
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "product not found! "
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### PUT /products/:id

> Update product

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
{
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
},
```

#### Success Response: ####
_Response (200 - OK)_
```
{
  "id": <product id>,
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
  "UserId": <UserId>
},
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "product not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```



### DELETE /products/:id

> Update product

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "id": <product id>,
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
  "UserId": <UserId>
}
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "product not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
