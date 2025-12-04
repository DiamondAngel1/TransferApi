import { useEffect, useState } from "react";
import axios from "axios";
import type {IUserProfile} from "../Interfaces/IUserProfile.ts";

function ProfilePage() {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<IUserProfile>(
                    "http://localhost:5149/api/Account/user",
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
                src={`http://localhost:5149/Images/${user.image}`}
                alt="User avatar"
                style={{ width: "150px", borderRadius: "50%" }}
            />
            <p><strong>Ім’я:</strong> {user.firstName}</p>
            <p><strong>Прізвище:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phoneNumber}</p>
            <p><strong>Ролі:</strong> {user.roles.join(", ")}</p>
        </div>
    );
}

export default ProfilePage;