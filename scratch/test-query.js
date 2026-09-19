const { ConvexHttpClient } = require("convex/browser");
const client = new ConvexHttpClient("https://clever-trout-946.eu-west-1.convex.cloud");
async function main() {
  const result = await client.query("testEnv:getEnv");
  console.log("ENV VAR:", result);
}
main();
