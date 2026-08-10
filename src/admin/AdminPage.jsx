// src/admin/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BusinessUnionList from './BusinessUnionList';
import JobCategoryList from './JobCategoryList';
import ActivityTypeList from './ActivityTypeList';
import { getBusinessUnions } from '../api/admin/businessUnionApi';
import './AdminPage.css';

export default function AdminPage() {
  const [unions, setUnions] = useState([]);

  const loadUnions = () => {
    getBusinessUnions().then(data => setUnions(data));
  };

  useEffect(() => {
    loadUnions();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>مدیریت اطلاعات پایه پروانه کسب و کار</h1>
        <Link to="/" className="back-link">↩ بازگشت به صفحه اصلی</Link>
      </div>

      {/* ردیف اول: اتحادیه‌های صنفی (تمام عرض) */}
      <div className="admin-row">
        <BusinessUnionList onUnionChange={loadUnions} />
      </div>

      {/* ردیف دوم: رسته‌های شغلی (تمام عرض) */}
      <div className="admin-row">
        <JobCategoryList unions={unions} />
      </div>

      {/* ردیف سوم: نوع فعالیت (تمام عرض) */}
      <div className="admin-row">
        <ActivityTypeList />
      </div>
    </div>
  );
}
