/*
This code is apply to PostgreSQL
*/

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
    permission_id int NOT NULL PRIMARY KEY,
    permission_name VARCHAR(255) NOT NULL,
    permission_pid int NOT NULL,
    permission_control varchar(128),
    permission_action varchar(128),
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






INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(100,0,'goods management',0);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(101,100,'category management',1);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(102,100,'category parameter',1);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(103,100,'goods list',1);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(104,101,'add category',2);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(105,101,'get all category',2);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(106,101,'update category',2);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(107,101,'get a category',2);
INSERT INTO "permission"("permission_id","permission_pid","permission_name","permission_level") VALUES(108,101,'delete category',2);



INSERT INTO "permission_api"("permission_id") VALUES(100);
INSERT INTO "permission_api"("permission_id","api_service","api_action","api_path") VALUES(101,'CategoryService','getAllCategories','category');
INSERT INTO "permission_api"("permission_id","api_service","api_action","api_path") VALUES(102,'CategoryService','addCategory','category');
INSERT INTO "permission_api"("permission_id","api_service","api_action","api_path") VALUES(10,'CategoryService','getCategoryById','category');
INSERT INTO "permission_api"("permission_id","api_service","api_action","api_path") VALUES(10,'CategoryService','updateCategory','category');
INSERT INTO "permission_api"("permission_id","api_service","api_action","api_path") VALUES(10,'CategoryService','deleteCategory','category');



INSERT INTO "role"("name","permission_ids","role_desc") VALUES('operator','100,101,104,105','operator');
INSERT INTO "role"("name","permission_ids") VALUES('test','100,104');



INSERT INTO "manager"("name","role_id","email","state","mobile","password","create_time") VALUES('Tommy',1,'abc@esd.com',0,98765432,'123456','2026-01-08');