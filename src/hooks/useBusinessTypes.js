import { useEffect, useState } from "react";
import { getBusinessTypes } from "../api/businessTypeApi";

export default function useBusinessTypes() {

    const [businessTypes, setBusinessTypes] = useState([]);
    const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);
    const [tempSelectedBusinessTypes, setTempSelectedBusinessTypes] = useState([]);

    const beginBusinessTypeSelection = () => {
        setTempSelectedBusinessTypes([...selectedBusinessTypes]);
    };

    const cancelBusinessTypeSelection = () => {
        setTempSelectedBusinessTypes([]);
    };

    const confirmBusinessTypeSelection = () => {
        setSelectedBusinessTypes(tempSelectedBusinessTypes);
    };
    const [numberOfBusinessTypes, setNumberOfBusinessTypes] =
        useState("نوع کسب و کار");

    // دریافت لیست انواع کسب و کار
    useEffect(() => {
        getBusinessTypes()
            .then(setBusinessTypes)
            .catch(console.error);
    }, []);

    // افزودن
    const onBusinessTypeAdded = (id, title) => {
        const found = tempSelectedBusinessTypes.find(
            businessType => businessType.id === id
        );

        if (!found) {
            setTempSelectedBusinessTypes([
                ...tempSelectedBusinessTypes,
                { id, title }
            ]);
        }
    };

    // حذف
    const onBusinessTypeRemoved = (checkedId) => {
        setTempSelectedBusinessTypes(
            tempSelectedBusinessTypes.filter(
                businessType => businessType.id !== checkedId
            )
        );
    };

    const onClearBusinessTypes = () => {
        setTempSelectedBusinessTypes([]);
    };

    // متن نمایش داده شده
    useEffect(() => {

        if (selectedBusinessTypes.length === 0) {
            setNumberOfBusinessTypes("نوع کسب و کار");
        }
        else if (selectedBusinessTypes.length === 1) {
            setNumberOfBusinessTypes(selectedBusinessTypes[0].title);
        }
        else if (selectedBusinessTypes.length === 2) {
            setNumberOfBusinessTypes(
                `${selectedBusinessTypes[0].title}, ${selectedBusinessTypes[1].title}`
            );
        }
        else {
            setNumberOfBusinessTypes(
                `${selectedBusinessTypes[0].title}, ${selectedBusinessTypes[1].title}...`
            );
        }

    }, [selectedBusinessTypes]);

   return {
       businessTypes,
       selectedBusinessTypes,
       tempSelectedBusinessTypes,
       numberOfBusinessTypes,

       onBusinessTypeAdded,
       onBusinessTypeRemoved,
       onClearBusinessTypes,

       beginBusinessTypeSelection,
       cancelBusinessTypeSelection,
       confirmBusinessTypeSelection
   };
}
