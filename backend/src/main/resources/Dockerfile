FROM mysql
ENV MYSQL_ROOT_PASSWORD=pass
WORKDIR dbSetup/
COPY database_setup.sql ./database_setup.sql
RUN mysql -u root --password=pass Portfolio_management < database_setup.sql > output.log 2>&1


