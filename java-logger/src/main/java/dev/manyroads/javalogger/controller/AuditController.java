package dev.manyroads.javalogger.controller;

import dev.manyroads.javalogger.database.AuditDbManager;
import dev.manyroads.javalogger.model.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class AuditController {

// ---- Routes ----
// Retrieve all logs
@GetMapping("/allLogs")
public ResponseEntity<List<Log>> getAllLogs(){

    System.out.println("Route: allLogs");

    return ResponseEntity.ok(AuditDbManager.getInstance().getAllLogsFromDb());
    //return AuditDbManager.getInstance().getAllLogsFromDb();
}
}
