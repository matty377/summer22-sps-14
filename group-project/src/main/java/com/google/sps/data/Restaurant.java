package com.google.sps.data;

public class Restaurant {
    private final long id;
    private final String name;
    private final String type;
    private final String location;
    private final String cost;

  public Restaurant(long id, String name, String type, String location, String cost) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.location = location;
    this.cost = cost;
  }
}
