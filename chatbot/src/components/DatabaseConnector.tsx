import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import FormField from "./FormField";

import postgreLogo from "../assets/Postgres_logo.webp";
import mysqlLogo from "../assets/mysql_logo.webp"
import supabaseLogo from "../assets/supabase-logo.webp";

type Props = {
    open: boolean;
    onClose: () => void;
    type: "MySQL" | "PostgreSQL" | "Supabase";
    onConnect: (data: Record<string, string>) => void;
}

function DatabaseConnectorModel({ open, onClose, type, onConnect }: Props) {
    const [form, setForm] = useState<Record<string, string>>({});
    const [connectType, setConnectType] = useState<"direct" | "ssh">("direct");

    // Reset form when modal is closed
    useEffect(() => {
        if (!open) {
            setForm({});
            setConnectType("direct");
        }
    }, [open]);

    // Clear SSH fields if connectType changes to direct
    useEffect(() => {
        if (connectType === "direct") {
            setForm((prev) => {
                const newForm = { ...prev };
                delete newForm.ssh_host;
                delete newForm.ssh_port;
                delete newForm.ssh_username;
                delete newForm.ssh_password;
                return newForm;
            });
        }
    }, [connectType]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const baseFields = [
        { key: "connectionName", label: "Connection Name", placeholder: "Enter a name for this connection" },
        { key: "user", label: "user" },
        { key: "password", label: "password", type: "password" },
        { key: "host", label: "host" },
        { key: "port", label: "port" },
        { key: "database", label: "database" },
    ];

    const sshFieldsPostgres = [
        { key: "ssh_host", label: "ssh_host", type: "text" },
        { key: "ssh_port", label: "ssh_port" },
        { key: "ssh_username", label: "ssh_username" },
    ];

    const sshFieldsMySQL = [
        ...sshFieldsPostgres,
        { key: "ssh_password", label: "ssh_password", type: "password" },
    ];

    const showSSH = type !== "Supabase" && connectType === "ssh";

    const icon = type === "MySQL" ? mysqlLogo : type === "PostgreSQL" ? postgreLogo : supabaseLogo;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>
                        Create {type} Connector
                    </DialogTitle>
                </DialogHeader>

                <div className="flex gap-6 mt-4 flex-1 overflow-y-auto">
                    <div className=" pr-2 space-y-4 mt-2">
                        {type !== "Supabase" && (
                            <FormField
                                label="Mode"
                                component="select"
                                value={connectType}
                                onChange={(val) => setConnectType(val as "direct" | "ssh")}
                                options={[
                                    { label: "Direct", value: "direct" },
                                    { label: "SSH", value: "ssh" },
                                ]}
                            />
                        )}

                        {baseFields.map((field) => (
                            <FormField
                                key={field.key}
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={form[field.key] || ""}
                                onChange={(val) => handleChange(field.key, val)}
                                required
                            />
                        ))}

                        {showSSH && (
                            <>
                                {(type === "PostgreSQL" ? sshFieldsPostgres : sshFieldsMySQL).map((field) => (
                                    <FormField
                                        key={field.key}
                                        label={field.label}
                                        type={field.type}
                                        value={form[field.key] || ""}
                                        onChange={(val) => handleChange(field.key, val)}
                                        required
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <div className="ml-6 p-4 bg-gray-50 rounded-md text-sm text-gray-700 flex-1">
                        <div className="flex justify-center items-center flex-col mb-4">
                            <img src={icon} alt={`${type} logo`} className="w-10 h-10 object-contain mb-4" />
                            <h4 className="font-semibold text-text-title-light">{form["connectionName"] || type}</h4>
                        </div>

                        <div>
                            <p>Data Connectors allows you to connect to data sources like {type} by securely providing your credentials to the AI.</p>
                            <p>Once a connector is enabled, it is available for the entire chat, allowing the AI to access and query your data contextually across interactions.</p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        className="w-full mt-4"
                        onClick={() => onConnect(form)}
                    >
                        Connect
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}

export default DatabaseConnectorModel;