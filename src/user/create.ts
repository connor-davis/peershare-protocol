import { v4 } from "uuid";
import { writeFileSync } from "fs";
import path from "path";

export const createUser = (username: string, password: string): { user: { id?: string, username?: string, password?: string }, pass: boolean } => {
    let userData = {
        id: v4(),
        username,
        password
    };

    try {
        writeFileSync(path.join(process.cwd(), "peershare-data", "users", userData.id + ".box"), JSON.stringify(userData));

        return { user: userData, pass: true };
    } catch (error) {
        return { user: {}, pass: false };
    }
}