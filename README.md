# Order Service APP with Express.js

This is an app for order service APIs. There are three main APIs including "Place order", "Take order" and "Order list".

## Configuration

- Get the Google Map API key with "Distance Matrix API" enabled from the Goggle Cloud Plaform (https://console.cloud.google.com/)
- Setup the GOOGLE_MAPS_API_KEY in the app/.env.production and app/.env.test files as following

```
GOOGLE_MAPS_API_KEY="AIzaSyBdddA2l65VVkeGe4cV3BuiExxxxxxxxxx"
```

## File structure of main application (/app)

- common - Common components / classes used in the application
- components - Components that not access database
- middlewares - Middlewares for the HTTP request and response
- models - Components that access database
- routes - Routes for application API endpoints
- services - Services for application to implement business logic
- validators - Validators to validate the request body
- tests - Test files with unit test and integration test using Jest (https://jestjs.io/)
- index.js - Entry point of the main application

## Start the application

Run the application on the machine with Docker install

- With shell script supported in port 8080

```
sudo sh start.sh
```

- Without shell script supported in port 8080

```
docker-compose up --build
```

## Application testing

- Application testing will be executed in port 8888
- Run following command to start unit and integration test

```
docker exec -it order_service_app npm test
```
