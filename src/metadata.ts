import { readFile } from "node:fs/promises";
import * as z from "zod/mini";

const moduleMetadataSchema = z.object({
  tag: z.optional(z.string()),
});

const releaseMetadataSchema = z.record(z.string(), moduleMetadataSchema);

function parseReleaseMetadata(input: unknown) {
  return releaseMetadataSchema.parse(input);
}

export async function readReleaseMetadata(path: string) {
  const content = await readFile(path);
  const json = JSON.parse(content.toString());
  return parseReleaseMetadata(json);
}
