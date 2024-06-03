# Huella Horaria Client(Frontend in React)

This is my final project for my higher education in Web Application Development,
made using React on the client side. Its primary function is to enable workers
to clock in and out. To achieve this, I used several libraries such as Moment.js
and Moment Timezone for proficient handling of date and time. Additionally,
Axios was utilized for facilitating the retrieval and transmission of data to
the backend. Furthermore, I incorporated the navigator API to track the location,
providing HR with the ability to monitor employee presence in the office.

You can explore the corresponding [back-end repository here](https://github.com/motisaa/huella-horaria-server)

## Huella Horaria - Local Configuration and Execution Guide

This guide provides detailed instructions for setting up and running the
Huella Horaria application on your local machine. It covers the installation
of necessary dependencies for both the client and server, configuration of the
database, setting up environment variables, and steps to run both the backend
and frontend applications.

## 1: Client Dependencies Installation

1. Open a terminal in the `huella-horaria-client` directory.
2. Run the following command to install the dependencies::

   ``` bash
   npm i
   ```

## 2: Server Dependencies Installation

1. Open a terminal in the `huella-horaria-server` directory.
2. Run the following command to install the dependencies:

   ``` bash
   npm i
   ```

## 3: Database Configuration

1. In the `huella-horaria-server/sql` directory, there is a file named `tablas.sql`.
2. This file contains the instructions to create the database and the necessary tables in MySQL.
3. You need to import and execute the script in the MySQL application.

## 4: Environment Variables Configuration

1. In the `.env` file inside the `huella-horaria-server`, folder,
specify the MySQL connection data.
2. Enter the correct values for the corresponding environment variables.

## 5: Run the Backend Application in Node

Run the following command in the `huella-horaria-server` directory:

``` bash
   nodemon server.js 
   ```

## 6: Run the Frontend Application in React

Run the following command in the `huella-horaria-client` directory:

``` bash
   npm start
   ```
