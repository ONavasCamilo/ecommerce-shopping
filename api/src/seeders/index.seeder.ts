import { seedProducts } from "./products.seeder";
import { seedRoles } from "./role.seeder";

async function initSeeders() {
  console.log("Iniciando creación seeders..");
  const roleSeeders = seedRoles();
  const productSeeders = await seedProducts();
  await Promise.all([...roleSeeders, productSeeders]);
  console.log("Finished seeders");
}

export default initSeeders;
