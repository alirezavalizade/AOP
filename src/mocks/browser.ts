import { setupWorker } from "msw/browser";
import { handlers } from "./data-handlers";

export const worker = setupWorker(...handlers);

