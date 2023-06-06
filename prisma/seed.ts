import { PrismaClient } from "@prisma/client";
import { generateManyUser } from "../lib/faker/users.js";

const prisma = new PrismaClient();

async function main() {
	await prisma.authUser.deleteMany();
	const count = 40;

	const data = generateManyUser(count);
	const users = await prisma.authUser.createMany({ data });

	console.log(`created ${users.count} users`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
