---
title: Broken Promises and Contracts
description: Focus on Integration and Evolution
---

Integration points are the glue of architecture, but poorly designed glue turns into concrete. We debated the **Ticket Orchestrator** communication. Some insisted on **Strict RPC Contracts** (like **gRPC**). While these guarantee **Fidelity**, they create immense **Integration Brittleness**.

Because our mobile app faces a public App Store approval process, a strict contract would paralyze our **Backend Deployment Pipeline**. Instead, we opted for a **Loose Contract** using **JSON Name/Value Pairs**. This decoupled the systems, allowing the backend to evolve independently.

For internal communication, we implemented **Consumer-Driven Contracts**. Traditionally, providers push a rigid contract. We inverted this to a **Pull Model**. Consumers define exactly what specific fields they need, generate a contract, and the provider includes it in their **CI/CD Pipeline**. This guarantees **Contract Fidelity** at build-time while maintaining **Loose Coupling**.
