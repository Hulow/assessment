# Feature based Clean Architecture

Hello, 

FYI I did not touch any single line of code in this assessment. (except for the README)

this project follows a feature-based Clean Architecture adapted for React and TypeScript.



This architecture enforces strict separation between:

- **Domain** (business logic)
- **Adapters** (React integration layer including hook, context and provider)
- **UI** (presentation layer)
- **App** (composition root)

## Application Overview

The application is divided into two main areas

- `./src/app`: 
  - Responsible for application composition and infrastructure:
    - Provider registration
    - Chakra UI setup
    - Application bootstrap
- `./src/feature`: 
  - Contains self-contained business features.

For this assessment, the application contains a single feature:

`src/features/counter/`

- `adapters/`
- `domain/`
- `ui/`
- `index.ts`

The Counter feature is organized around clear architectural boundaries:

- `adapters/`: connects React to the domain layer and manages application state.
- `domain/`: contains the Counter entity and business rules defined by the assessment.
- `ui/`: renders state and handles user interactions.
- `index.ts`: the public entry point

The dependency flow follows: `UI` → `Adapters` → `Domain`

This ensures that business rules remain independent from React, Chakra UI, and other infrastructure concerns.

# Spec Driven Development

In addition to a set of predefined development rules and AI skills, I maintain specification templates that define:

- Feature requirements
- Architectural constraints
- Implementation tasks
- Verification criteria
- Completion criteria

Before implementation, the feature is described through a specification document. The implementation is then broken down into small, focused tasks that can be developed, tested, and committed independently.

This approach provides:

- Clear implementation boundaries
- Better traceability of architectural decisions
- Small and focused commits
- Explicit verification steps
- A predictable AI-assisted development workflow

The generated specifications used for this assessment are:

- [specs/001-project-initialization.md](./specs/001-project-initialization.md): Application foundation
- [specs/002-chakra-ui-setup.md](./specs/002-chakra-ui-setup.md): UI system and design layer
- [specs/003-counter-implementation.md](./specs/003-counter-implementation.md): Counter feature implementation

The goal is not to replace engineering judgment with AI, but to use specifications as a source of truth that guides implementation, testing, and review.

# Getting Started

## Install

Clone the repository and create the dotenv file:

```shell
cp example.env .env
```

Next, ensure that the project can build:

```shell
# Install packages
npm i

# Build
npm run build
```

## Running the app

```shell
npm run dev
```

## Testing

```shell
npm run test
```

## Commands overview


| Command              | Action                       |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start the development server |
| `npm run build`      | Build the application        |
| `npm run test`       | Run the test suite           |

