package com.google.sps.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/** Servlet that posts feedback. */
@WebServlet("/feedback")
public final class Feedback extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      IOException {
    response.setContentType("text/html");
    HttpSession httpsession;
    String url;
    String name;
    String email;
    String message;
    httpsession = request.getSession();
    name = request.getParameter("name");
    email = request.getParameter("email");
    message = request.getParameter("message");
    httpsession.setAttribute("name", name);
    httpsession.setAttribute("email", email);
    httpsession.setAttribute("message", message);
    System.out.println(name);
    System.out.println(email);
    System.out.println(message);
    PrintWriter out = response.getWriter();
    out.println(
        "<html><body><a href='./'>Home</a><br/>Thank " +
            "you for your feedback :)</body></html>");
  }
}
