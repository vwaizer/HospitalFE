alter session set "_oracle_script"=true;

create user hr identified by "123" default tablespace users quota unlimited on users;

grant  resource, connect, create table, create session to hr;