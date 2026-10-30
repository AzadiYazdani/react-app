
import { useEffect, useState } from "react";
import userService from "../services/UserService";
import "./UserProfilePage.css";

const initialForm = {
    email: "",
    telephone: "",
    address: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    nationalCode: "",
    identityNumber: "",
    birthDate: "",
    birthCity: ""
};

const fields = [
    { name: "firstName", label: "نام", required: false },
    { name: "lastName", label: "نام خانوادگی", required: false },
    { name: "fatherName", label: "نام پدر" },
    { name: "email", label: "ایمیل", type: "email", required: true },
    { name: "telephone", label: "شماره موبایل", type: "tel" },
    { name: "nationalCode", label: "کد ملی" },
    { name: "identityNumber", label: "شماره شناسنامه" },
    { name: "birthDate", label: "تاریخ تولد", placeholder: "مثلاً 1/1/1378" },
    { name: "birthCity", label: "شهر تولد" },
    { name: "address", label: "نشانی", fullWidth: true }
];

function UserProfilePage() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            try {
                const user = await userService.getCurrentUser();

                if (active) {
                    setForm({
                        ...initialForm,
                        ...(user ?? {}),
                        email: user?.email ?? "",
                        telephone: user?.telephone ?? "",
                        address: user?.address ?? "",
                        firstName: user?.firstName ?? "",
                        lastName: user?.lastName ?? "",
                        fatherName: user?.fatherName ?? "",
                        nationalCode: user?.nationalCode ?? "",
                        identityNumber: user?.identityNumber ?? "",
                        birthDate: user?.birthDate ?? "",
                        birthCity: user?.birthCity ?? ""
                    });
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.response?.data?.localizedMessage ||
                        err.response?.data?.message ||
                        "دریافت اطلاعات پروفایل ناموفق بود."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadProfile();

        return () => {
            active = false;
        };
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));

        setMessage("");
        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setMessage("");
        setError("");

        try {
            const data = Object.fromEntries(
                Object.entries(form).map(([key, value]) => [
                    key,
                    value.trim() === "" ? null : value.trim()
                ])
            );

            const updatedUser = await userService.editCurrentUser(data);

            setForm(previous => ({
                ...previous,
                ...(updatedUser ?? {})
            }));

            setMessage("اطلاعات پروفایل با موفقیت ذخیره شد.");
        } catch (err) {
            setError(
                err.response?.data?.localizedMessage ||
                err.response?.data?.message ||
                "ذخیره اطلاعات ناموفق بود."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <div className="user-profile-status">در حال دریافت اطلاعات پروفایل...</div>;
    }

    return (
        <div className="user-profile-page" dir="rtl">
            <div className="user-profile-card">
                <h2>تکمیل و ویرایش پروفایل</h2>
                <p className="user-profile-description">
                    اطلاعات شخصی خود را وارد کنید و در پایان ذخیره کنید.
                </p>

                {message && <div className="user-profile-success">{message}</div>}
                {error && <div className="user-profile-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="user-profile-grid">
                        {fields.map(field => (
                            <div
                                className={`user-profile-field ${field.fullWidth ? "full-width" : ""}`}
                                key={field.name}
                            >
                                <label htmlFor={field.name}>
                                    {field.label}
                                    {field.required && <span className="required-mark"> *</span>}
                                </label>

                                {field.name === "address" ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={form[field.name] ?? ""}
                                        onChange={handleChange}
                                        rows={3}
                                    />
                                ) : (
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type || "text"}
                                        value={form[field.name] ?? ""}
                                        onChange={handleChange}
                                        placeholder={field.placeholder || ""}
                                        required={field.required || false}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="user-profile-save"
                        disabled={saving}
                    >
                        {saving ? "در حال ذخیره..." : "ذخیره اطلاعات"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserProfilePage;
