import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    open: boolean;
    onClose: () => void;
    type: "MySQL" | "PostgreSQL" | "Supabase";
    onConnect: (data: Record<string, string>) => void;
}

function DatabaseConnectorModel({ open, onClose, type, onConnect }: Props) {
    const [form, setForm] = useState<Record<string, string>>({});
    const [connectType, setConnectType] = useState<"direct" | "ssh">("direct");

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const baseFields = [
        { key: "connectionName", label: "Connection Name" },
        { key: "user", label: "User" },
        { key: "password", label: "Password", type: "password" },
        { key: "host", label: "Host" },
        { key: "port", label: "Port" },
        { key: "database", label: "Database" },
    ];

    const sshFieldsPostgres = [
        { key: "ssh_host", label: "SSH Host", type: "text" },
        { key: "ssh_port", label: "SSH Port" },
        { key: "ssh_username", label: "SSH Username" },
    ];

    const sshFieldsMySQL = [
        ...sshFieldsPostgres,
        { key: "ssh_password", label: "SSH Password", type: "password" },
    ];

    const showSSH = type !== "Supabase" && connectType === "ssh";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        Connect to {type}
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto pr-2 space-y-4 mt-2">
                    {type !== "Supabase" && (
                        <div>
                            <Label>Connection Method</Label>
                            <Select value={connectType} onValueChange={(v: any) => setConnectType(v)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="direct">Direct</SelectItem>
                                    <SelectItem value="ssh">SSH</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {baseFields.map((field) => (
                        <div key={field.key}>
                            <Label>{field.label} *</Label>
                            <Input
                                type={field.type || "text"}
                                required
                                className="mt-1"
                                value={form[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                            />
                        </div>
                    ))}

                    {showSSH && (
                        <>
                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">SSH Settings</h3>
                            </div>

                            {(type === "PostgreSQL" ? sshFieldsPostgres : sshFieldsMySQL).map((field) => (
                                <div key={field.key}>
                                    <Label>{field.label} *</Label>
                                    <Input
                                        type={field.type || "text"}
                                        required
                                        className="mt-1"
                                        value={form[field.key] || ""}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <Button
                    className="w-full mt-4"
                    onClick={() => onConnect(form)}
                >
                    Connect
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default DatabaseConnectorModel;