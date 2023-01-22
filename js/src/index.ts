import { URL as WebURL } from "node:url";

import { z } from "zod";

import type { Nominal } from "./-private/utils.js";
import { ISO8601DateTime } from "./iso8601-datetime.js";
import { UUIDv4 } from "./uuid-v4.js";

type Patch = Nominal<string, "patch">;
// TODO: actually figure out how to check this!
const Patch = z.string().refine((s): s is Patch => !!s);
const HasPatch = z.object({ patch: Patch });

const HasSummary = z.object({
  summary: z.string().refine(
    (s) => s.length > 5,
    (s) => ({ message: `Summary "${s}" is not at least 5 characters long` })
  ),
});

const HasSummaryAndPatch = HasSummary.merge(HasPatch);

const Change = z.union([HasSummaryAndPatch, HasSummary, HasPatch]);
type Change = z.infer<typeof Change>;

const Update = z.object({
  time: ISO8601DateTime,
  change: Change,
});

const URL = z.string().transform((s) => {
  try {
    return new WebURL(s);
  } catch {
    return z.NEVER;
  }
});

const Item = z.object({
  title: z.string(),
  id: UUIDv4,
  summary: z.string(),
  created: z.date(),
  updates: z.array(Update),
  link: URL,
});

export type Item = z.infer<typeof Item>;

export const Garden = z.object({
  title: z.string(),
  items: z.array(Item),
  last_updated: ISO8601DateTime,
});

export type Garden = z.infer<typeof Garden>;
