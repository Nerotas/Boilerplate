# Routes

## Library

All routes are built using a route object in _react router_. Which object is used is based on the user's authorization status. With the exception of the log in page, nothing should be accessible to a non-authorized user.

## Methods

All routes are executed with lazy loading using the Loadable component in this directory. Some routes have custom guards protecting their access beyond the user being signed in.

## Guards

We have two guards currently in use: **Admin** and **Feature Flag**.

## Admin Guard

Checks the users role in the JWT to see if they are an admin. It should be used to control access to app critical information and app editing features.

## Feature Flag Guard

Some sections are controlled by feature flags. Feature flags are created and controlled in Launchdarkly. There are two purposes to using feature flags in routes:

1. Block access to a route. For example, Proxy Product access.
2. Version control for a route. For example, Gallery view or Catalog.

## Notes and Misc

-   Remember to add routes with the appropriate flags to the Navbar after adding them to the route object.
-   Query strings are handled in the container using a custom hook. They are not handled in the route object.
-   Using the _children_ property of the route object can be buggy and should be avoided.

# Temporary Note on Gallery View and Catalog - 05/02/2023

We are in the process of phasing out the old backend structure for the new BE 2.0 as our new standard. We've decided to handle this by using Feature Flags. Since we presume that all new retailers will be using BE 2.0 we will be creating a list of retailers still on BE 1.0 and redirecting to BE 2.0 if they are **NOT** on the list.
