import prisma from "$lib/prisma";

export const load = async ({ params: { id } }) => {
  const player = await prisma.player.findUnique({
    where: { id: id },
    include: {
      group: {
        include: {
          players: true,
          assignments: {
            include: {
              quest: true,
            },
          },
        },
      },
    },
  });
	const assignments = player.group.assignments;
	player.group.assignments = assignments.filter((assignment) => {
		let now = new Date();
		return (assignment.startTime.getTime() < now.getTime());
	})
  return { player };
};

export const actions = {
  questComplete: async ({ request }) => {
    const data = await request.formData();
		const questId = String(data.get('questId'));
    const groupId = String(data.get('groupId'));
    const playerId = String(data.get('playerId'));
		const proofLink = String(data.get('proofLink'));

		await prisma.questAssignment.update({
			where: {
				questId_groupId: {
					questId: questId,
					groupId: groupId,
				}
			},
			data: {
				status: true,
				proofLink: proofLink,
			}
		});

		const { points } = await prisma.quest.findUnique({
			where: {
				id: questId
			},
			select: {
				points: true
			}
		});

		await prisma.group.update({
			where: {
				id: groupId
			},
			data: {
				points: {
					increment: points
				}
			}
		})

		console.log("[ player:", playerId, "] from group:", groupId, "completed quest:", questId);
  },
};
