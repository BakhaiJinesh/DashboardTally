
-- Dummy Data for Companies Table
INSERT INTO Companies (company_name, address, contact_number, email) VALUES
('Tech Solutions', '123 Tech Road, Silicon Valley, CA', '555-1234', 'info@techsolutions.com'),
('Green Grocers', '456 Green Ave, Farmtown, TX', '555-5678', 'contact@greengrocers.com');

-- Dummy Data for Users Table
INSERT INTO Users (company_id, username, password, role) VALUES
(1, 'admin', 'hashed_password_1', 'Admin'),
(1, 'user1', 'hashed_password_2', 'User'),
(2, 'user2', 'hashed_password_3', 'User');

-- Dummy Data for Accounts Table
INSERT INTO Accounts (company_id, account_name, account_type, opening_balance) VALUES
(1, 'Cash', 'Asset', 5000.00),
(1, 'Accounts Receivable', 'Asset', 2000.00),
(2, 'Inventory', 'Asset', 10000.00),
(2, 'Accounts Payable', 'Liability', 3000.00);

-- Dummy Data for Transactions Table
INSERT INTO Transactions (user_id, transaction_date, description, amount, transaction_type, account_id) VALUES
(1, '2024-01-10', 'Sale of products', 1500.00, 'Credit', 2),
(1, '2024-01-15', 'Purchase of office supplies', 200.00, 'Debit', 1),
(2, '2024-01-20', 'Payment from customer', 3000.00, 'Credit', 1);

-- Dummy Data for Invoices Table
INSERT INTO Invoices (user_id, invoice_date, due_date, total_amount, status, transaction_id) VALUES
(1, '2024-01-05', '2024-01-12', 1500.00, 'Unpaid', 1),
(2, '2024-01-15', '2024-01-22', 3000.00, 'Paid', 3);

-- Dummy Data for Inventory Table
INSERT INTO Inventory (company_id, product_name, sku, quantity, purchase_price, selling_price) VALUES
(1, 'Laptop', 'SKU001', 10, 700.00, 900.00),
(1, 'Mouse', 'SKU002', 50, 10.00, 15.00),
(2, 'Apples', 'SKU003', 200, 0.50, 1.00),
(2, 'Bananas', 'SKU004', 150, 0.30, 0.50);

-- First valid payment
INSERT INTO `accounting`.`payments` (`invoice_id`, `payment_date`, `amount`, `method`) VALUES
(1, '2024-01-22', 23027, 'Bank Transfer'),
(1, '2024-01-23', 1500, 'Cash'),
(2, '2024-01-22', 23027, 'Bank Transfer'),
(2, '2024-01-23', 1500, 'Cash');


- Insert the data for 2023
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
