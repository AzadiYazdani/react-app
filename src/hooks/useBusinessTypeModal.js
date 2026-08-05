import { useState } from "react";

export default function useBusinessTypeModal(
    beginBusinessTypeSelection,
    cancelBusinessTypeSelection,
    confirmBusinessTypeSelection
) {

    const [businessTypeModalShow, setBusinessTypeModalShow] = useState(false);


    const handleBusinessTypeModalShow = () => {
        beginBusinessTypeSelection();
        setBusinessTypeModalShow(true);
    };


    const handleBusinessTypeModalClose = () => {
        setBusinessTypeModalShow(false);
    };


    const submitBusinessTypes = () => {

        confirmBusinessTypeSelection();

        handleBusinessTypeModalClose();
    };


    const cancelBusinessTypes = () => {

        cancelBusinessTypeSelection();

        handleBusinessTypeModalClose();
    };


    return {
        businessTypeModalShow,
        handleBusinessTypeModalShow,
        handleBusinessTypeModalClose,
        submitBusinessTypes,
        cancelBusinessTypes
    };
}
