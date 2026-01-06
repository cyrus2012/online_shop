Create DATABASE online_ship;

/* create manager table to store user info*/
CREATE TABLE manager(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id int NOT NULL,
    mobile int,
    email varchar(255),
    state int NOT NULL
);

/* Create role table */
CREATE TABLE role(  
    role_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    permission_ids varchar(512) NOT NULL,
    permission_ca text,
    role_desc text
);

CREATE TABLE permission(  
    permission_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    permission_name VARCHAR(255) NOT NULL,
    permission_pid int NOT NULL,
    permission_control varchar(128) NOT NULL,
    permission_action varchar(128) NOT NULL,
    permission_level int NOT NULL
);

CREATE TABLE permission_api(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    permission_id int NOT NULL,
    api_service VARCHAR(255),
    api_action VARCHAR(255),
    api_path varchar(255),
    api_order int
);

CREATE TABLE category(  
    category_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255),
    category_pid int,
    category_level int,
    category_deleted BOOLEAN,
    category_picture VARCHAR(255),
    category_source text
);

ALTER TABLE "manager" ADD FOREIGN KEY ("role_id") REFERENCES "role"("role_id");

ALTER TABLE "permission_api" ADD FOREIGN KEY ("permission_id") REFERENCES "permission"("permission_id");