![titulo](/docs/titulo.JPG)

# Quasar GoogleMaps Cypress

Example of a Quasar app with Google Maps and Cypress automated tests

## Technologies:

- Quasar v1
- Google Maps API
- Google Maps Places API
- Google Maps Directions API
- Cypress

## Objective

You will learn how to use the Google Maps APIs to add markers, draw circles, search for places and draw paths to the destinations in a Quasar app. Then we will test the application with [Cypress](https://www.cypress.io/), an amazing tool for testing front-end applications. For more examples about Cypress, visit the [Vila do Silício](http://viladosilicio.com.br/testes-e2e-com-cypress-no-quasar-framework/) blog.

## Before Start

Install the latest version of Cypress by running this command:

```batch
npm install cypress --save-dev
```

## Google Maps

Go to [Google developers console](https://console.developers.google.com/) and create a project.

![google01](/docs/google01.JPG)

Activate the APIs and services.

![google02](/docs/google02.JPG)

Search for the Places API and enable it.

![google03](/docs/google03.JPG)

Create credentials with the API Key type.

![google04](/docs/google04.JPG)

Copy the API key.

![google05](/docs/google05.JPG)

Search for the Maps Javascript API and enable it.

![google06](/docs/google06.JPG)

The same API Key will be used by default.

![google07](/docs/google07.JPG)

Search for the Directions API and enable it.

![google08](/docs/google08.JPG)

Three APIs will be used: Directions, Maps and Places.

![google09](/docs/google09.JPG)

## Quasar

Now let's go to the code.
In the root folder of the project, add the map API key created before.

![quasar01](/docs/quasar01.JPG)

Install the dependencies:

```bash
npm install
```

Run the app:

```bash
quasar dev
```

The main screen contains a search field and a map. The user position is detected and a red marker is positioned at the center of the map.

![quasar02](/docs/quasar02.JPG)

The map contains two buttons at its right side: the Camera Button and the Circle Button.

![quasar03](/docs/quasar03.JPG)

The Camera button animates the map camera toward the user's position.

![quasar04](/docs/quasar04.JPG)

The Circle button with a plus icon opens a modal that allows the user to add a circle around its marker with a customized color, radius and opacity. If the Circle button has a minus icon, it will remove the circle.

![quasar05](/docs/quasar05.JPG)

The circle has no effect in the map. It is just a fun feature to use ^\_^.

![quasar06](/docs/quasar06.JPG)

The search field above the map lists the places at each character typed.

![quasar07](/docs/quasar07.JPG)

Click on one option and a blue marker will be added to the map at the place's position with its full address inside the info window

![quasar08](/docs/quasar08.JPG)

Once the place is marked on the map, the Directions button will be visible next to the search field.

![quasar09](/docs/quasar09.JPG)

After clicked, a path will be drawn between the origin (the user's position) and the destination (the place's position).
The total distance between them will be shown at the bottom.

![quasar10](/docs/quasar10.JPG)

After the path is drawn, the Clear button will be visible instead of the Directions button and it will allow to remove the place's marker and the drawn path.

![quasar11](/docs/quasar11.JPG)

## Cypress

Now let's test our application automatically.
Inside the "/cypress/integration" folder are the test scripts to be executed.
While keeping the application running, open the Cypress Browser with this command in another terminal:

```batch
npm run cypress
```

It will list the test files inside the "/cypress/integration" folder.

![cypress01](/docs/cypress01.JPG)

Click on each option to open the test window, allow the geolocation detection when asked and wait for the result.
Some of the test need the user interaction.

Center Camera Test

![cypress02](/docs/cypress02.JPG)

Add Remove Circle Test

![cypress03](/docs/cypress03.JPG)

Search Places Test

![cypress04](/docs/cypress04.JPG)

Add Remove Directions Test

![cypress05](/docs/cypress05.JPG)
