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

### [Update 2] - About Module & Conflict Handling
*Marker: Added to track incremental refactoring improvements across different days.*

* **About Module Integration**: Added a complete layered module (`About` entity, DTO, Repository, Service, and Controller). Established a One-to-One JPA relationship (`@OneToOne`) linking each `About` section securely to its parent `Profile`.
* **New API Endpoints**: 
  * `GET /api/about/{username}` - Fetch the About section.
  * `POST /api/about/save/{username}` - Create a new About section.
  * `POST /api/about/update/{username}` - Update an existing About section.
* **Conflict Exception Handling**: Introduced `ResourceAlreadyExistsException` mapped to HTTP `409 Conflict` within the `GlobalExceptionHandler` to elegantly prevent duplicate records when attempting to save an About section for a user that already has one.
* **Refined Data Models**: Implemented specialized fields (`workEmail` and `workPhone`) and a list-based `description` utilizing `@ElementCollection` to handle multiple paragraphs dynamically.

### [Update 3] - Unified Skills Module
*Marker: Added to track incremental refactoring improvements across different days.*

* **Simplified Skills Integration**: Refactored the module into a single unified `Skill` entity to streamline database architecture. Integrated with `Profile` utilizing a `@OneToMany` setup.
* **Dynamic Categorization & Full CRUD**: Added a `category` column to handle logical grouping directly within the UI. Implemented `POST`, `PUT`, and `DELETE` endpoints to support saving, updating, and removing skills dynamically with a custom `priority` attribute for UI sorting.

* **Robust Data Validation**: Added `@NotNull` constraints to critical fields like `priority` in `SkillDto` to ensure clean `400 Bad Request` responses instead of unhandled server exceptions.
* **JPA Relationship Fixes**: Restored the bidirectional `@OneToMany` relationship in the `Profile` entity, ensuring proper Hibernate cascading operations.
* **Enhanced Security Checks**: Modified ownership verification in the service layer to use case-insensitive username matching (`equalsIgnoreCase`), preventing false-positive `403 Forbidden` errors.
* **CORS Configuration**: Enabled cross-origin requests on the `SkillController` via `@CrossOrigin` to allow seamless integration with the frontend application.

### [Update 5] - Professional Experience Module
*Marker: Added to track incremental refactoring improvements across different days.*

* **Experience Integration**: Built the `Experience` entity interconnected to the `Profile` utilizing `@OneToMany`. Handled lists correctly by using `@ElementCollection` for `technologies` and `description`.
* **Standardized Job Attributes**: Expanded upon requested fields by introducing `companyName`, `companyUrl`, and `location` parameters to better reflect professional resumes.
* **Chronological Sorting**: Implemented `OrderByStartDateDesc` directly in Spring Data JPA queries so the frontend seamlessly receives the most recent job positions first.

### [Update 6] - Achievements Module
*Marker: Added to track incremental refactoring improvements across different days.*

* **Achievements Integration**: Added the `Achievement` entity to handle awards, certifications, and notable recognitions. Established a `@OneToMany` relationship with `Profile`.
* **Enhanced Professional Fields**: Included custom `issuer` and `date` columns to add context and chronological sorting via `OrderByDateDesc`. Maintained uniform security checks, mapping structures, and endpoint (`GET /api/achievements/{username}`) layouts.
