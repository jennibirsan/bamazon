DROP database if exists bamazon;
CREATE database bamazon;
USE bamazon;

create table products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2353, "chapstick", "beauty", 2.00, 1000), 
(23784,"nail polish remover", "beauty", 3.00, 500), 
(23982,"eye cream", "beauty", 25.00, 100), 
(23201,"bronzer", "beauty", 15.00, 200), 
(78321,"spatula", "kitchen", 10.00, 4000), 
(78896,"potato peeler", "kitchen", 7.00, 1000), 
(78547,"dish soap", "kitchen", 3.50, 2500), 
(42567,"teddy bear", "toys", 9.95, 1200), 
(42089,"hot wheels 6-pack", "toys", 12.00, 1475), 
(16735,"mouth wash", "toiletries", 5.25, 600);

