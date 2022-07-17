package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Servlet responsible for creating new tasks. */
@WebServlet("/new-rest")
public class NewRestServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.
    String name = Jsoup.clean(request.getParameter("name"), Whitelist.none());
    String type = Jsoup.clean(request.getParameter("type"), Whitelist.none());
    String location = Jsoup.clean(request.getParameter("location"), Whitelist.none());
    String cost = request.getParameter("cost");
    String latitude = request.getParameter("latitude");
    String longitude = request.getParameter("longitude");


    


    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Restaurant");
    FullEntity taskEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("name", name)
            .set("type", type)
            .set("location", location)
            .set("cost", cost)
            .set("latitude", latitude)
            .set("longitude", longitude)
            .build();
    datastore.put(taskEntity);

    response.sendRedirect("/index.html");
  }
}
