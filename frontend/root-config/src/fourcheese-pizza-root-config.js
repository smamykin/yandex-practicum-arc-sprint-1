import { registerApplication, start } from "single-spa";
import "./blocks/page.css"

registerApplication({
  name: "mf-header",
  app: () => import(
      /* webpackIgnore: true */
      "http://localhost:8083/fourcheese-pizza-mf-header.js"
      ),
  activeWhen: ["/"],
  customProps: {domElement: document.getElementById("mf-header")} ,
});

registerApplication({
  name: "mf-footer",
  app: () => import(
      /* webpackIgnore: true */
      "http://localhost:8080/fourcheese-pizza-mf-footer.js"
      ),
  activeWhen: ["/"],
  customProps: {domElement: document.getElementById("mf-footer")} ,
});

registerApplication({
  name: "mf-auth",
  app: () => import(
      /* webpackIgnore: true */
      "http://localhost:8081/fourcheese-pizza-mf-auth.js"
      ),
  activeWhen: [""],
  customProps: {domElement: document.getElementById("mf-auth")} ,
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
