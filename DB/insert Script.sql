USE accounting;

-- User Access Level
INSERT INTO AccessLevel (AccessID, Code, Name, Description) VALUES
(1, 'CEO', 'Chief Executive Officer', 'Highest level of access and authority.'),
(2, 'CTO', 'Chief Technology Officer', 'Responsible for technology and technical direction.'),
(3, 'MGR', 'Manager', 'Oversees teams and projects with medium access.'),
(4, 'USR', 'User', 'Standard access for regular users.');


-- Insert a user
INSERT INTO Users (UserName, Email, Password,DesignationId) 
VALUES ('user1', 'ceo@example.com', 'ceo',1),
('user2', 'cto@example.com', 'cto',2),
('user3', 'manager@example.com', 'man',3),
('user4', 'user@example.com', 'use',4);

-- Insert transaction types (Purchase and Sale)
INSERT INTO ModuleTransaction (TransactionType, Description) 
VALUES ('Purchase', 'Product purchase transaction'),
       ('Sale', 'Product sale transaction'),
       ('Exchange', 'Exchange Product transaction'),
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
