package com.google.sps.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/** Servlet that posts comments. */
@WebServlet("/comments")
public final class CommentServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws
                                                                                 IOException {
        response.setContentType("text/html");
        HttpSession httpsession;
        String url;
        String name;
        String email;
        String comment;
        httpsession = request.getSession();
        name = request.getParameter("name");
        email = request.getParameter("email");
        comment = request.getParameter("comment");
        httpsession.setAttribute("name", name);
        httpsession.setAttribute("email", email);
        httpsession.setAttribute("comment", comment);
        System.out.println(name);
        System.out.println(email);
        System.out.println(comment);
        PrintWriter out = response.getWriter();
        out.println(
                "<html><body><a href='./'>Home</a><br/>Thank " +
                "you for the comment :)</body></html>");
    }
}


