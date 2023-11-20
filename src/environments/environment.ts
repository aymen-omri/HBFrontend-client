// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  authUrl: "http://localhost:8080/api/v1/auth",
  resetPasswordUrl: "http://localhost:8080/api/v1/reset-password",
  userUrl: "http://localhost:8080/api/v1/user",
  countryUrl: "http://localhost:8080/api/v1/country",
  addressUrl: "http://localhost:8080/api/v1/address",
  emailVerificationUrl: "http://localhost:8080/api/v1/email",
  paymentMethodUrl: "http://localhost:8080/api/v1/payment-method",
  socialMediaUrl: "http://localhost:8080/api/v1/social-media",
  cryptoSecretKey: "aofnncurgbirgoioqnvnerivbenoirevnorinveoirnbeirniogrightungreoiangi//////àçunfrjnfer29529599*--",
  production: false,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
