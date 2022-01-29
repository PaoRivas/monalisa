CREATE DATABASE monalisa_init;

USE monalisa_init;

CREATE TABLE business (
  id int(11) NOT NULL,
  business_name varchar(100) NOT NULL,
  bd_name varchar(25) NOT NULL,
  created timestamp NOT NULL DEFAULT current_timestamp
);

--
-- Indices de la tabla `Empresas`
--
ALTER TABLE business
  ADD PRIMARY KEY (id);

ALTER TABLE business
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

CREATE TABLE users (
  id int(11) NOT NULL,
  username varchar(100) NOT NULL,
  control_code varchar(45) NOT NULL,
  created timestamp NOT NULL DEFAULT current_timestamp,
);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

CREATE TABLE access (
  id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  business_id int(11) NOT NULL,
  created timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES business(id),
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

--
-- Indices de la tabla `Accesos`
--
ALTER TABLE access
  ADD PRIMARY KEY (id),
 -- ADD KEY business_access (business_id),
  --ADD KEY user_access (user_id) USING BTREE;

ALTER TABLE access
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- DESCRIBE `Usuarios` ve la estructura de la tabla
--