# CloudonixAssignment

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.5.

## Development server

To start a local development server, make sure you have Node `22.0.0`, NPM and Angular CLI installed, and then inside the project run:

```bash
npm install
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/login`.

## Considerations

I decided to store the bearer token in localstorage to make the logic easier, however in a real scenario this wouldn't be a good practice. Instead, using HttpOnly cookies would be safer.
