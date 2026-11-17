import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useCallback, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const suppressClickAfterClose = useRef(false);

  const setTriggerRef = useCallback((node) => {
    triggerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  return (
    <Select.Root
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={onValueChange}
      required={required}
    >
      <Select.Trigger
        ref={setTriggerRef}
        id={id}
        className="select-field__trigger"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        aria-labelledby={ariaLabelledby}
        aria-required={required || undefined}
        onPointerDown={(event) => {
          if (!open) {
            suppressClickAfterClose.current = false;
            return;
          }
          if (event.button !== 0 || event.ctrlKey) return;

          suppressClickAfterClose.current = true;
          setOpen(false);
          event.preventDefault();
        }}
        onClick={(event) => {
          if (!suppressClickAfterClose.current) return;
          suppressClickAfterClose.current = false;
          // Radix opens touch triggers on click; this click belongs to the closing pointerdown.
          event.preventDefault();
        }}
        onKeyDown={() => {
          suppressClickAfterClose.current = false;
        }}
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
          onPointerDownOutside={(event) => {
            const trigger = triggerRef.current;
            const pointer = event.detail.originalEvent;
            if (!trigger || pointer.button !== 0 || pointer.ctrlKey) return;

            // The open menu disables pointer events on the trigger, so detect its hit area.
            const rect = trigger.getBoundingClientRect();
            if (
              pointer.clientX >= rect.left && pointer.clientX <= rect.right &&
              pointer.clientY >= rect.top && pointer.clientY <= rect.bottom
            ) {
              suppressClickAfterClose.current = true;
            }
          }}
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
