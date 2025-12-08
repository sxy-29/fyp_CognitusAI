import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useForm  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "./FormField";
import getTooltips from "./ConnectionTooltips";
import { connectors } from "@/pages/dataConnector/DataConnectorsPage";

type Props = {
    open: boolean;
    onClose: () => void;
    type: "MySQL" | "PostgreSQL" | "Supabase";
    onConnect: (data: Record<string, string>) => void;
}

const connectorSchema = z.object({
    type: z.string(),
    connectType: z.enum(["direct", "ssh"]),

    connectionName: z.string().min(1, "Connection Name is required"),
    user: z.string().min(1, "User is required"),
    password: z.string().min(1, "Password is required"),
    host: z.string().min(1, "Host is required"),
    port: z.string().min(1, "Port is required"),
    database: z.string().min(1, "Database is required"),

    // SSH fields
    ssh_host: z.string().optional(),
    ssh_port: z.string().optional(),
    ssh_username: z.string().optional(),
    ssh_password: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.connectType !== "ssh") {
        // Do NOT validate SSH fields
        return;
    }

    const requiredFields = ["ssh_host", "ssh_port", "ssh_username"];

    if (data.type === "MySQL") {
        requiredFields.push("ssh_password");
    }

    for (const field of requiredFields) {
        const value = data[field as keyof ConnectorForm];
        if (!value || value.trim() === "") {
            ctx.addIssue({
                code: "custom",
                message: `${field.replace("ssh_", "SSH ")} is required`,
                path: [field],
            });
        }
    }
});

type ConnectorForm = z.infer<typeof connectorSchema>;

function DatabaseConnectorModel({ open, onClose, type, onConnect }: Props) {
    const { handleSubmit, register, reset, control, setValue, clearErrors, formState: { errors }, } = useForm<ConnectorForm>({
        resolver: zodResolver(connectorSchema)
    });
    const [connectType, setConnectType] = useState<"direct" | "ssh">("direct");

    // Update the information when input being focus
    const [fieldFocused, setFocusField] = useState<string>('');
    const [tooltips, setTooltips] = useState<string>('');

    // Reset form when modal is closed
    useEffect(() => {
        if (!open) {
            reset();
            setConnectType("direct");
            setValue("connectType", "direct", { shouldValidate: true });
            setFocusField('');
            setTooltips('');
        }
    }, [open, reset]);

    const baseFields: { key: keyof ConnectorForm; label: string; placeholder?: string; type?: string }[] = [
        { key: "connectionName", label: "Connection Name", placeholder: "Enter a name for this connection" },
        { key: "user", label: "user" },
        { key: "password", label: "password", type: "password" },
        { key: "host", label: "host" },
        { key: "port", label: "port" },
        { key: "database", label: "database" },
    ];

    const sshFieldsPostgres: { key: keyof ConnectorForm; label: string; type?: string }[] = [
        { key: "ssh_host", label: "ssh_host", type: "text" },
        { key: "ssh_port", label: "ssh_port" },
        { key: "ssh_username", label: "ssh_username" },
    ];

    const sshFieldsMySQL: { key: keyof ConnectorForm; label: string; type?: string }[] = [
        ...sshFieldsPostgres,
        { key: "ssh_password", label: "ssh_password", type: "password" },
    ];

    const showSSH = type !== "Supabase" && connectType === "ssh";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg sm:max-w-[800px] w-full max-h-[80vh] flex flex-col p-6">
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-lg font-semibold">
                        Create {type} Connector
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                    <form id="connector-form"
                        onSubmit={handleSubmit(onConnect)}
                        onClick={(e) => {
                            if (!(e.target as HTMLElement).closest("input")) {
                                setFocusField("");
                                setTooltips("");
                            }
                        }}>

                        <input type="hidden" {...register("type")} />
                        <input type="hidden" {...register("connectType")} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4 ">
                                {type !== "Supabase" && (
                                    <FormField
                                        label="Mode"
                                        component="select"
                                        value={connectType}
                                        onChange={(val) => {
                                            setConnectType(val as "direct" | "ssh");
                                            setValue("connectType", val as "direct" | "ssh", { shouldValidate: true });
                                            setValue("type", type, { shouldValidate: true });

                                            if (val === "direct") {
                                                // Clear SSH field values
                                                setValue("ssh_host", "", { shouldValidate: false });
                                                setValue("ssh_port", "", { shouldValidate: false });
                                                setValue("ssh_username", "", { shouldValidate: false });
                                                setValue("ssh_password", "", { shouldValidate: false });
                                                clearErrors(["ssh_host", "ssh_port", "ssh_username", "ssh_password"]);
                                            }

                                        }}
                                        options={[
                                            { label: "Direct", value: "direct" },
                                            { label: "SSH", value: "ssh" },
                                        ]}
                                        onFocus={() => {
                                            setFocusField("");
                                            setTooltips("");
                                        }}
                                    />
                                )}

                                {baseFields.map((field) => (
                                    <FormField
                                        key={field.key}
                                        label={field.label}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        register={register(field.key)}
                                        error={errors[field.key]?.message}
                                        required={true}
                                        onFocus={() => {
                                            setFocusField(field.label);
                                            setTooltips(getTooltips({ type, field: showSSH && field.key !== "connectionName" ? field.key + "_ssh" : field.key }));
                                        }}
                                    />
                                ))}

                                {showSSH && (
                                    <>
                                        {(type === "PostgreSQL" ? sshFieldsPostgres : sshFieldsMySQL).map((field) => (
                                            <FormField
                                                key={field.key}
                                                label={field.label}
                                                type={field.type}
                                                register={register(field.key)}
                                                error={errors[field.key]?.message}
                                                required={true}
                                                onFocus={() => {
                                                    setFocusField(field.label);
                                                    setTooltips(getTooltips({ type, field: field.key }));
                                                }}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>

                            <div className="w-full bg-gray-50 rounded-xl p-4 text-sm text-gray-700 flex flex-col space-y-6">
                                <div className="flex flex-col justify-center items-center mb-6">
                                    <img src={connectors.find(c => c.name === type)?.icon} alt={`${type} logo`} className="w-12 h-12 mb-3" />
                                    <h4 className="font-semibold text-text-title-light text-base">
                                        {control._formValues.connectionName || type}
                                    </h4>
                                </div>

                                {(tooltips != '') ? (
                                    <div className="rounded-lg border border-border p-4 shadow-sm">
                                        <p className="font-semibold text-base mb-2">{fieldFocused}</p>
                                        <p className="leading-relaxed text-sm">{tooltips}</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="leading-relaxed mb-3">
                                            Data Connectors allows you to connect to data sources like {type} by securely providing your credentials to the AI.
                                        </p>
                                        <p className="leading-relaxed mb-3">
                                            Once a connector is enabled, it is available for the entire chat, allowing the AI to access and query your data contextually across interactions.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                <DialogFooter className="pt-4 col-span-full">
                    <Button form="connector-form" type="submit" className="w-full">
                        Connect
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}

export default DatabaseConnectorModel;