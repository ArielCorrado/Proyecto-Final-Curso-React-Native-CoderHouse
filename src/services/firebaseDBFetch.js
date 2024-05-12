import { firebaseRealtimeDbUrl } from "../databases/firebase/realtimeDatabase";

export const getFirebaseDBUserData = async (userId, field) => {
    try {
        const response = await fetch(`${firebaseRealtimeDbUrl}usersData/${userId}/${field}.json`);
        const data = await response.json();
        return {success: true, data: data};
    } catch (error) {
        return {success: false, error: error};
    }
}