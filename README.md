
## Desafio
En los tiempos que corren cobra cada vez más importancia y está en boca de más gente todo lo referente
al mundo de las criptomonedas. Cientos de monedas se ofrecen actualmente en los miles de exchanges
(plataformas de compra e intercambio) alrededor del mundo y más de 200 millones de personas ya
experimentaron con algunas de las criptomonedas más famosas del mercado.
Es por eso que en este desafío vamos a pedirte que armes un Dashboard para poder ver y comparar las 5
criptomonedas con más volumen de mercado entre las 3 plataformas de intercambio que mayor volumen
(medido en usd) manejaron en un mes.
Para poder llevar esto adelante, deberás utilizar el set de APIs que dispone CoinAPI.io
(https://docs.coinapi.io/) y crear un Backend para el el login, seguridad y guardado de datos del usuario.
Para utilizar los servicios será necesario enviar como Authorization header (CoinApi) la siguiente
información:
X-CoinAPI-Key: CEA0B191-09B0-463E-B3CB-20B0749E4C43
También te pediremos que realices tu propio backend API Rest para todos los servicios que consideres y
necesites para hacer un login, logout, visualización de datos del usuario y guardado de transacciones,
obviamente que se encuentren securizados.

## Requerimientos
- Tendrás la posibilidad de acceder mediante un login a la aplicación (usuario o mail y password).
Los usuarios tendrán que estar cargados previamente en la aplicación.
- Deberás seleccionar 5 criptomonedas, podrás elegir anticipadamente cuáles mostrar “a tu
criterio” pero se valorará si del listado de Assets a consumir filtrás las de mayor volumen
manejado en el mes (dato contenido en el campo “volumen_1mth_usd”).

    o API: GET /v1/assets
- Será necesario obtener las imágenes para las 5 monedas elegidas en el paso anterior,
consumiendo otro servicio que brinda dicha información. Podrás enviarle el tamaño deseado
acorde al diseño que realices.
    
    o API: GET /v1/assets/icons/{iconSize}
- Tendrás que dar la posibilidad que el usuario seleccione una moneda y pueda visualizar de
manera simple e intuitiva los 3 exchanges con mayor volumen mensual operado en usd (esta
información solo aparecerá cuando el usuario realice un click sobre la moneda seleccionada).
    
    o API: GET /v1/exchanges
- Al igual que para los exchanges, deberás obtener las imágenes de las criptomonedas en la
medida apropiada para poder mostrarlos en el Dasboard
    
    o API: GET /v1/exchanges/icons/{iconSize}
- El Dashboard deberá ofrecerle al usuario la posibilidad de simular la compra de una
criptomoneda. Para ello se deberán definir y mostrar los siguientes componentes e información:

- Para cada moneda mostrar su Rate contra USD (se detalla el costo de la criptomoneda en
dólares como base de referencia).
    o API: GET /v1/exchangerate/{asset_id_base}/{asset_id_quote}?time={time}
    
- Para cada Exchange mostrar la comisión por la compra, siendo del 0,25% para el
Exchange que posea mayor volumen mensual, 0,40% para el 2do de mayor volumen y
0,55% para el 3ro de los exchanges a mostrar.

    o Disponibilizar un botón de “Comprar”.

    o Armar un Modal con todo el detalle de la operación y costo final que deberá pagar el
      usuario (expresado en USD).

    o Confirmación de la compra y guardarla en backend API Rest propio.

- Una vez en el Dashboard, se deberá mostrar los datos del usuario (usuario, nombre y apellido) en
el Header.

# CriptoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
