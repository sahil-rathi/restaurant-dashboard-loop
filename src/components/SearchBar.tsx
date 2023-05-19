import React, { forwardRef } from "react";

type InputFieldProps = {
  label?: string;
  ref?: React.Ref<HTMLInputElement>;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  buttonText?: string;
  buttonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const InputField = forwardRef(
  (props: InputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="input-flex-div">
        <input className="input-field"{...props} ref={ref} />
        {props.buttonText ? (
          <button style={{margin:"0px 20px"}} className="lgn-btn" onClick={props.buttonOnClick}>
            {props.buttonText}
          </button>
        ) : null}
      </div>
    );
  }
);
export default InputField;
