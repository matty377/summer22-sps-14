package com.google.sps.servlets;

import com.google.cloud.datastore.Cursor;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreException;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.EntityQuery;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.IncompleteKey;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.ListValue;
import com.google.cloud.datastore.PathElement;
import com.google.cloud.datastore.ProjectionEntity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.ReadOption;
import com.google.cloud.datastore.StringValue;
import com.google.cloud.datastore.StructuredQuery;
import com.google.cloud.datastore.StructuredQuery.CompositeFilter;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.Transaction;
import com.google.cloud.datastore.testing.LocalDatastoreHelper;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Iterators;
import com.google.datastore.v1.TransactionOptions;
import com.google.datastore.v1.TransactionOptions.ReadOnly;
import com.google.gson.Gson;
import com.google.sps.data.Restaurant;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing tasks. */
@WebServlet("/get-rest")
public class GetRestServlet extends HttpServlet {

    public static String getBody(HttpServletRequest request)  {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;
    
        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            // throw ex;
            return "";
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
    
                }
            }
        }
    
        body = stringBuilder.toString();
        return body;
    }
    
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
    Query.newEntityQueryBuilder()
        .setKind("Restaurant")
        .setFilter(PropertyFilter.eq("type", getBody(request)))
        .build();
    QueryResults<Entity> results = datastore.run(query);

    List<Restaurant> restaurants = new ArrayList<>();
    
    while (results.hasNext()) {
      Entity entity = results.next();

      long id = entity.getKey().getId();
      String name = entity.getString("name");
      String type = entity.getString("type");
      String location = entity.getString("location");
      String cost = entity.getString("cost");
      String latitude = entity.getString("latitude");
      String longitude = entity.getString("longitude");
      

      Restaurant restaurant = new Restaurant(id, name, type, location, cost, latitude, longitude);
      restaurants.add(restaurant);
    }
    Gson gson = new Gson();

    


    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(restaurants));
  }
}
