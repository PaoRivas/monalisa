CREATE TABLE business (
  id INT NOT NULL PRIMARY KEY,
  business_name varchar(100) NOT NULL,
  bd_name varchar(25) NOT NULL,
  created DATETIME NOT NULL DEFAULT current_timestamp
);

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  username varchar(100) NOT NULL,
  control_code varchar(45) NOT NULL,
  created DATETIME NOT NULL DEFAULT current_timestamp,
);

CREATE TABLE access (
  id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  business_id INT NOT NULL,
  created DATETIME NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES business(id),
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);