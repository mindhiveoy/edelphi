package fi.metatavu.edelphi.rest;

import java.util.Properties;

import javax.batch.operations.JobOperator;
import javax.batch.runtime.BatchRuntime;
import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import fi.metatavu.edelphi.settings.SettingsController;

/**
 * System REST Services
 * 
 * @author Antti Leppä
 */
@Path ("/system")
@RequestScoped
@Stateful
@Produces (MediaType.APPLICATION_JSON)
@Consumes (MediaType.APPLICATION_JSON)
public class SystemRESTService {
  
  @Inject
  private SettingsController settingsController;
  
  /**
   * Returns pong
   * 
   * @return pong in plain text
   */
  @GET
  @Path ("/ping")
  @Produces (MediaType.TEXT_PLAIN)
  public Response getPing() {
    return Response.ok("pong").build();
  }
  
  @GET
  @Path ("/s")
  @Produces (MediaType.TEXT_PLAIN)
  public Response getS() {
    JobOperator jobOperator = BatchRuntime.getJobOperator();
    long jid = jobOperator.start("testJob", new Properties());
    return Response.ok(jid).build();
  }

  /**
   * Returns MQTT settings
   * 
   * @return MQTT settings
   */
  @GET
  @Path ("/mqttSettings")
  public Response getMqttSettings() {
    // TODO: Secure
    
    return Response.ok(settingsController.getMqttSettings()).build();
  }
  
}
