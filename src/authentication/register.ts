import { genSaltSync, hashSync } from "bcrypt";
import { authenticated, status } from "../events/authEvent";
import { createUser } from "../user/create";

export const registerUser = (username: string, password: string): boolean => {
    const hashedPassword = hashSync(password, genSaltSync(2048));

    try {
        const created = createUser(username, hashedPassword);

        if (created.pass) {
            authenticated.next({ user: { id: created.user.id!, username: created.user.username! } });
            status.next(true);

            return true;
        } else {
            status.next(false);

            return false;
        }
    } catch (error) {
        status.next(false);
        
        return false;
    }
};