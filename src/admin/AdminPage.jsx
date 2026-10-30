
import { Link } from "react-router-dom";
import "./AdminPage.css";

const adminItems = [
    { title: "مدیریت کاربران", description: "مشاهده و مدیریت کاربران سامانه", path: "/admin/users" },
    { title: "مدیریت اتحادیه‌های صنفی", description: "مدیریت اتحادیه‌های صنفی شهرها", path: "/admin/business-unions" },
    { title: "مدیریت رسته‌های شغلی", description: "مدیریت رسته‌های شغلی", path: "/admin/business-categories" },
    { title: "مدیریت انواع فعالیت", description: "مدیریت انواع فعالیت‌های صنفی", path: "/admin/activity-types" }
];

function AdminPage() {
    return (
        <div className="admin-dashboard">
            <h1 className="admin-dashboard-title">پنل مدیریت</h1>
            <div className="admin-dashboard-grid">
                {adminItems.map((item) => (
                    <Link to={item.path} className="admin-dashboard-card" key={item.path}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
