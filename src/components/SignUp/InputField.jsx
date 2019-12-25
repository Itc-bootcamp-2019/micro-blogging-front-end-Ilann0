import React from "react";

function InputField(props) {
	const {
		fieldName,
		className,
		id,
		type,
		onChange,
		value,
		regExPattern,
		placeholder,
	} = props;
	return (
		<div className={className}>
			{fieldName && <label htmlFor={id}>{fieldName}</label>}
			<input
				id={id}
				type={type ? type : 'text'}
				pattern={regExPattern ? regExPattern : null}
				onChange={onChange}
				value={value}
				placeholder={placeholder ? placeholder : null}
			/>
		</div>
	);
}

export default InputField;