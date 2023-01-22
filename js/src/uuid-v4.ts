import { version as uuidVersion } from "uuid";
import { z } from "zod";

import type { Nominal } from "./-private/utils.js";

export type UUIDv4 = Nominal<string, "UUIDv4">;

export const UUIDv4 = z.string().refine(
  (s): s is UUIDv4 => {
    try {
      return uuidVersion(s) == 4;
    } catch {
      return false;
    }
  },
  (val) => ({ message: `${val} is not a valid v4 UUID` })
);
