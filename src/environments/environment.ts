// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   firebase: {
    apiKey: "AIzaSyDG8dvUuC2j4hiMFyfMJzgW6EO7Y-sIw0E",
    authDomain: "parkingapp-c95bf.firebaseapp.com",
    databaseURL: "https://parkingapp-c95bf.firebaseio.com",
    projectId: "parkingapp-c95bf",
    storageBucket: "parkingapp-c95bf.appspot.com",
    messagingSenderId: "895375592780"
  }
};
