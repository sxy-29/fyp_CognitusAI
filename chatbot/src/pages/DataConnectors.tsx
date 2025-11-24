import { useState } from "react";
import DatabaseConnectorModel from "../components/DatabaseConnector";
import postgreLogo from "../assets/Postgres_logo.webp";
import mysqlLogo from "../assets/mysql_logo.webp"
import supabaseLogo from "../assets/supabase-logo.webp";

function DataConnectorsPage() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"MySQL" | "PostgreSQL" | "Supabase">("MySQL");

  const connectors = [
    {
      name: "MySQL",
      description: "Connect your MySQL database for direct querying and analysis",
      icon: mysqlLogo
    },
    {
      name: "PostgreSQL",
      description: "Analyze your PostgreSQL database tables and schemas",
      icon: postgreLogo
    },
    {
      name: "Supabase",
      description: "Connect your Supabase database for direct querying and analysis",
      icon: supabaseLogo
    }
  ]

  // temp
  const handleConnect = (data: Record<string, string>) => {
    console.log("Connecting to:", selectedType);
    console.log("Connection details:", data);
    setOpen(false);

    // TODO: Send connection data to backend
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-text-title-light">Data Connectors</h2>
        <p className="text-text-desc-light mt-2">
          You can connect Cognitus to your data stores and business tools here
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map((connector, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <img src={connector.icon} alt={`${connector.name} logo`} className="w-10 h-10 object-contain mb-4" />
              <h4 className="font-semibold text-text-title-light">{connector.name}</h4>
              <p className="text-sm text-text-desc-light mt-2">
                {connector.description}
              </p>
            </div>
            <button
              className="mt-6 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-blue-600 w-full"
              onClick={() => {
                setSelectedType(connector.name as any);
                setOpen(true);
              }}>
              Connect
            </button>
          </div>
        ))}

        {/* Modal */}
        <DatabaseConnectorModel
          open={open}
          onClose={() => setOpen(false)}
          type={selectedType}
          onConnect={handleConnect}
        />
      </div>
    </div>
  );
}

export default DataConnectorsPage;