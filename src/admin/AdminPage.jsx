import { Link } from "react-router-dom";
import "./AdminPage.css";

const adminItems = [
    {
        number: "01",
        title: "مدیریت کاربران",
        description: "مشاهده، جست‌وجو و مدیریت حساب‌های کاربری",
        path: "/admin/users"
    },
    {
        number: "02",
        title: "مدیریت اتحادیه‌های صنفی",
        description: "ثبت و مدیریت اتحادیه‌های صنفی شهرها",
        path: "/admin/business-unions"
    },
    {
        number: "03",
        title: "مدیریت رسته‌های شغلی",
        description: "تعریف و مدیریت رسته‌های وابسته به اتحادیه‌ها",
        path: "/admin/business-categories"
    },
    {
        number: "04",
        title: "مدیریت انواع فعالیت",
        description: "ثبت و مدیریت انواع فعالیت‌های صنفی",
        path: "/admin/activity-types"
    }
];

function AdminPage() {
    return (
        <main className="admin-dashboard" dir="rtl">
            <header className="admin-dashboard-header">
                <div className="admin-dashboard-heading">
                    <span className="admin-dashboard-eyebrow">
                        مدیریت سامانه
                    </span>

                    <h1 className="admin-dashboard-title">
                        پنل مدیریت
                    </h1>

                    <p className="admin-dashboard-description">
                        از این بخش می‌توانید اطلاعات پایه و کاربران سامانه را مدیریت کنید.
                    </p>
                </div>
            </header>

            <section className="admin-dashboard-section">
                <div className="admin-dashboard-section-heading">
                    <h2>بخش‌های مدیریتی</h2>
                    <span>۴ بخش</span>
                </div>

                <div className="admin-dashboard-grid">
                    {adminItems.map((item) => (
                        <Link
                            to={item.path}
                            className="admin-dashboard-card"
                            key={item.path}
                        >
                            <div className="admin-dashboard-card-top">
                                <span className="admin-dashboard-card-number">
                                    {item.number}
                                </span>

                                <span
                                    className="admin-dashboard-card-arrow"
                                    aria-hidden="true"
                                >
                                    ←
                                </span>
                            </div>

                            <div className="admin-dashboard-card-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>

                            <span className="admin-dashboard-card-link">
                                ورود به بخش
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default AdminPage;
