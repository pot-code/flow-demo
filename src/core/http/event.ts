import { Subject } from "rxjs"
import { HttpError } from "./error"

export const HttpErrorStream = new Subject<HttpError>()
