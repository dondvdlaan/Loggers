import { ReactElement } from "react";
import { useApi, useApi3 } from "../../shared/Api"
import { Log } from "../../types/Log"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


export const LogsOverview =(): ReactElement =>{

    // ---- Constants ----
    const [logs, setLogs] = useApi3<Log[]>("api/allLogs");

    if(!logs) return (<p>Awaiting logs..</p>);

    console.log("logs: ", logs)

    
    return(
      <div style={{ height: 470, width: '100%' }}>
        <DataGrid
          rows={logs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowId={(row) => row.logID}
          pageSizeOptions={[5, 10, 15]}
          //checkboxSelection
          />
      </div>
    )
  }

  const columns: GridColDef[] = [

      { field: 'logID', headerName: 'ID', width: 50 },
      { field: 'application', headerName: 'Application', width: 100 },
      { field: 'logTime', headerName: 'Timestamp', type: 'Date', width: 160 },
      { field: 'levelMsg', headerName: 'Level', width: 100 },
      { field: 'message', headerName: 'Message', width: 1000 },
    ];