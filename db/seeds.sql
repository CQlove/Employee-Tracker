USE employee_db;

INSERT INTO departments(name)
VALUES ("Sales"),("Service"),("Marketing"),("Parts");

INSERT INTO roles (title,salary,departments_id)
VALUES("sales-man",60000,1),("sales-manager",80000,1),
("service-technician",50000,2),("service-manager",77777,2),
("marketing-specialist",55000,3),("marketing-director",88888,3),
("parts-driver",40000,4),("parts-advisor",75000,4);

INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES("Dulcie","Lucinde",2,NULL),("Lance","Magda",4,NULL),("Irma","Ylli",6,NULL),("Matts","Oline",8,NULL),
("Lea","Nita",1,1),("Virgilio","Noy",1,1),("Sohail","Laureen",1,1),
("Domitian","Suse",3,2),("Tacita","Herleif",3,2),("Elon","Fortuna",3,2),
("Murad","Sotos",5,3),("Roland","Nala",5,3),("Iagan","Oum",5,3),
("Abenner","Marius",7,4);

