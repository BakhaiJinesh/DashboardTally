


-- Insert the data for 2023
INSERT INTO monthly_data (month, year, purchase, sales, inventory_levels, profit, new_customers)
VALUES 
('January', 2023, 500, 800, 300, 500, 50),
('February', 2023, 600, 900, 280, 600, 60),
('March', 2023, 550, 850, 260, 550, 55),
('April', 2023, 700, 1000, 320, 700, 70),
('May', 2023, 750, 1100, 340, 750, 80),
('June', 2023, 800, 1200, 300, 800, 90),
('July', 2023, 850, 1250, 310, 850, 95),
('August', 2023, 900, 1300, 290, 900, 100),
('September', 2023, 950, 1350, 280, 950, 105),
('October', 2023, 1000, 1400, 270, 1000, 110),
('November', 2023, 1050, 1450, 260, 1050, 115),
('December', 2023, 1100, 1500, 250, 1100, 120);



-- Insert a user
INSERT INTO Users (UserName, Email, Password) 
VALUES ('CEO', 'ceo@example.com', 'securepassword'),
('CTO', 'cto@example.com', 'ctosecurepassword'),
('Manager', 'manager@example.com', 'managersecurepassword'),
('USER', 'user@example.com', 'usersecurepassword');

-- Insert transaction types (Purchase and Sale)
INSERT INTO ModuleTransaction (TransactionType, Description) 
VALUES ('Purchase', 'Product purchase transaction'),
       ('Sale', 'Product sale transaction'),
       ('Exhnage', 'Echnage Product transaction'),
       ('Return', 'Return purchase transaction');



-- Insert transaction details for various users and transaction types
INSERT INTO ModuleTransactionDusersusersetails (UserID, TransactionID, TransactionDate, Quantity, Cost, Remarks) 
VALUES 
-- Transactions for CEO
(1, 1, '2023-10-01', 100, 3000.00, 'CEO purchased 100 units of product'),  -- Purchase
(1, 2, '2023-10-05', 20, 800.00, 'CEO sold 20 units of product'),          -- Sale
(1, 3, '2023-10-07', 10, 300.00, 'CEO exchanged 10 units of product'),     -- Exchange
(1, 4, '2023-10-10', 5, 150.00, 'CEO returned 5 units of product'),         -- Return

-- Transactions for CTO
(2, 1, '2023-10-02', 75, 2250.00, 'CTO purchased 75 units of product'),   -- Purchase
(2, 2, '2023-10-06', 30, 1200.00, 'CTO sold 30 units of product'),         -- Sale
(2, 3, '2023-10-08', 5, 150.00, 'CTO exchanged 5 units of product'),       -- Exchange
(2, 4, '2023-10-11', 2, 60.00, 'CTO returned 2 units of product'),         -- Return

-- Transactions for Manager
(3, 1, '2023-10-03', 50, 1500.00, 'Manager purchased 50 units of product'), -- Purchase
(3, 2, '2023-10-07', 25, 1000.00, 'Manager sold 25 units of product'),       -- Sale
(3, 3, '2023-10-09', 15, 450.00, 'Manager exchanged 15 units of product'),   -- Exchange
(3, 4, '2023-10-12', 10, 300.00, 'Manager returned 10 units of product'),     -- Return

-- Transactions for User
(4, 1, '2023-10-04', 10, 300.00, 'User purchased 10 units of product'),      -- Purchase
(4, 2, '2023-10-08', 5, 200.00, 'User sold 5 units of product'),              -- Sale
(4, 3, '2023-10-10', 3, 90.00, 'User exchanged 3 units of product'),         -- Exchange
(4, 4, '2023-10-12', 1, 30.00, 'User returned 1 unit of product');           -- Return
