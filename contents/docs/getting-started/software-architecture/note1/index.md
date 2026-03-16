---
title: The Myth of "Best Practices"
description: Focus on Trade-off Analysis and Architecture Decision Records (ADR)
---

It was 9:00 AM on a Tuesday when our **Monolithic Ticketing System**, which essentially runs our entire support business, froze completely. Customers couldn't log tickets, and our field experts were stranded without routing information.

After a frantic hour of debugging, we found the culprit: a junior developer had bypassed the application's **Service Layer** to write a massive, **Direct SQL Join** against our **Core Transactional Tables**. They needed to generate a real-time performance dashboard for upper management and figured a direct query was the **"Best Practice"** for **Low Latency**.

When confronting the developer, they pointed me to a popular engineering blog that advocated for this exact **Data Retrieval Pattern**. This incident highlighted the most painful lesson I’ve learned in my career: for **Software Architects**, there is no such thing as a universal **Best Practice**.

---

## The "Least Worst" Reality

When you are a developer, you build outstanding skills in searching online for solutions to your current problem. But as an **Architect**, you quickly realize that every problem presents a unique snowflake of **Constraints**. What are the chances that someone on StackOverflow has encountered your exact mix of **Legacy Code**, **Team Dynamics**, and **Business Requirements**?

The hard truth is that **Software Architecture** is the stuff that’s hard to change later. We cannot rely on **Silver Bullets**; instead, our real job lies in our ability to objectively determine and assess the set of **Trade-offs** on either side of a **Consequential Decision**. We must stop striving for the "best" design and instead ruthlessly optimize for the **"Least Worst"** combination of trade-offs.

In the case of our frozen **Monolith**, the developer maximized for **Query Speed** but completely sacrificed **System Availability**.

---

## Data is an Architectural Concern

Our outage wasn't just a code problem; it was a fundamental misunderstanding of data. Historically, we treated the database as a single, opaque **Persistence Layer**. However, in modern **Distributed Architectures**, data has moved to an **Architectural Concern**, along with **Transactionality**.

To prevent our ticketing system from freezing again, we had to strictly separate our data into two categories:

* **Operational Data**: This is our **Online Transactional Processing (OLTP)** data, which includes the daily ticket routing and expert assignments. This is the data the company runs on—if it is interrupted, the organization cannot function.
* **Analytical Data**: This is **Non-Transactional Data** used for predictions, trending, and **Business Intelligence (BI)**, such as the manager's performance dashboard.

By **Tightly Coupling** analytical queries to our **Operational Database**, we created a **Structural Choke Point**. We had to break this **Dependency**.

---

## Creating an Immutable Memory: ADRs

We decided to physically separate the reporting capabilities from the core ticketing workflow. But a decision made in a meeting room today is easily forgotten by a new hire six months from now.

To prevent history from repeating itself, we documented this structural shift using an **Architecture Decision Record (ADR)**. An **ADR** is a short text file stored alongside the **Codebase** that forces us to explicitly state the **Context**, the **Decision**, and the **Consequences** (accepted trade-offs, like **Data Synchronization Delays**).

---

## Automating the Rules: Fitness Functions

Writing an **ADR** is great, but relying on manual **Code Reviews** to enforce it is a losing battle. If we define **Architecture** as the "why" and **Design** as the "how," we need a way to ensure the design respects the architecture. 

We solved this by implementing **Architecture Fitness Functions**. A **Fitness Function** is any mechanism that performs an objective **Integrity Assessment** of some **Architecture Characteristic**.

Below is the **Atomic Fitness Function** we implemented using **ArchUnit** to protect our system:

```java
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.library.Architectures.layeredArchitecture;

@AnalyzeClasses(packages = "com.company.ticketing")
public class ArchitectureGuardrails {

    /**
     * Fitness Function: Prevents Analytical Reporting from bypassing 
     * the Service Layer to hit the Persistence Layer directly.
     */
    @ArchTest
    public static final ArchRule reporting_layer_isolation = layeredArchitecture()
        .consideringAllDependencies()
        .layer("Persistence").definedBy("..persistence..")
        .layer("Reporting").definedBy("..reporting..")
        .layer("Service").definedBy("..service..")
        
        .whereLayer("Persistence")
        .mayNotBeAccessedByLayers("Reporting")
        .as("Analytical queries must use the Data Extraction Module to avoid locking OLTP tables.");

    /**
     * Fitness Function: Ensures no direct SQL dependencies exist in the Reporting domain.
     */
    @ArchTest
    public static final ArchRule no_direct_database_access_in_reporting = 
        noClasses().that().resideInAPackage("..reporting..")
        .should().dependOnClassesThat().haveFullyQualifiedName("javax.persistence.EntityManager")
        .because("Direct SQL joins in reporting crashed the system; use asynchronous Read Replicas instead.");
}