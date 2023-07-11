import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		const id = String(data.get('name'));

		const player = await prisma.player.findUnique({
			where: { id: id },
		});

		if (!player) {
			await prisma.player.create({
				data: {
					id: id
				}
			})
			console.log('created player: ', id);
		}
		console.log('serving player: ', id);
		throw redirect(303, `/players/${id}`);
	}
};