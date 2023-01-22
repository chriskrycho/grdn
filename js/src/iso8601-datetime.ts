import { z } from "zod";
import { DateTime } from "luxon";

import type { Nominal } from "./-private/utils.js";

type ISO8601DateTime = Nominal<DateTime, "IS08601">;

export const ISO8601DateTime = z.string().transform((s, ctx) => {
  let result = DateTime.fromISO(s);
  if (!result.isValid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${s} is not a valid ISO8601 date or date-time`,
    });
    return z.NEVER;
  }

  return result as ISO8601DateTime;
});
