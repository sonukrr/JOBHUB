FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=musedb
ENV MYSQL_USER=app_root
ENV MYSQL_PASSWORD=root123
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/musedb
ADD ./target/accountmanager-0.0.1-SNAPSHOT.jar /usr/src/accountmanager-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","accountmanager-0.0.1-SNAPSHOT.jar"]