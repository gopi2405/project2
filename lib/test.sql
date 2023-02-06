CREATE DATABASE testDB;
create table book_tickets(tktno varchar(10), showid varchar(10), seatno varchar(10), primary key(tktno,showid) );
select * from  book_tickets;
create table halls (hall_id varchar(10),class varchar(10), no_of_seats varchar(10), primary key(hall_id,class));
create table movies (movie_id varchar(10), movie_name varchar(10), length varchar(10), lang varchar(10),show_start date, show_end date, primary key(movie_id) );
create table price_listing ( price_id varchar(10), type varchar(10), day varchar(10), price varchar(10), primary key(price_id) );
create table price_listing ( price_id varchar(10), type varchar(10), day varchar(10), price varchar(10), primary key(price_id) );
create table shows ( showid int, movie_id int, hall_id int, type varchar(10), time int, date date, price_id int, primary key(showid) );
create table types ( movie_id int, type1 varchar(10), type2 varchar(10), type3 varchar(10), primary key(movie_id) );
insert into  book_tickets values('12', 's1','c1'),('13', 's1','c3'),('14', 's1','c3');
select * from book_tickets;
insert into halls values('hl1','2s', '5'),('hl2','3d', '3'),('hl1','blacony', '10'),('hl2','blacony', '10');
insert into movies values()

