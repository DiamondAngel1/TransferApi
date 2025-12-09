import { useEffect, useState } from "react";
import axios from "axios";
import type {IUserProfile} from "../Interfaces/user/IUserProfile.ts";
import APP_ENV from "../env";

function ProfilePage() {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<IUserProfile>(
                    `${APP_ENV.API_BASE_URL}/api/Account/me`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error("Помилка при отриманні міст:", error);
            }finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
if (loading) {
    return <p>Завантаження...</p>
}
if (!user) {
    return <p>Не вдалось отримати данні користувача</p>
}

    return (
        <div className={"justify-items-center"} style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h2>Профіль користувача</h2>
            <img
                src={`${APP_ENV.API_BASE_URL}/Images/${user.image}`}
                alt="User avatar"
                style={{ width: "150px", borderRadius: "50%" }}
            />
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Ім’я:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
        </div>
    );
}

export default ProfilePage;