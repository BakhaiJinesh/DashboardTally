
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
