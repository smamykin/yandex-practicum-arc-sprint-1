import { registerApplication, start } from "single-spa";
import "./blocks/page.css"


registerApplication({
  name: "mf-footer",
  app: () => import(
      /* webpackIgnore: true */
      "http://localhost:8080/fourcheese-pizza-mf-footer.js"
      ),
  activeWhen: ["/"],
  customProps: {domElement: document.getElementById("mf-footer")} ,
});

// registerApplication({
//   name: "@fourcheese-pizza/navbar",
//   app: () =>
//     import(
//       /* webpackIgnore: true */
//       "@fourcheese-pizza/navbar"
//     ),
//   activeWhen: ["/"],
// });

start({
  urlRerouteOnly: true,
});
