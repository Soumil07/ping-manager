import { Awaited, Piece } from "@sapphire/framework";
import type { PartialResponseValue } from "@lib/database/entities/TaskEntity";

export default abstract class Task extends Piece {

    public abstract run(data: unknown): Awaited<PartialResponseValue | null>;

}