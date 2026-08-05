import "./ProvinceModal.css";

export default function ProvinceButton({
    province,
    onProvinceClick
}) {

    return (

        <button
            type="button"
            className="province-item"
            onClick={() => onProvinceClick(province.id)}
        >

            <span>
                {province.title}
            </span>

            <i className="bi bi-chevron-left"></i>

        </button>

    );

}
