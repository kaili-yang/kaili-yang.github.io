---
title: Dance or Direct? Workflows and Sagas
description: Focus on Distributed Transactions and State
---

Workflows and **Distributed Transactions** are where microservices go to die. Taylen showed me a workflow utilizing **Asynchronous Communication**, **Atomic Transactionality**, and **Choreography**. Logan accurately named it the **Horror Story Saga Pattern**. By demanding **Atomic Consistency** across asynchronous calls without a **Mediator**, every service was forced to handle complex **Compensating Transactions**, creating a web of **Race Conditions**.

Dynamic coupling consists of a 3D matrix: **Communication** (Sync vs. Async), **Consistency** (Atomic vs. Eventual), and **Coordination** (**Orchestrated** vs. **Choreographed**). Because distributed databases lack **Atomic Locks**, error handling is the real challenge. 

To fix this, we moved away from the **Epic Saga** (Sync, Atomic, Orchestrated), which destroys scalability. Instead, we embraced the **Fairy Tale Saga** (Sync, Eventual, Orchestrated). By accepting **Eventual Consistency**, we removed the burden of **Atomic Rollback Failures**. We built **Saga State Machines**; if an error occurs, the **Orchestrator** changes the state to a wait status and relies on background retries to achieve consistency.
