import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

type FieldProps = {
    label: string;
    type?: string;
    placeholder?: string;
    // RHF register (for input)
    register?: any;
    error?: string;

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
    register,
    error,
    value = "",
    onChange,
    required,
    onFocus,
    options,
    component = "input"
}: FieldProps) {
    return (
        <div className="w-full">
            <Label className="form-label mb-2">{label}{required && " *"}</Label>

            {component === "select" ? (
                <div onFocus={onFocus}>
                    <Select value={value} onValueChange={onChange}>
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
                    className={`w-full ${error ? "border-red-500" : ""}`}
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    onFocus={onFocus}
                />
            )}
            {error && (
                <p className="text-red-600 text-sm mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormField;