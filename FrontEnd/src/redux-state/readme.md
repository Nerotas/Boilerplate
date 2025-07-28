# Typescript and Redux Toolkit

### Store.js Methods

    The typing used for the store is designed to harden the available types for each reducer. In short, the RootState is defined by the available states created by the reducers. This is then distributed accross the dispatch, thunk, selector, etc. until it gets the component.

    We currently use thunk as middleware.

[Redux Toolkit TypeScript Quick Start](https://redux-toolkit.js.org/usage/usage-with-typescript)

## Reducer Methods

### Slice Method:

    This method uses an inital state and handles action types automatically. Reducers inside slice are used to modify entire state or part of state. Actions outside are used to pass payload into reducers. Actions can be async.

Example in `./Catalog/searchDetails/Catalog.ts`

[Define Slice State and Action Types](https://redux-toolkit.js.org/tutorials/typescript#define-slice-state-and-action-types)

### Create Reducer Method:

    This method uses an inital state and relies on which action type is passed through it to determine which reducer to use. They can act solely off of the type or use a provided payload. Reducers are added via the case builder and must return an entire state. Actions can return async function.

Example in `./oauth/reducers.ts`
[Create Reducer](https://redux-toolkit.js.org/api/createReducer)

# TODO and Brainstorming

-   Settle on single method
