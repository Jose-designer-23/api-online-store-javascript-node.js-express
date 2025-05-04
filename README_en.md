
# api-online-store-javascript-node.js-express
## Description
Backend (API) for an online store developed with JavaScript, using the Node.js and Express frameworks. It currently provides RESTful endpoints for managing products, users, and orders.

## Prerequisites
* [Latest stable version of Node.js](https://nodejs.org/)
* npm (comes installed with Node.js) or yarn
* [MongoDB Atlas](https://www.mongodb.com/atlas/database) account (for the cloud database)

## Database Configuration (MongoDB Atlas)

To connect the API to your MongoDB Atlas cloud database, follow these steps:

1.  **Create an account on MongoDB Atlas:**
    * Go to [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database) and sign up or log in if you already have an account.

2.  **Create a new cluster:**
    * Once inside your Atlas dashboard, click the "Create" or "New Cluster" button.
    * Follow the steps to configure your cluster. You can choose the cloud provider, region, and cluster tier (for testing, the free "M0 Sandbox" tier is usually sufficient).

3.  **Create a database user:**
    * In the left-hand menu, select "Database Access".
    * Click "Add New Database User".
    * Choose a secure username and password. Select the necessary roles (to start, "Read and write to any database" might be sufficient, but for production consider more specific roles). Note these credentials, you will need them for the connection URI.

4.  **Configure network access (IP Whitelisting):**
    * In the left-hand menu, select "Network Access".
    * Click "Add IP Address".
    * For local development, you can add your current IP address or allow access from any address (0.0.0.0/0), **but be very careful with this last option in production environments for security reasons.** It is better to limit access to the IPs of your servers.

5.  **Obtain the connection URI:**
    * In the "Overview" section of your cluster, click the "Connect" button.
    * Select "Connect your application".
    * Choose the "Node.js" driver and version.
    * Copy the connection URI provided to you. **Replace `<your_username>` with the username you created in step 3 and `<your_password>` with its password.** Also, make sure the database name at the end of the URI is the one you want to use for your API. Example:
        ```
        mongodb+srv://<your_username>:<your_password>@<your-cluster>.mongodb.net/<your_database_name>?retryWrites=true&w=majority
        ```

6.  **Configure the environment variable in `.env`:**
    * When you create the project structure that I will tell you later, create a `.env` file in the root of your project (if you haven't already).
    * Define the port you are going to use, the `MONGODB_URI` environment variable with the connection URI you obtained, and your database name with `MONGODBNAME`. You must have this configuration, otherwise the API will not work.
        ```
       PORT=The port you are using.
        ```
        ```
        MONGODB_URI=mongodb+srv://<your_username>:<your_password>@<your-cluster>.mongodb.net/<your_database_name>?retryWrites=true&w=majority
        ```
      ```
        MONGODBNAME=Your database name
      ```

        **Remember to never upload your `.env` file to your GitHub repository for security reasons.** Add `.env` to your `.gitignore` file.

Now your API should be able to connect to your database in MongoDB Atlas!

## Dependency Installation

Run the following command in the root of the project to install the dependencies:

```bash
npm install
# or
yarn install
```
## API Execution

Use the following command to start the API server:

```bash
npm start
# or
yarn start
# or if you use nodemon for development
npm run dev
yarn dev
```

The server will run on `http://localhost:3000` (this port may vary depending on your configuration).

## Project Structure and Module Functionalities
The backend API structure is as follows:
```
Project
├── node_modules/
├── src/
│   ├── Common/
│   │   └── response.js        # Functions or classes to handle API responses (e.g., success and error formats)
│   ├── Config/
│   │   └── index.js           # Application configuration files.
│   ├── Database/
│   │   └── index.js           # Database configuration and connection (MongoDB Atlas in this case)
│   ├── Index/
│   │   └── index.js           # Entry point for the home menu and error for not finding the route.
│   ├── Products/
│   │   ├── controller.js      # Logic to handle requests related to products.
│   │   ├── index.js           # Entry point for the products module.
│   │   ├── services.js        # Specific business logic for products.
│   │   └── utils.js           # Utility functions specific to the products module.
│   ├── Sales/
│   │   ├── controller.js      # Logic to handle requests related to sales/orders.
│   │   ├── index.js           # Entry point for the sales module.
│   │   └── services.js        # Specific business logic for sales/orders.
│   └── Users/
│       ├── controller.js      # Logic to handle requests related to users.
│       ├── index.js           # Entry point for the users module.
│       └── services.js        # Specific business logic for users.
├── .env                       # File for environment variables (MongoDB URI, secrets, etc.) - **Do not upload to Git**
├── .gitignore                 # Specifies files and folders that Git should ignore.
├── index.js                   # Main entry point of the application (where the Express server starts)
├── package-lock.json          # Records the exact versions of the installed dependencies.
├── package.json               # Project configuration file (name, dependencies, scripts).
└── testConnection.js          # File to test the database connection (can be for development).

```
* **Users Module:**
    * User creation
    * Listing existing users
    * Obtaining details of a specific user
    * Updating user data
    * User deletion
* **Products Module:**
    * Creating new products
    * Listing existing products
    * Obtaining details of a specific product
    * Updating product information
    * Deleting products
* **Sales (Orders) Module:**
    * Creating new orders
    * Listing the total of orders placed
    * Obtaining details of a specific order
    * Updating and deleting sales with inventory management: Sales can be updated (adding or removing products) or deleted, which will automatically adjust the available stock of the affected products.

## API Endpoints (Examples)
### Users Endpoints
* `GET /api/users`: List of existing users.
* `GET /api/users/:id`: Obtaining details of a specific user.
* `POST /api/users`: User creation.
* `PUT /api/users/:id`: Updating user data.
* `DELETE /api/users/:id`: User deletion.

### Products Endpoints
* `GET /api/products`: List of existing products.
* `GET /api/users/:id`: Obtaining details of a specific product.
* `POST /api/users`: Product creation.
* `PUT /api/users/:id`: Updating product data.
* `DELETE /api/users/:id`: Product deletion.

### Sales (Orders) Endpoints
* `GET /api/sales`: List of existing sales.
* `GET /api/users/:id`: Obtaining details of a specific sale.
* `POST /api/users`: Sale creation.
* `PUT /api/users/:id`: Updating sale data.
* `DELETE /api/users/:id`: Sale deletion.

## Technologies Used
* JavaScript
* Node.js
* Express
* MongoDB

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author (Optional)
José Ángel Martín González - [@Jose-designer-23](https://github.com/Jose-designer-23)
```
