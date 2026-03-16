---
title: Choreographing a Horror Story
description: Focus on Workflows, Sagas, and Contracts
---

I once reviewed a design from a junior architect who was incredibly proud of a new decentralized workflow. They had used **Asynchronous Communication** to make it blazing fast, removed the central **Orchestrator** to avoid bottlenecks (**Choreography**), but strictly mandated **Atomic Data Consistency** across five different services.

I had to break the news gently: "You haven't designed a microservice workflow. You've designed the **Horror Story Saga Pattern**."

In distributed systems, **Dynamic Coupling** consists of a 3D matrix of choices: **Communication** (Sync vs. Async), **Consistency** (Atomic vs. Eventual), and **Coordination** (**Orchestrated** vs. **Choreographed**).

By insisting on **Atomic Consistency** without a central **Orchestrator**, the junior architect was forcing every single independent domain service to manually coordinate **Compensating Rollbacks** via asynchronous messages whenever an error occurred. It was a recipe for infinite **Race Conditions** and untraceable **Data Corruption**.

If you have a complex workflow with numerous failure conditions, you should use an **Orchestrator** (a **Mediator**). It acts as a conductor, handling error states and routing. Yes, it introduces a **Coupling Point** and slight **Performance Latency**, but it saves your system from **Cascading Failures**.

If you want extreme scalability and decouple your services entirely, you must embrace **Eventual Consistency** and use the **Anthology Saga Pattern** (Async, Eventual, Choreographed). You simply cannot have monolithic transaction safety in an asynchronous, unmediated distributed system.

To manage the data flowing between these services, we had to define our **Contracts**. We avoided strictly typed **RPC (Remote Procedure Call)** contracts for external integrations because they create massive **Integration Brittleness**. Instead, we utilized **Consumer-Driven Contracts**. The consuming service defines exactly what small pieces of **JSON Data** it needs, and the providing service includes that contract in its **CI/CD Pipeline** to ensure it never breaks those specific fields.

> **The Architect’s Insight:** You can never reduce the **Semantic Complexity** of a business workflow; you can only choose how to implement it. If the business process is a tangled web of edge cases, trying to use "pure" **Choreography** will just scatter that complexity into the shadows.
