import { Subject } from "rxjs";
import { AuthenticatedEvent } from "../types/AuthenticatedEvent";

export const authenticated =  new Subject<AuthenticatedEvent>();
export const status = new Subject<boolean>();