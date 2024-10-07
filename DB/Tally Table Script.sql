DROP DATABASE IF EXISTS accounting;
CREATE DATABASE accounting;

USE accounting;

-- Companies Table
CREATE TABLE Companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    contact_number VARCHAR(20),
    email VARCHAR(100)
);

-- Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    role ENUM('Admin', 'User') NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id) ON DELETE CASCADE
);

-- Accounts Table
CREATE TABLE Accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    account_name VARCHAR(100) NOT NULL,
    account_type ENUM('Asset', 'Liability', 'Income', 'Expense') NOT NULL,
    opening_balance DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id) ON DELETE CASCADE
);

-- Transactions Table
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    transaction_date DATE NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type ENUM('Credit', 'Debit') NOT NULL,
    account_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE SET NULL
);

-- Invoices Table
CREATE TABLE Invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Paid', 'Unpaid') NOT NULL,
    transaction_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id) ON DELETE SET NULL
);

-- Inventory Table
CREATE TABLE Inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    product_name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    quantity INT DEFAULT 0,
    purchase_price DECIMAL(10, 2) NOT NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    payment_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method ENUM('Cash', 'Credit Card', 'Bank Transfer') NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES Invoices(invoice_id) ON DELETE CASCADE
);

CREATE TABLE monthly_data (
    id SERIAL PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    purchase DECIMAL(10, 2),
    sales DECIMAL(10, 2),
    inventory_levels DECIMAL(10, 2),
    profit DECIMAL(10, 2),
    new_customers INT
);