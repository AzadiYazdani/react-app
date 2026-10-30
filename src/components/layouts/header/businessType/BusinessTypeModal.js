import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import BusinessTypeSelected from "./BusinessTypeSelected";
import BusinessTypeTree from "./BusinessTypeTree";
import { makeBusinessTypeTree } from "./businessTypeUtils";
import "./BusinessTypeModal.css";

export default function BusinessTypeModal({
    businessType,
    businessTypeModal
}) {
    const [search, setSearch] = useState("");

    const businessTypes =
        Array.isArray(businessType.businessTypes)
            ? businessType.businessTypes
            : [];

    const selectedBusinessTypes =
        Array.isArray(businessType.tempSelectedBusinessTypes)
            ? businessType.tempSelectedBusinessTypes
            : [];

    const fullTree = makeBusinessTypeTree(businessTypes);

    // فیلتر درخت بر اساس جستجو
    // درون کامپوننت BusinessTypeModal
    const filterTree = (nodes, query) => {
      if (!query.trim()) return nodes;
      const lowerQuery = query.trim().toLowerCase();

      return nodes.reduce((acc, node) => {
        const titleMatch = (node.title || '').toLowerCase().includes(lowerQuery);
        const filteredChildren = node.children?.length
          ? filterTree(node.children, query)
          : [];

        if (titleMatch || filteredChildren.length > 0) {
          acc.push({
            ...node,
            children: titleMatch ? node.children : filteredChildren,
          });
        }
        return acc;
      }, []);
    };

    const businessTypeTree = filterTree(fullTree, search);

    // ---------- DEBUG LOGS (COPY THESE) ----------
    console.log('===== DEBUG START =====');
    console.log('Search query:', `"${search}"`);
    console.log('Full tree length:', fullTree.length);
    console.log('First node in fullTree:', fullTree[0]);
    console.log('Business type tree (filtered) length:', businessTypeTree.length);
    console.log('Filtered tree output:', businessTypeTree);
    console.log('===== DEBUG END =====');
    // --------------------------------------------

    return (
        <Modal
            className="app-right-to-left business-type-modal"
            show={businessTypeModal.businessTypeModalShow}
            onHide={businessTypeModal.handleBusinessTypeModalClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>نوع کسب و کار</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* لیست انتخاب‌شده‌ها (با دکمه پاک کردن همه در انتها) */}
                <div className="business-selected-list">
                    {selectedBusinessTypes.length > 0 ? (
                        <>
                            {/* چیپ‌های انتخاب‌شده */}
                            {selectedBusinessTypes.map(item => (
                                <BusinessTypeSelected
                                    key={item.id}
                                    businessType={item}
                                    onBusinessTypeRemoved={businessType.onBusinessTypeRemoved}
                                />
                            ))}
                            {/* دکمه پاک کردن همه (آخرین فرزند) */}
                            <button
                                type="button"
                                className="business-clear-all-inline"
                                onClick={businessType.onClearBusinessTypes}
                            >
                                پاک کردن همه
                            </button>
                        </>
                    ) : (
                        <div className="business-empty-message">
                            یک دسته بندی را انتخاب کنید
                        </div>
                    )}
                </div>

                {/* جستجو */}
                <div className="business-search">
                    <i className="bi bi-search" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="جستجو در نوع کسب و کار"
                    />
                </div>

                {/* درخت */}
               <div className="business-tree-list">
                 {businessTypeTree.map(item => (
                   <BusinessTypeTree
                     key={item.id}
                     item={item}
                     selectedBusinessTypes={selectedBusinessTypes}
                     onBusinessTypeAdded={businessType.onBusinessTypeAdded}
                     onBusinessTypeRemoved={businessType.onBusinessTypeRemoved}
                     isSearching={search.trim().length > 0}   // <-- add this line
                   />
                 ))}
               </div>
            </Modal.Body>

            <Modal.Footer>
                <Button className="business-confirm" onClick={businessTypeModal.submitBusinessTypes}>
                    تایید
                </Button>
                <Button className="business-cancel" onClick={businessTypeModal.cancelBusinessTypes}>
                    انصراف
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
