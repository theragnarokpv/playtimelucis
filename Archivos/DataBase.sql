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
  password varchar(512) NOT NULL,
  nombre VARCHAR(20) NULL,
  apellidos VARCHAR(30) NULL,
  correo VARCHAR(25) NULL unique,
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
  id_usuario INT NOT NULL,
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
 (1,'Dueño'), (2,'Comprador'), (3,'Vendedor');

/*Se insertan 3 registros del usuario*/
INSERT INTO playtime.usuario (id_usuario, id_rol,password,nombre, apellidos, correo, telefono) VALUES 
(1, 1,'$2a$10$P1.w58XvnaYQUQgZUCk4aO/RTRl8EValluCqB3S2VMLTbRt.tlre.','Juan', 'Castro Mora',    'jcastro@gmail.com',    '4556-8978'),
(2, 2,'$2a$10$GkEj.ZzmQa/aEfDmtLIh3udIH5fMphx/35d0EYeqZL5uzgCJ0lQRi','Rebeca',  'Contreras Mora', 'acontreras@gmail.com', '5456-8789'),
(3,2,'$2a$10$GkEj.ZzmQa/aEfDmtLIh3udIH5fMphx/35d0EYeqZL5uzgCJ0lQRi','Luis',  'Marin Alfaro', 'lmarin@gmail.com', '5456-8789'),
(4,2,'$2a$10$GkEj.ZzmQa/aEfDmtLIh3udIH5fMphx/35d0EYeqZL5uzgCJ0lQRi','Jose',  'Garcia Guillen', 'jgarcia@gmail.com', '5456-8789'),
(5,3,'$2a$10$GkEj.ZzmQa/aEfDmtLIh3udIH5fMphx/35d0EYeqZL5uzgCJ0lQRi','Andres',  'Bolaños Castillo', 'abolanos@gmail.com', '5456-8789'),
(6,3,'$2a$10$GkEj.ZzmQa/aEfDmtLIh3udIH5fMphx/35d0EYeqZL5uzgCJ0lQRi','Josue',  'Gomez Arriba', 'jgomez@gmail.com', '5456-8789'),
(7, 3,'$2a$10$koGR7eS22Pv5KdaVJKDcge04ZB53iMiw76.UjHPY.XyVYlYqXnPbO','Pedro', 'Mena Loria',     'lmena@gmail.com',      '7898-8936');

/*Se insertan 3 categorias de productos*/
INSERT INTO playtime.plataforma (id_plataforma,descripcion) VALUES
('1','PlayStation 5'),
('2','Xbox Series S'),
('3','Nintendo Switch'),
('4','PlayStation 4'),
('5','Xbox One');

/*Se insertan 4 productos por categoria */
INSERT INTO playtime.producto (id_producto,id_plataforma,id_usuario,descripcion,detalle,precio,existencias,ruta_imagen) VALUES
(1,1,5,'God of War Ragnarok','Lorem ipsum dolor sit amet consectetur adipiscing elit iaculis, ullamcorper in fringilla eu cras tempor mi. Luctus blandit sapien mauris vestibulum consequat mattis taciti aliquam ullamcorper, sagittis suscipit etiam urna convallis interdum tempor bibendum, ultricies habitant viverra natoque dictum posuere senectus volutpat. Cum ad vehicula condimentum nunc lacus nec tellus eleifend, a platea curae nullam sollicitudin nibh class cursus taciti, posuere purus inceptos facilisis cubilia suspendisse ut.',23000,5,'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81f3ZmXx3cL._SL1500_.jpg'),
(2,2,6,'FC2024','Lorem ipsum dolor sit amet consectetur adipiscing elit iaculis, ullamcorper in fringilla eu cras tempor mi. Luctus blandit sapien mauris vestibulum consequat mattis taciti aliquam ullamcorper, sagittis suscipit etiam urna convallis interdum tempor bibendum, ultricies habitant viverra natoque dictum posuere senectus volutpat. Cum ad vehicula condimentum nunc lacus nec tellus eleifend, a platea curae nullam sollicitudin nibh class cursus taciti, posuere purus inceptos facilisis cubilia suspendisse ut.',23000,5,'https://m.media-amazon.com/images/I/61ENU5AG63L._AC_SL1000_.jpg'),
(3,3,7,'Mario Kart Deluxe 8','Lorem ipsum dolor sit amet consectetur adipiscing elit iaculis, ullamcorper in fringilla eu cras tempor mi. Luctus blandit sapien mauris vestibulum consequat mattis taciti aliquam ullamcorper, sagittis suscipit etiam urna convallis interdum tempor bibendum, ultricies habitant viverra natoque dictum posuere senectus volutpat. Cum ad vehicula condimentum nunc lacus nec tellus eleifend, a platea curae nullam sollicitudin nibh class cursus taciti, posuere purus inceptos facilisis cubilia suspendisse ut.',23000,5,'https://ss423.liverpool.com.mx/xl/1057832246.jpg'),
(4,4,5,'Minecraft','Lorem ipsum dolor sit amet consectetur adipiscing elit iaculis, ullamcorper in fringilla eu cras tempor mi. Luctus blandit sapien mauris vestibulum consequat mattis taciti aliquam ullamcorper, sagittis suscipit etiam urna convallis interdum tempor bibendum, ultricies habitant viverra natoque dictum posuere senectus volutpat. Cum ad vehicula condimentum nunc lacus nec tellus eleifend, a platea curae nullam sollicitudin nibh class cursus taciti, posuere purus inceptos facilisis cubilia suspendisse ut.',23000,5,'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/32739bd0-5fdd-4b7a-8c11-4f168d17d5c7.a2f9fd9d2bfdce93dbebf20cf61f7cf9.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
(5,5,6,'Starwars Jedi Fallen Order','Lorem ipsum dolor sit amet consectetur adipiscing elit iaculis, ullamcorper in fringilla eu cras tempor mi. Luctus blandit sapien mauris vestibulum consequat mattis taciti aliquam ullamcorper, sagittis suscipit etiam urna convallis interdum tempor bibendum, ultricies habitant viverra natoque dictum posuere senectus volutpat. Cum ad vehicula condimentum nunc lacus nec tellus eleifend, a platea curae nullam sollicitudin nibh class cursus taciti, posuere purus inceptos facilisis cubilia suspendisse ut.',23000,5,'https://theshopgamer.com/31200-large_default/star-wars-jedi-fallen-order-xboxone-juego-fisico-para-xbox-one.jpg');
