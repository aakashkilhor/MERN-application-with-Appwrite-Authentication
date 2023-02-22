const app = require("./app");
const PORT = process.env.PORT || 4000;
// const HTTP_STATUS = require("../utils/enum");

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
