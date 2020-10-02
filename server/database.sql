CREATE DATABASE jwtauthtodo;

--users
CREATE TABLE users
(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

--todos
CREATE TABLE todos
(
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--fake users data
insert into users
    (user_name, user_email, user_password)
values
    ('discky', 'discky@gmail.com', '12345');
insert into users
    (user_name, user_email, user_password)
values
    ('jacob', 'jacob@gmail.com', '321321');

--fake todos data
insert into todos
    (user_id, description)
values
    ('4068a3d1-82bb-4d40-8775-69dd93366517', 'Eating hotdog');

--show discky relation with todos data
select *
from users INNER JOIN todos ON users.user_id = todos.user_id;

--show discky relation with todos data and show jacob who doesn't have relation with todos data
select *
from users LEFT JOIN todos ON users.user_id = todos.user_id;
