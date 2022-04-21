import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(404).json({ error: "Method not allowed" });
  }
  try {
    const { id } = req.body;

    await prisma.thumbUp.deleteMany({
      where: {
        answerId: id,
      },
    });

    await prisma.thumbDown.deleteMany({
      where: {
        answerId: id,
      },
    });

    await prisma.notification.deleteMany({
      where: {
        answerId: Number(id),
      },
    });

    await prisma.answer.delete({
      where: {
        id,
      },
    });

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ error });
  }
}
