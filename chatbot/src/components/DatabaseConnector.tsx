import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import FormField from "./FormField";

import postgreLogo from "../assets/Postgres_logo.webp";
import mysqlLogo from "../assets/mysql_logo.webp"
import supabaseLogo from "../assets/supabase-logo.webp";
import getTooltips from "./ConnectionTooltips";

type Props = {
    open: boolean;
    onClose: () => void;
    type: "MySQL" | "PostgreSQL" | "Supabase";
    onConnect: (data: Record<string, string>) => void;
}

function DatabaseConnectorModel({ open, onClose, type, onConnect }: Props) {
    const [form, setForm] = useState<Record<string, string>>({});
    const [connectType, setConnectType] = useState<"direct" | "ssh">("direct");

    // Update the information when input being focus
    const [fieldFocused, setFocusField] = useState<string>('');
    const [tooltips, setTooltips] = useState<string>('');

    // Reset form when modal is closed
    useEffect(() => {
        if (!open) {
            setForm({});
            setConnectType("direct");
            setFocusField('');
            setTooltips('');
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
            <DialogContent className="max-w-lg sm:max-w-[800px] w-full max-h-[80vh] flex flex-col p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Create {type} Connector
                    </DialogTitle>
                </DialogHeader>

                <div
                    className="flex flex-col gap-2 flex-1 grid grid-cols-1 md:grid-cols-2 overflow-y-auto"
                    onClick={(e) => {
                        // Only clear if user DID NOT click inside input/select
                        if (!(e.target as HTMLElement).closest("input")) {
                            setFocusField("");
                            setTooltips("");
                        }
                    }}
                >
                    <div className=" space-y-4 ">
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
                                value={form[field.key] || ""}
                                onChange={(val) => handleChange(field.key, val)}
                                required
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
                                        value={form[field.key] || ""}
                                        onChange={(val) => handleChange(field.key, val)}
                                        required
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
                            <img src={icon} alt={`${type} logo`} className="w-12 h-12 object-contain mb-3" />
                            <h4 className="font-semibold text-text-title-light text-base">
                                {form["connectionName"] || type}
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

                <DialogFooter className="pt-4">
                    <Button className="w-full" onClick={() => onConnect(form)}>
                        Connect
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DatabaseConnectorModel;