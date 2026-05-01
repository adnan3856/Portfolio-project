# Portfolio Backend V2

Portfolio Backend V2 is a robust, production-grade API service designed to power a modern professional portfolio. Built with **Java 21** and **Spring Boot 3.4.2**, this project represents a complete modernization of the backend infrastructure, focusing on scalability, security, and maintainability.

## 🚀 Features

-   **Modern Tech Stack**: Leveraging Java 21 (LTS) and Spring Boot 3.x for optimal performance.
-   **Data Persistence**: Utilizes Spring Data JPA with a PostgreSQL database for structured data management.
-   **Environment-Ready**: Flexible configuration using environment variables for seamless deployment.
-   **Clean Architecture**: Layered design (Controller, Service, Repository) for clear separation of concerns.
-   **Developer Efficiency**: Integrated with Lombok to reduce boilerplate and Spring Boot Actuator for health monitoring.

## 🛠️ Tech Stack

-   **Java**: 21 (LTS)
-   **Framework**: Spring Boot 3.4.2
-   **Database**: PostgreSQL
-   **Build Tool**: Maven
-   **Key Dependencies**: Spring Web, Spring Data JPA, Lombok, Actuator, PostgreSQL Driver

## ⚙️ Configuration

The application is configured to use environment variables for database connectivity, allowing for secure and flexible setups across different environments.

| Variable | Default Value |
| :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/portfolio-db` |
| `SPRING_DATASOURCE_USERNAME` | `postgres` |
| `SPRING_DATASOURCE_PASSWORD` | `root` |

## 🏃 Getting Started

### Prerequisites
-   Java 21 installed.
-   PostgreSQL server running.
-   Maven (or use the provided Maven Wrapper).

### Installation

1.  Clone the repository.
2.  Ensure a PostgreSQL database named `portfolio-db` is created.
3.  Run the application using the Maven Wrapper:

```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8082`.

## 📂 Project Structure

The project follows a standard Spring Boot layered architecture, with specific packages for entities, repositories, services, and controllers to ensure high maintainability and testability.


## 📝 Changelog / Version History

### [Update 1] - Architecture & Error Handling Refactor
*Marker: Added to track incremental refactoring improvements across different days.*

* **Introduced DTO Pattern**: Created `ProfileDto` to act as a secure data carrier between the API and Service layers. This isolates the `Profile` database entity from the controllers, preventing direct database exposure and tight coupling.
* **Global Exception Handling**: Implemented a `GlobalExceptionHandler` using `@RestControllerAdvice`. Replaced generic `RuntimeException`s with custom exceptions (e.g., `ResourceNotFoundException`) to provide standardized, client-friendly JSON error responses with appropriate HTTP status codes (like `404 Not Found`).
* **Data Type Alignment**: Fixed a type mismatch bug by ensuring `UUID` is consistently used for entity IDs across the `Profile` entity, `ProfileRepository` (`JpaRepository<Profile, UUID>`), and the Service layer.
* **JPA Entity Optimization**: Removed Lombok's `@Data` annotation from the `Profile` entity and replaced it with `@Getter` and `@Setter`. This is a JPA best practice to prevent potential performance issues or infinite loops caused by automatically generated `equals()`, `hashCode()`, and `toString()` methods on database entities.
