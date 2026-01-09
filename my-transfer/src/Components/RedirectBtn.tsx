import {useNavigate} from "react-router-dom";

function RedirectBtn() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/admin-panel")}
            className="hover:text-gray-200 transition flex items-center font-medium"
        >
            Перейти на адмін панель
        </button>
    );
};

export default RedirectBtn;