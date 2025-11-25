const connectorTooltips: Record<string, Record<string, string>> = {
    MySQL: {
        user: "MySQL username/role with database access.",
        password: "Password for the MySQL user account.",
        host: "Hostname or IP address where MySQL server runs.",
        port: "Port number MySQL listens on, typically 3306.",
        database: "Name of the specific MySQL database to connect to.",
        user_ssh: "MySQL username for database auth.",
        password_ssh: "MySQL password.",
        host_ssh: "Remote MySQL host reachable from SSH host.",
        port_ssh: "Remote MySQL port, typically 3306.",
        database_ssh: "Database name.",
        ssh_host: "SSH bastion host/IP.",
        ssh_port: "SSH port (default 22).",
        ssh_username: "SSH username.",
        ssh_password: "SSH password (if not using key)."
    },
    PostgreSQL: {
    user: "PostgreSQL username/role with database access, created by administrator or default like 'postfres'.",
        password: "Password for the PostgreSQL user account, set by database administrator.",
        host: "Hostname or IP address where PostgreSQL server runs (e.g., '192.168.1.100', or domain name).",
        port: "Port number PostgreSQL listens on, typically '5432' unless configured differently by administrator.",
        database: "Name of the specific PostgreSQL database to connect to within the server.",
        user_ssh: "SSH username for database access.",
        password_ssh: "SSH password for database access.",
        host_ssh: "Hostname or IP address where PostgreSQL server runs (e.g., '192.168.1.100', or domain name).",
        port_ssh: "Port number PostgreSQL listens on, typically '5432' unless configured differently by administrator.",
        database_ssh: "Name of the specific PostgreSQL database to connect to within the server.",
        ssh_host: "Hostname or IP address where SSH server runs (e.g., '192.168.1.100', or domain name).",
        ssh_port: "Port number SSH listens on, typically '22' unless configured differently by administrator.",
        ssh_username: "SSH username for database access."
    },
    Supabase: {
        user: "Your Supabase database username, found in your project settings under Database -> Connection info, typically starts with 'postgres'.",
        password: "Your Supabase database password, set when you created the project or can be reset in Project Settings -> Database.",
        host: "Your Supabase database hostname, found in Project Settings -> Database -> Connection info (e.g., db.abcdefghijklmnop.supabase.co).",
        port: "Supabase database port number, typically 5432 for direct connections or 6543 for connection pooling.",
        database: "Your Supabase database name, usually 'postgres' unless you've created a custom database."
    }
};

const connectionName = 
    "A custom name you provide to identify this connection, helpful when managing multiple database connections " +
    "Names cannot start with a number. Choose a descriptive name like \"Production DB\" or \"Analytics Warehouse\" " +
    "to easily distinguish between connections.";

export default function getTooltips({type, field}: {type: string, field: string}): string {
    const tooltips = field === "connectionName" ?  connectionName : connectorTooltips[type]?.[field];
    return tooltips;
}