# Food Ordering System

This is a web application for ordering food from a restaurant. Users can browse the menu, add items to their cart, and place orders. The application is built using React for the frontend and Node.js with Express for the backend.

## Features

- Browse the menu: Users can view the available dishes on the menu.
- Add to cart: Users can add items to their cart for ordering.
- Place an order: Users can place orders for the selected items in their cart.
- Order summary: After placing an order, users can view the order summary, including the list of dishes, total amount, and delivery time.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sainRaghuveer/Online-Food-Ordering-System.git
```
2. Install all dependencies in both directories client and server

```bash
cd backend 
npm install

cd frontend 
npm install
```

3. Set up the backend:

 - Rename the .env.example file to .env.
 - Configure the environment variables in the .env file, including the database connection details and any other necessary configurations.

4. Set up the frontend:

 - Open the frontend/src/config.js file.
 - Update the API_URL variable with the appropriate URL for your backend server.
 - Start the application:

- Start the backend server:

```bash
npm run server

```
- Start the frontend development server:

```bash
npm start

```

Note:
- Before doing anything first create `.env` file and put `port` , `mongoURl`.> 
- `port` is for listening the server.>
- `mongoURl` is for running database and store your data in database so put your mongo link.>

The application will be accessible at http://localhost:3000.

## Folder Structure
 - /backend: Contains the server-side code.

## Endpoints

<table>
    <thead>
        <tr>
            <th>METHOD</th>
            <th>ENDPOINT</th>
            <th>DESCRIPTION</th>
            <th>STATUS CODE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/api/register</td>
            <td>This endpoint should allow users to register.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/login</td>
            <td>This endpoint should allow users to login.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/dish</td>
            <td>This endpoint should allow users to view the all dished present in database.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/dish</td>
            <td>This endpoint should allow users Admin to post new dish.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/order</td>
            <td>This endpoint should allow users to post order.</td>
            <td>200</td>
        <tr>
            <td>POST</td>
            <td>/api/cart</td>
            <td>This endpoint should allow users to add food in cart.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/cart</td>
            <td>This endpoint should allow getting all cart data.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/cart</td>
            <td>This endpoint should allow users delete cart data</td>
            <td>200</td>
        </tr>
        </tr>
    </tbody>
</table>

<br>

<a href="">Backend deployed link</a>

<br>

 - /frontend: Contains the client-side code.

<br>

<a href="">Frontend deployed link</a>

## Technologies Used
 - Frontend: React.js, Chakra UI
 - Backend: Node.js, Express
 - Database: MongoDB

