## Frontend RentalApp steps explanation

**Lab3** - Added 4 routes: "/", "/accommodations", "/hosts"
, "/countries" via react-router. The UI app contains implementations of all READ functionalities
for accommodation, host and country. The "/" route is home page. The Frontend is connected to the backend using axios.
The use of data that is fetched from the backend is configured in the hooks directory. Added UI components and pages and the login and JWT token logic.
The components are made to be reusable.

**Lab4** - Added register page and /register route.
Updated the UI app so users based on roles (if Admin) can access the CRUD operations for all entities (Accommodations, Hosts, Countries).
Users can only READ. The updating of the entities is done via modal dialog components for each of them. Updated each entity page so they implement the new functionalities and have an add button (only Admin role can see this).
