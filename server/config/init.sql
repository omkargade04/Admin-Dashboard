CREATE TABLE users (
	`id` SERIAL PRIMARY KEY NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL
)

CREATE TABLE admin(
	`id` SERIAL PRIMARY KEY NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL
);

CREATE TABLE admin_token (
    `id` SERIAL PRIMARY KEY,
    `token` VARCHAR(500) NOT NULL
);

CREATE TABLE user_token (
    `id` SERIAL PRIMARY KEY,
    `token` VARCHAR(500) NOT NULL
);