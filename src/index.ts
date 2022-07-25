import { loginUser } from "./authentication/login";
import { registerUser } from "./authentication/register";
import { authenticated, status } from "./events/authEvent";

export default {
    authentication: {
        loginUser,
        registerUser,
        events: {
            authenticated,
            status
        }
    }
};
