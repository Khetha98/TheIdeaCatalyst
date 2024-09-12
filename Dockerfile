# Stage 1: Build the React frontend
FROM node:16 AS frontend-build

WORKDIR /app

# Copy the frontend package.json and package-lock.json files and install dependencies
COPY the-idea-catalyst-frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend application and build it
COPY the-idea-catalyst-frontend/ ./
RUN npm run build

# Stage 2: Build the Spring Boot backend
FROM openjdk:11-jre-slim AS backend-build

WORKDIR /app

# Copy the backend source files
COPY the-idea-catalyst-backend/ /app

# Copy the built frontend into the Spring Boot resources folder
COPY --from=frontend-build /app/build /app/src/main/resources/static

# Build the Spring Boot backend
RUN ./mvnw clean package -DskipTests

# Stage 3: Run the full application (frontend + backend)
FROM openjdk:11-jre-slim

WORKDIR /app

# Copy the built Spring Boot application
COPY --from=backend-build /app/target/TheIdeaCatalyst-*.jar app.jar

# Set environment variables for MySQL and Hibernate
ENV MYSQL_ROOT_PASSWORD="100Khetha"  # Remove the % to avoid shell errors
ENV MYSQL_DATABASE="TheIdeaCatalyst"
ENV SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/TheIdeaCatalyst?useSSL=false"
ENV SPRING_DATASOURCE_USERNAME="root"
ENV SPRING_DATASOURCE_PASSWORD="100Khetha"  # Remove the % to avoid shell errors
ENV SPRING_JPA_HIBERNATE_DDL_AUTO="update"  # Hibernate schema update

# Expose the backend port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

