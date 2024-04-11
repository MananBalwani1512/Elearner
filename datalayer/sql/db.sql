-- User Table code.
create table user (
  id integer primary key,
  name varchar(50) not null,
  email varchar(50) unique not null,
  password varchar(50) not null,
  role varchar(10) not null
);
-- Course Table code.
create table course (
  id SERIAL primary key,
  name text unique not null,
  category text not null,
  level text not null,
  popularity integer not null
);
-- User Course Enroll Table code.
create table user_course_enroll (
  user_id int not null,
  course_id int not null,
  primary key (user_id,course_id),
);
-- Adding Foreign Key constraint to the user_course_enroll table.
alter table user_course_enroll add foreign key (user_id) references users(id);
alter table user_course_enroll add foreign key (course_id) references course(id);
