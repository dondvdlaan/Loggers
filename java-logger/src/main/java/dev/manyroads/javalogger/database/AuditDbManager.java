package dev.manyroads.javalogger.database;

import dev.manyroads.javalogger.JavaLoggerApplication;
import dev.manyroads.javalogger.model.Log;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLNonTransientConnectionException;
import java.util.ArrayList;
import java.util.List;

/**
 * Class to access Audit database
 */
public class AuditDbManager {

    // ---- Constants ----
    private static final Logger logger = LogManager.getLogger(AuditDbManager.class);
    private static final String JDBC_DRIVER                 = "org.mariadb.jdbc.Driver";
    private static final String DB_LOCAL_SERVER_IP_ADDRESS  = "localhost";
    private static final String DB_LOCAL_NAME               = "/support_audit";
    private static final String DB_LOCAL_CONNECTION_URL     =   "jdbc:mariadb://" +
                                                                DB_LOCAL_SERVER_IP_ADDRESS +
                                                                DB_LOCAL_NAME;
    private static final String DB_LOCAL_USER_NAME          = "testUser";
    private static final String DB_LOCAL_USER_PW            = "testPW";

    // ---- Attributes ----
    private static AuditDbManager instance;
    private        DAOLogs daoLogs;

    // ---- Constructors ----
    private AuditDbManager() {
        this.daoLogs = new DAOLogs();
    }
    // ---- Methods ----
    /**
     * Method to return sole instance
     *
     * @return instance : AuditDbManager : Sole Instance
     */
    public static synchronized AuditDbManager getInstance() {

        if (instance == null) instance = new AuditDbManager();

        return instance;
    }
    /**
     * Method generates Database connection with read and write permissions. In case of failure, connection
     * is st to null.
     *
     * @return rwDbConnection : {@link Connection} : Database connection w rw - permissions
     */
    private Connection getRwDbConnection() throws Exception {

        Connection rwDbConnection = null;

        try {
            //1: Registeren des JDBC driver
            Class.forName(JDBC_DRIVER);

            //2. Offenen einer Verbindung
            rwDbConnection = DriverManager.getConnection(DB_LOCAL_CONNECTION_URL, DB_LOCAL_USER_NAME, DB_LOCAL_USER_PW);

        } catch (SQLNonTransientConnectionException sqlNoConnectionEx) {
            logger.error(sqlNoConnectionEx);
            throw new Exception("Keine Datenbankverbindung");
        } catch (ClassNotFoundException classNotFoundEx) {
            logger.error(classNotFoundEx);
            throw new Exception("JDBC Treiber konnte nicht geladen werden");
        }

        return rwDbConnection;
    }
    /**
     * Method to check if Database is online
     *
     * @return isOnline : boolean : true : Db ist Online : false nicht
     */
    public boolean isDatabaseOnline() {

        boolean isOnline = true;

        try {
            this.getRwDbConnection().close();
        } catch (Exception e) {
            logger.error(e);
            e.printStackTrace();
            isOnline = false;
        }
        return isOnline;
    }
    // ---- CRUD -Opeations Log
    /**
     * Liest alle Daten aus der Tabelle aus
     *
     * @return allUsersFromDbTable : {@link List} - {@link Log}: Alle Logs aus Db-Tabelle
     */
    public List<Log> getAllLogsFromDb() throws Exception {

        List<Log> allLogsFromDb = new ArrayList<>();

        //Neue Verbindung erstellen
        // Propagating Errors Up the Call Stack at AuditController
       // try {
            if (this.isDatabaseOnline()) {
                allLogsFromDb = this.daoLogs.getAllDataRecordsFromDbTbl(this.getRwDbConnection());
            }
      /*  } catch (Exception e) {
            logger.error(e.getMessage());
            System.err.println(e.getMessage());
        }
*/
        return allLogsFromDb;
    }
}
