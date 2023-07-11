import prisma from "$lib/prisma";

export const load = (async ({ params: { id } }) => {
	const player = await prisma.player.findUnique({
			where: { id: id },
			include: { group: true },
	});

	return { player };
})