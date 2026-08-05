import { Button, Modal } from "react-bootstrap";
import React from "react";
import BusinessTypeSelected from "./BusinessTypeSelected";
import BusinessTypeTree from "./BusinessTypeTree";
import { makeBusinessTypeTree } from "./businessTypeUtils";
import "./BusinessTypeModal.css";


export default function BusinessTypeModal({
    businessType,
    businessTypeModal
}) {

    const businessTypes =
        Array.isArray(businessType.businessTypes)
            ? businessType.businessTypes
            : [];

    const selectedBusinessTypes =
        Array.isArray(businessType.tempSelectedBusinessTypes)
            ? businessType.tempSelectedBusinessTypes
            : [];


    const businessTypeTree = makeBusinessTypeTree(businessTypes);
    return (
        <Modal
            className="app-right-to-left business-type-modal"
            show={businessTypeModal.businessTypeModalShow}
            onHide={businessTypeModal.handleBusinessTypeModalClose}
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>
                    نوع کسب و کار
                </Modal.Title>
            </Modal.Header>


            <Modal.Body>
            {
                selectedBusinessTypes.length > 0 && (
                    <div className="business-selected-header">

                        <button
                            type="button"
                            className="business-clear-all"
                            onClick={businessType.onClearBusinessTypes}
                        >
                            پاک کردن همه
                        </button>
                    </div>
                )
            }

                <div className="business-selected-list">
                    {
                        selectedBusinessTypes.map(item => (
                            <BusinessTypeSelected
                                key={item.id}
                                businessType={item}
                                onBusinessTypeRemoved={
                                    businessType.onBusinessTypeRemoved
                                }
                            />
                        ))
                    }
                </div>

                {
                    businessTypeTree.map(item => (
                        <BusinessTypeTree
                            key={item.id}
                            item={item}
                            selectedBusinessTypes={
                                selectedBusinessTypes
                            }
                            onBusinessTypeAdded={
                                businessType.onBusinessTypeAdded
                            }
                            onBusinessTypeRemoved={
                                businessType.onBusinessTypeRemoved
                            }
                        />

                    ))
                }


            </Modal.Body>



            <Modal.Footer>

                <Button
                    className="business-confirm"
                    onClick={
                        businessTypeModal.submitBusinessTypes
                    }
                >
                    تایید
                </Button>


               <Button
                   className="business-cancel"
                   onClick={
                       businessTypeModal.cancelBusinessTypes
                   }
               >
                   انصراف
               </Button>

            </Modal.Footer>
        </Modal>
    );
}
