import { auth } from "@/auth"; // Replace with your auth setup

export const useCurrentSession = async () => {
    const session = await auth();
    return session;
};