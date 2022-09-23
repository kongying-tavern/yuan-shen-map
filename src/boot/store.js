import { boot } from "quasar/wrappers";
import store from "../stores/index";

export default boot(({ app }) => {
  console.log("boot", store());
  app.use(store());
});
