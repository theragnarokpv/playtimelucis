/*
*	Pagina creada por Producciones Valhalla.
*/


/*Se crea la base de datos */
drop schema if exists playtime;
drop user if exists admin_play;
CREATE SCHEMA playtime;

create user 'admin_play' identified by 'playContra123';

grant all privileges on playtime.* to 'admin_play';
flush privileges;

create table playtime.rol (
  id_rol INT NOT NULL AUTO_INCREMENT,
  nombre varchar(20),
  PRIMARY KEY (id_rol)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


CREATE TABLE playtime.usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  id_rol INT,
  username varchar(20) NOT NULL,
  password varchar(512) NOT NULL,
  nombre VARCHAR(20) NULL,
  apellidos VARCHAR(30) NULL,
  correo VARCHAR(25) NULL,
  telefono VARCHAR(15) NULL,
  PRIMARY KEY (`id_usuario`),
  foreign key fk_usuario_rol(id_rol) references rol(id_rol))  
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

create table playtime.plataforma (
  id_plataforma INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(30) NOT NULL,
  PRIMARY KEY (id_plataforma))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

create table playtime.producto (
  id_producto INT NOT NULL AUTO_INCREMENT,
  id_plataforma INT NOT NULL,
  descripcion VARCHAR(30) NOT NULL,  
  detalle VARCHAR(1600) NOT NULL, 
  precio double,
  existencias int,  
  ruta_imagen varchar(1024),
  PRIMARY KEY (id_producto),
  foreign key fk_producto_plataforma (id_plataforma) references plataforma(id_plataforma)  
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


CREATE TABLE playtime.compra (
  id_compra INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_pagar DOUBLE NOT NULL,
  datos_direccion TEXT,
  PRIMARY KEY (id_compra),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE playtime.detalle_compra (
  id_detalle INT NOT NULL AUTO_INCREMENT,
  id_compra INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DOUBLE NOT NULL,
  subtotal DOUBLE NOT NULL,
  PRIMARY KEY (id_detalle),
  FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


insert into  playtime.rol  (id_rol, nombre) values
 (1,'Dueño'), (2,'Administrador'), (3,'Usuario');

/*Se insertan 3 registros del usuario*/
INSERT INTO playtime.usuario (id_usuario, id_rol,username,password,nombre, apellidos, correo, telefono) VALUES 
(1, 1,'juan','$2a$10$P1.w58XvnaYQUQgZUCk4aO/RTRl8EValluCqB3S2VMLTbRt.tlre.','Juan', 'Castro Mora',    'jcastro@gmail.com',    '4556-8978'),
(2, 2,'rebeca','$2a$10$GkEj.ZzmQa/aEfDmtLIh3udIH5fMphx/35d0EYeqZL5uzgCJ0lQRi','Rebeca',  'Contreras Mora', 'acontreras@gmail.com', '5456-8789'),
(3, 3,'pedro','$2a$10$koGR7eS22Pv5KdaVJKDcge04ZB53iMiw76.UjHPY.XyVYlYqXnPbO','Pedro', 'Mena Loria',     'lmena@gmail.com',      '7898-8936');

/*Se insertan 3 categorias de productos*/
INSERT INTO playtime.plataforma (id_plataforma,descripcion) VALUES
('1','Procesadores'),
('2','Tarjetas de Video');

/*Se insertan 4 productos por categoria */
INSERT INTO playtime.producto (id_producto,id_plataforma,descripcion,detalle,precio,existencias,ruta_imagen) VALUES
(1,1,'Monitor AOC 19','Lorem ipsum dolor sit amet consectetur adipiscing elit iaculis, ullamcorper in fringilla eu cras tempor mi. Luctus blandit sapien mauris vestibulum consequat mattis taciti aliquam ullamcorper, sagittis suscipit etiam urna convallis interdum tempor bibendum, ultricies habitant viverra natoque dictum posuere senectus volutpat. Cum ad vehicula condimentum nunc lacus nec tellus eleifend, a platea curae nullam sollicitudin nibh class cursus taciti, posuere purus inceptos facilisis cubilia suspendisse ut.',23000,5,'https://c.pxhere.com/images/ec/fd/d67b367ed6467eb826842ac81d3b-1453591.jpg!d');
