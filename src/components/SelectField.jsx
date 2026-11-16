import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef } from "react";
import "./SelectField.css";

const SelectField = forwardRef(function SelectField(
  {
    id,
    options,
    value,
    onValueChange,
    placeholder,
    required = false,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedby,
    "aria-labelledby": ariaLabelledby,
  },
  ref,
) {
  return (
    <Select.Root value={value} onValueChange={onValueChange} required={required}>
      <Select.Trigger
        ref={ref}
        id={id}
        className="select-field__trigger"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        aria-labelledby={ariaLabelledby}
        aria-required={required || undefined}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="select-field__icon" aria-hidden="true">
          <ChevronDown size={16} strokeWidth={1.8} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="select-field__content"
          position="popper"
          sideOffset={4}
        >
          <Select.ScrollUpButton className="select-field__scroll-button" aria-label="Ver opciones anteriores">
            <ChevronUp size={16} aria-hidden="true" />
          </Select.ScrollUpButton>
          <Select.Viewport className="select-field__viewport">
            <Select.Group>
              {options.map((option) => (
                <Select.Item
                  className="select-field__item"
                  key={option}
                  value={option}
                >
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator className="select-field__indicator">
                    <Check size={16} aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="select-field__scroll-button" aria-label="Ver más opciones">
            <ChevronDown size={16} aria-hidden="true" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
});

export default SelectField;
