import "./DropdownMenu.scss";

export default function DropdownMenu({ label, value, options, onChange }) {
    return (
        <div className="dropdown-menu">
            <label className="dropdown-menu-label">{label}
                <select className="dropdown-menu-items" value={value} onChange={(e) => onChange(e.target.value)}>
                    {
                        options.map((option, optionNumber) =>
                            <option key={optionNumber} value={option.value}>{option.label}</option>
                        )
                    }
                </select>
            </label>
        </div>
    );
}