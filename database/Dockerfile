FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD 123456  
ENV MYSQL_DATABASE order_service
ENV MYSQL_USER admin  
ENV MYSQL_PASSWORD 123456

ADD my.cnf /etc/mysql/conf.d

ADD database.sql /docker-entrypoint-initdb.d