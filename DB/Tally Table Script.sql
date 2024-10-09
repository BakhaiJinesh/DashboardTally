DROP DATABASE IF EXISTS accounting;
CREATE DATABASE accounting;
USE accounting;


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


CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY, -- Auto-incremented unique identifier for each user
    UserName VARCHAR(100) NOT NULL, -- Name of the user
    Email VARCHAR(150) UNIQUE NOT NULL, -- Email of the user
    Password VARCHAR(255) NOT NULL, -- Password for authentication
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the user was created
);


CREATE TABLE ModuleTransaction (
    TransactionID SERIAL PRIMARY KEY, -- Unique identifier for each transaction type
    TransactionType VARCHAR(50) NOT NULL, -- Type of transaction (Purchase, Sale, etc.)
    Description TEXT -- Optional description about the transaction type
);


CREATE TABLE ModuleTransactionDusersusersetails (
    TransactionDetailID SERIAL PRIMARY KEY, -- Unique identifier for each transaction detail
    UserID INT REFERENCES Users(UserID), -- User who performed the transaction
    TransactionID INT REFERENCES ModuleTransaction(TransactionID), -- Transaction type (Purchase, Sale, etc.)
    TransactionDate DATE NOT NULL, -- Date the transaction took place
    Quantity INT NOT NULL, -- Quantity involved in the transaction
    Cost DECIMAL(10, 2) NOT NULL, -- Cost of the transaction
    Remarks TEXT, -- Optional remarks or notes on the transaction
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the transaction detail was recorded
);
