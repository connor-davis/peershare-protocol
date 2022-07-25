import { compareSync } from "bcrypt";
import { readdirSync, readFileSync, stat } from "fs";
import path from "path";
import { authenticated, status } from "../events/authEvent";
import { User } from "../types/User";

export const loginUser = (username: string, password: string): boolean => {
    try {
        const filePaths = readdirSync(path.join(process.cwd(), "peershare-data", "users"));
        const files = filePaths.map((filePath) => readFileSync(path.join(process.cwd(), "peershare-data", "users", filePath), { encoding: "utf-8" }));
        const parsedFiles = files.map((file) => JSON.parse(file));
        const typedFiles: User[] = parsedFiles.map((parsed: User) => parsed);

        const userExists: User = typedFiles.filter((user: User) => user.username === username)[0];

        if (userExists) {
            if (compareSync(password, userExists.password)) {
                authenticated.next({ user: { id: userExists.id, username: userExists.username }});
                status.next(true);

                return true;
            } else {
                status.next(false);

                return false;
            }
        } else {
            status.next(false);

            return false;
        }
    } catch (error) {
        status.next(false);
        
        return false;
    }
}