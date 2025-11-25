import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

type FieldProps = {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    onFocus?: () => void;

    /** For Select type fields */
    options?: { label: string; value: string }[];
    component?: "input" | "select";
}

function FormField({
    label,
    type = "text",
    placeholder = "Enter your " + label.toLowerCase(),
    value = "",
    options,
    onChange,
    required,
    component = "input",
    onFocus
}: FieldProps) {
    return (
        <div className="w-full">
            <Label className="form-label mb-2">{label}{required && " *"}</Label>

            {component === "select" ? (
                <div onFocus={onFocus}>
                    <Select value={value} onValueChange={(val) => onChange?.(val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                            {options?.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ) : (
                <Input
                    className="w-full"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    required={required}
                    onFocus={onFocus}
                />
            )}
        </div>
    );
}

export default FormField;