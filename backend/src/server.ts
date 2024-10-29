import cors from "@fastify/cors";
import { Entry } from "@prisma/client";
import fastify from "fastify";
import Prisma from "./db";

export const server = fastify();

server.register(cors, {});

server.get<{ Reply: Entry[] }>("/get/", async (req, reply) => {
  const dbAllEntries = await Prisma.entry.findMany({});
  reply.send(dbAllEntries);
});

server.get<{ Body: Entry; Params: { id: string } }>("/get/:id", async (req, reply) => {
  const dbEntry = await Prisma.entry.findUnique({
    where: { id: req.params.id },
  });
  if (!dbEntry) {
    reply.status(500).send({ msg: `Error finding entry with id ${req.params.id}` });
  }
  reply.send(dbEntry);
});

server.post<{ Body: Entry }>("/create/", async (req, reply) => {
  let newEntryBody = req.body;
  newEntryBody.created_at
    ? (newEntryBody.created_at = new Date(req.body.created_at))
    : (newEntryBody.created_at = new Date());
  if (req.body.scheduled_for) {
    newEntryBody.scheduled_for = new Date(req.body.scheduled_for);
  }

  try {
    const createdEntryData = await Prisma.entry.create({ data: req.body });
    reply.send(createdEntryData);
  } catch {
    reply.status(500).send({ msg: "Error creating entry" });
  }
});

server.delete<{ Params: { id: string } }>("/delete/:id", async (req, reply) => {
  try {
    await Prisma.entry.delete({ where: { id: req.params.id } });
    reply.send({ msg: "Deleted successfully" });
  } catch {
    reply.status(500).send({ msg: "Error deleting entry" });
  }
});

server.put<{ Params: { id: string }; Body: Entry }>("/update/:id", async (req, reply) => {
  let updatedEntryBody = req.body;
  updatedEntryBody.created_at
    ? (updatedEntryBody.created_at = new Date(req.body.created_at))
    : (updatedEntryBody.created_at = new Date());
  if (req.body.scheduled_for) {
    updatedEntryBody.scheduled_for = new Date(req.body.scheduled_for);
  }
  try {
    await Prisma.entry.update({
      data: req.body,
      where: { id: req.params.id },
    });
    reply.send({ msg: "Updated successfully" });
  } catch {
    reply.status(500).send({ msg: "Error updating" });
  }
});
