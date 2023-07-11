import prisma from "$lib/prisma";

export const load = async () => {
  // get all players
  const players = await prisma.player.findMany();
  // get all groups
  const groups = await prisma.group.findMany({ include: { players: true } });
  console.log("[ admin ] queried players: ", players);
  console.log("[ admin ] queried groups: ", groups);

  return { players: players, groups: groups };
};

export const actions = {
  groupCreate: async ({ request }) => {
    const data = await request.formData();
    const groupId = String(data.get("groupId"));

    await prisma.group.upsert({
      where: {
        id: groupId,
      },
      update: {},
      create: {
        id: groupId,
        demerits: 0,
        points: 0,
      },
    });

    console.log(`[ admin ] created group ${groupId}`);
  },

  groupAdd: async ({ request }) => {
    const data = await request.formData();
    const groupId = String(data.get("groupId"));
    const playerIds = data.getAll("player");

    await prisma.group.upsert({
      where: {
        id: groupId,
      },
      update: {},
      create: {
        id: groupId,
        demerits: 0,
        points: 0,
      },
    });

    await prisma.player.updateMany({
      where: {
        id: { in: playerIds },
      },
      data: {
        groupId: groupId,
      },
    });

    console.log("[ admin ] added players:", playerIds, "to group:", String(groupId));
  },

  groupDelete: async ({ request }) => {
    const data = await request.formData();
    const groupIds = data.getAll("group");

    await prisma.player.updateMany({
      where: { groupId: { in: groupIds } },
      data: {
        groupId: null,
      },
    });
    await prisma.group.deleteMany({
      where: { id: { in: groupIds } },
    });

    console.log(`[ admin ] deleted groups: ${groupIds}`);
  },

  playerDelete: async ({ request }) => {
    const data = await request.formData();
    const playerIds = data.getAll("player");

    await prisma.player.deleteMany({
      where: { id: { in: playerIds } },
    });

    console.log(`[ admin ] deleted players: ${playerIds}`);
  },
};
