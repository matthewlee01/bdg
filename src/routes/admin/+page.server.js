import prisma from "$lib/prisma";

export const load = async () => {
  const players = await prisma.player.findMany();
  const groups = await prisma.group.findMany({
    include: { players: true, assignments: true },
  });
  const quests = await prisma.quest.findMany();
  console.log(
    "[ admin ] queried players:",
    players.map((player) => player.id)
  );
  console.log(
    "[ admin ] queried groups:",
    groups.map((group) => group.id)
  );
  console.log(
    "[ admin ] queried quests:",
    quests.map((quest) => quest.id)
  );

  return { players: players, groups: groups, quests: quests };
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

    console.log("[ admin ] created group", groupId);
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

    console.log(
      "[ admin ] added players:",
      playerIds,
      "to group:",
      String(groupId)
    );
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

    console.log("[ admin ] deleted groups:", groupIds);
  },

  playerDelete: async ({ request }) => {
    const data = await request.formData();
    const playerIds = data.getAll("player");

    await prisma.player.deleteMany({
      where: { id: { in: playerIds } },
    });

    console.log("[ admin ] deleted players:", playerIds);
  },

  questCreate: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("questId");
    const description = data.get("questDescription");
    const participants = data.get("questParticipants") || null;
    const points = data.get("questPoints");
    const demerits = data.get("questDemerits");
    const location = data.get("questLocation") || null;
    const fields = {
      id: id,
      description: description,
      participants: parseInt(participants),
      points: parseInt(points),
      demerits: parseInt(demerits),
      location: location,
    };

    await prisma.quest.upsert({
      where: { id: id },
      update: fields,
      create: fields,
    });

    console.log("[ admin ] created quest:", fields);
  },

  questDelete: async ({ request }) => {
    const data = await request.formData();
    const questIds = data.getAll("quest");

    await prisma.quest.deleteMany({
      where: { id: { in: questIds } },
    });

    console.log("[ admin ] deleted quests:", questIds);
  },

  questAssign: async ({ request }) => {
    const data = await request.formData();
    const questIds = data.getAll("quest");
    const groupId = data.get("groupId");
    const today = new Date();
    const localDateString = String(data.get("localDateString"));
    const startTimeString = data.get("startTime") || null;
    let startTime;
    if (startTimeString) {
      startTime = new Date(localDateString + " " + String(startTimeString));
      if (!process.env.LOCAL_DEV) {
        startTime = new Date(startTime.getTime() + 25200000)
      }
    }
    const endTimeString = data.get("endTime") || null;
    let endTime;
    if (endTimeString) {
      endTime = new Date(localDateString + " " + String(endTimeString));
      if (!process.env.LOCAL_DEV) {
        endTime = new Date(endTime.getTime() + 25200000)
      }
    }

    for (const questId of questIds) {
      const fields = {
        questId: questId,
        groupId: groupId,
        startTime: startTime,
        endTime: endTime,
        status: false,
      };
      await prisma.questAssignment.upsert({
        where: {
          questId_groupId: {
            questId: questId,
            groupId: groupId,
          },
        },
        create: fields,
        update: fields,
      });

      new Promise((resolve) => {
        setTimeout(() => resolve(), endTime.getTime() - new Date().getTime());
      })
        .then(async () => {
          await prisma.questAssignment.update({
            where: {
              questId_groupId: {
                questId: questId,
                groupId: groupId,
              },
            },
            data: {
              status: true,
              proofLink: null,
            },
          });

          const { demerits } = await prisma.quest.findUnique({
            where: {
              id: questId,
            },
            select: {
              demerits: true,
            },
          });

          await prisma.group.update({
            where: {
              id: groupId,
            },
            data: {
              demerits: {
                increment: demerits,
              },
            },
          });
          console.log(
            "[ admin ] quest: ",
            questId,
            "has expired for group:",
            groupId
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log("[ admin ] assigned quests:", questIds, "to group:", groupId);
  },
};
