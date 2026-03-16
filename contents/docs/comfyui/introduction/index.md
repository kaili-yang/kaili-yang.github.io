---
title: Introduction to ComfyUI Workflows
description: Understanding the node-based interface for Stable Diffusion and AI generation.
---

# ComfyUI Workflows

ComfyUI is a powerful, node-based GUI for Stable Diffusion. It allows you to create complex image generation pipelines by connecting different functional blocks (nodes) together.

## Why Nodes?

Unlike traditional linear interfaces, the node-based approach provides:

- **Granular Control**: Every step of the generation process (sampling, VAE encoding, conditioning) is visible and adjustable.
- **Reproducibility**: Workflows can be saved as JSON files and shared, ensuring that others can recreate your exact setup.
- **Efficiency**: Only the parts of the graph that have changed need to be re-executed, saving significant time during experimentation.

## Core Concepts

### 1. Nodes
The building blocks of your workflow. Each node performs a specific task, such as loading a model, encoding text prompts, or sampling an image.

### 2. Edges
The connections between nodes. They represent the data flow (Tensors, Latents, Models, etc.) from one operation to the next.

### 3. Latent Space
ComfyUI works primarily in the "Latent Space"—a compressed representation of an image. You typically generate content in latent space and then "decode" it into a viewable image at the end.

## Your First Workflow

To get started, you usually need at least:
- A **Checkpoint Loader** to bring in your model weights.
- **CLIP Text Encoders** for your positive and negative prompts.
- An **Empty Latent Image** to define the output dimensions.
- A **KSampler** to perform the actual denoising.
- A **VAE Decoder** to turn the final latent into an image.

> [!TIP]
> You can drag and drop any image generated in ComfyUI back into the interface to instantly load the workflow used to create it!
