# Product GraphQL API (NestJS)

## About

This project, "Product GraphQL API," is a NestJS/MongoDB GraphQL API focused on e-commerce and inventory management. It's designed to handle various user roles, manage products effectively, and provide real-time updates on inventory.

## Features

- **User Authentication**: Support for various user roles like admin, manager, and customer, with secure login and registration processes.
- **Product Management**: Robust handling of product details including name, SKU, pricing, and categories.
- **Inventory Tracking**: Real-time updates and tracking of inventory across multiple locations.
- **GraphQL Playground**: Easy testing and interaction with the API via the Apollo Server playground.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- A code editor like Visual Studio Code

### Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/iamtalwinder/product-graphql-api-nestjs.git
   ```

2. **Install Dependencies**

   Navigate to the project directory and run:

   ```
   npm install
   ```

3. **Set Up Environment Variables**

   Rename `env.dist` to `.env` and update the variables as per your environment.

4. **Start the Server**

   - For development:
     ```
     npm run start:dev
     ```
   - For production:
     ```
     npm run start:prod
     ```

### Usage

Access the GraphQL playground at `http://localhost:3000/product` to interact with the API. The playground page includes comprehensive documentation for all available queries and mutations.

## Scripts

- `build`: Compile the project.
- `format`: Format code using Prettier.
- `start`: Start the server.
- `start:dev`: Start the server in development mode with hot reload.
- `start:debug`: Start the server in debug mode.
- `lint`: Lint the codebase.

Sure, here's a "Run with Docker" section that you can add to your README file:

---

## Run with Docker

Easily set up and run the application using Docker.

### Prerequisites

- Docker installed on your machine.

### Steps

1. **Clone the Repository**
   
   If you haven't already, clone the project repository:
   ```bash
   git clone https://github.com/iamtalwinder/product-graphql-api-nestjs.git
   ```

2. **Navigate to Project Directory**

   Change to the project directory:
   ```bash
   cd product-graphql-api-nestjs
   ```

3. **Build and Run with Docker Compose**

   Use Docker Compose to build and run the application and MongoDB services:
   ```bash
   docker-compose up --build
   ```
   This command builds the Docker image and starts the containers. The `--build` flag ensures that the Docker image is rebuilt with the latest changes.

4. **Access the Application**

   The application will be accessible at `http://localhost:3000/product`.

5. **Stopping the Containers**

   To stop the application, use the following command in the terminal:
   ```bash
   docker-compose down
   ```
   This command stops and removes the containers and network created by `docker-compose`.


## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/iamtalwinder/product-graphql-api-nestjs/issues) for open issues or create a new one.

## License

This project is [UNLICENSED](https://github.com/iamtalwinder/product-graphql-api-nestjs/blob/main/LICENSE).
