# e-commerce-cms
Content Management System for E-Commerce
* RESTful endpoint for task's CRUD operation
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
  "name": "<your name>",
  "email": "<your email>",
  "password": "<your password>"
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
  "id": 6,
  "name": "<your name>",
  "email": "<your email >",
  "password": "<your encrypted password>",
  "updatedAt": "2020-04-06T15:41:15.278Z",
  "createdAt": "2020-04-06T15:41:15.278Z"
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
  "email": "<your email>",
  "password": "<your password>"
}
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "access_token": "<your access token>"
}
```

#### Error Response: ####

_Response (400 - Bad Request)_
```
[
  "message": "<detail message>"
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

### POST /tasks

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product name>",
  "description": "<product description>",
  "category": "<product category>",
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
  "name": "<product name>",
  "description": "<product description>",
  "category": "<product category>",
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

### GET /tasks

> Get User's tasks

_Request Header_
```
{
  "access_token": "<your access token>"
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
    "name": "<product name>",
    "description": "<product description>",
    "category": "<product category>",
    "price": <product price>,
    "stock": <product stock>,
    "image_url": <product image>,
    "UserId": <UserId>
  },
  {
    "id": <product id>,
    "name": "<product name>",
    "description": "<product description>",
    "category": "<product category>",
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

### GET /tasks/:id

> Get task by task's id

_Request Header_
```
{
  "access_token": "<your access token>"
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
  "name": "<product name>",
  "description": "<product description>",
  "category": "<product category>",
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
  "message": "task not found! "
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### PUT /tasks/:id

> Update task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product name>",
  "description": "<product description>",
  "category": "<product category>",
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
  "name": "<product name>",
  "description": "<product description>",
  "category": "<product category>",
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
  "message": "task not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```



### DELETE /tasks/:id

> Update task

_Request Header_
```
{
  "access_token": "<your access token>"
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
  "name": "<product name>",
  "description": "<product description>",
  "category": "<product category>",
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
  "message": "task not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
