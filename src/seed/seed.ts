import seedUsers from "./user.seed";
import seedProject from "./project-seed";
// import seedDocs from "./doc.seed";

export default async function seed() {
    const users = await seedUsers();
    const projects = await seedProject();
}


