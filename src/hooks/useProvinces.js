import { useEffect, useState } from "react";

export default function useStates() {

    const [states, setStates] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8081/location/states/all")
            .then(response => response.json())
            .then(data => {
                setStates(data);
            })
            .catch(error => {
                console.error("Error loading states:", error);
            });

    }, []);

    return {
        states
    };
}
