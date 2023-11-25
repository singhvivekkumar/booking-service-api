# Booking Service Api




### Setup database or sequelize orm
	-Install or and setup the mysql db connection by configuration of config file
	```npn i sequelize```

	-In config.js file
	```
		"username": "root",
    	"password": "<password>",
    	"database": "<database_name>",
	```

	-Create migration and model files for database by running ORM command
	`npx sequelize model:generate --name <table_name> --attributes emails:string,password:string`

	-Now migrate the and sync with database by this command 
	`nox sequelize `

	
## Environment Setup:

### Prerequisites:

**Please note: You make sure that all the service working properly before initialize `API Gateway`.

1. Clone the repository:

   ```shell
   git clone https://github.com/singhvivekkumar/api-gateway.git
   ```

2. Move to the backend folder:

   ```shell
   cd api-gateway
   ```

3. Install all package.

	```shell
   npm install
   ```
### Create Database

Create Database with the following command:

```shell
npx sequelize db:create
```

### Run Migrations:

Run database migrations with the following command:

```shell
npx sequelize db:migrate
```

### Create a `.env` file in the project's root directory.

The `.env` file should contain the following environment variables:

```shell
PORT=3004
JWT_KEY=auth
API_DATEWAY='http://localhost:3008'
```

### Start the Backend Server:

To start the backend server, run the following command:

```shell
npm start
```

## REST API

### Request to test api gateway

`GET http://localhost:3005/api/home`

### Response
{
  "message": "successfully hitted api gateway"
}

### Request to signup in airline

POST: `http://localhost:3005/auth/api/v1/signup``
body: `{
		email: test@gamil.com,
		password: 13245768
	}`


### Response to signin in airline

    HTTP/1.1 201 Ok
    Status: 404 Not Found
    Connection: keep-alive
    Content-Type: application/json

    {
    	"data": {
			"id": 8,
			"email": "<EMAIL_ID>",
			"password": "<ENCRYPTED_PASSWORD>",
			"updatedAt": "2023-11-24T18:27:28.189Z",
			"createdAt": "2023-11-24T18:27:28.189Z"
		},
    	"success": true,
    	"message": "Successfully user signed in website",
    	"err": {}
	}

### Request to signup in airline

`POST http://localhost:3005/auth/api/v1/signin
body: {
	email: test@gamil.com,
	password: 13245768
}
`

### Response to signin in airline

    HTTP/1.1 201 Ok
    Status: 404 Not Found
    Connection: keep-alive
    Content-Type: application/json

    {
    	"data": <JWT_TOKEN>,
    	"success": true,
    	"message": "Successfully user signed in website",
    	"err": {}
	}


Congratulations! Your backend is now running at http://localhost:3005/.