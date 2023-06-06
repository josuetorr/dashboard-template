import { fakerFR_CA as fakie } from "@faker-js/faker";
import { Role, type AuthUser } from "@prisma/client";

type UserData = Omit<AuthUser, "id" | "createdAt" | "updatedAt">;
const generateUser = (includeMythical = false): UserData => ({
	firstname: fakie.person.firstName(),
	lastname: fakie.person.lastName(),
	email: fakie.internet.email(),
	phone: fakie.phone.number("###-###-####"),
	is_deleted: false,
	role: fakie.helpers.arrayElement(
		includeMythical
			? [Role.POKEMON, Role.GYM_LEADER, Role.LEGENDARY, Role.MYTHICAL]
			: [Role.POKEMON, Role.GYM_LEADER, Role.LEGENDARY],
	),
});

export const generateManyUser = (count: number) => {
	const users: UserData[] = [];

	for (let i = 0; i < count; i++) {
		users.push(generateUser());
	}

	return users;
};
