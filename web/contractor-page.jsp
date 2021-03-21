<%@page import="java.sql.*"%>
<%@page import="JavaPackage.java_process"%>
<!doctype html>
<html lang="en">

    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
        <link href="assets/vendor/fonts/circular-std/style.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/libs/css/style.css">
        <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
        <link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">
        <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
        <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">
        <!--Extend-->
        <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/redmond/jquery-ui.css">
        <title>SIPSS - User</title>
    </head>

    <body>
        <%
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "no-store");
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setIntHeader("Refresh", session.getMaxInactiveInterval());
            String username = (String) session.getAttribute("username");
            if (username == null) {
                username = "";
                if (username.equals("") || username == "") {
                    response.sendRedirect("index.jsp");
                }
            }
        %>
        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">
            <!-- ============================================================== -->
            <!-- navbar -->
            <!-- ============================================================== -->
            <div class="dashboard-header">
                <nav class="navbar navbar-expand-lg bg-white fixed-top">
                    <a class="navbar-brand" href="">Welcome
                        <%
                            if (username.equals("super")) {
                                out.print("Super Admin");
                            } else if (!username.equals("super")) {
                                out.print("");
                            }
                        %>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto navbar-right-top">
                            <li class="nav-item dropdown notification">
                                <a class="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-fw fa-bell"></i> 
                                    <span class="indicator"></span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right notification-dropdown">
                                    <li>
                                        <div class="notification-title"> Notification</div>
                                        <div class="notification-list">
                                            <div class="list-group">
                                                <%
                                                    try {
                                                        String data = "SELECT * FROM user_contract WHERE username=?";
                                                        PreparedStatement ps = java_process.connection().prepareStatement(data);
                                                        ps.setString(1, username);
                                                        ResultSet rs = ps.executeQuery();
                                                        while (rs.next()) {
                                                            String append = "";
                                                            if (rs.getInt(6) == 0) {
                                                                append = " your request to join the team is still being <strong style='color:#660066;'>PROCESS</strong>.";
                                                            } else if (rs.getInt(6) == 1) {
                                                                append = " has <strong style='color:#00cc00;'>ACCEPTED</strong> your request to join the team.";
                                                            } else if (rs.getInt(6) == 2) {
                                                                append = " has <strong style='color:red;'>REJECTED</strong> your request to join the team.";
                                                            }
                                                            out.print("<a href='#' class='list-group-item list-group-item-action active'>"
                                                                    + "<div class='notification-info'>"
                                                                    + "<div class='notification-list-user-img'><img src='assets/images/avatar-2.jpg' alt='' class='user-avatar-md rounded-circle'></div>"
                                                                    + "<div class='notification-list-user-block'><span class='notification-list-user-name'>Admin</span>For contract name <strong>" + rs.getString(4) + "</strong> and contract code <strong>" + rs.getString(5) + "</strong>" + append + ""
                                                                    + "</div>"
                                                                    + "</div>"
                                                                    + "</a>");
                                                        }
                                                        java_process.connection().close();
                                                    } catch (SQLException ex) {
                                                        out.print(ex.toString());
                                                    }
                                                %>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown nav-user">
                                <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <%
                                        String logo = java_process.getLogo(username);
                                        if (logo.equals("")) {
                                            out.print("<img src='assets/images/avatar-1.jpg' alt='' class='user-avatar-md rounded-circle'>");
                                        } else if (!logo.equals("")) {
                                            out.print("<img src='" + logo + "' alt='' class='user-avatar-md rounded-circle'>");
                                        }
                                    %>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                    <div class="nav-user-info">
                                        <%
                                            String s_username = java_process.getUsername(username);
                                            if (!s_username.equals("") && username.equals("super")) {
                                                out.print("<h5 class='mb-0 text-white nav-user-name'>" + s_username + "</h5>");
                                            } else if (s_username.equals("") && !username.equals("")) {
                                                out.print("<h5 class='mb-0 text-white nav-user-name'>" + username + "</h5>");
                                            } else {
                                                out.print("<h5 class='mb-0 text-white nav-user-name'>Username</h5>");
                                                out.print("<span class='status'></span><span class='ml-2'>Status</span>");
                                            }
                                        %>
                                    </div>
                                    <%
                                        if (!username.equals("")) {
                                            out.print("<form action='jsp_process.jsp' method='POST' class='dropdown-item'>");
                                            out.print("<i class='fas fa-power-off mr-2'></i>");
                                            out.print("<input type='submit' name='submit' value='Logout' class='logout-bottom'>");
                                            out.print("</form>");
                                        }
                                    %>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <!-- ============================================================== -->
            <!-- end navbar -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- left sidebar -->
            <!-- ============================================================== -->
            <div class="nav-left-sidebar sidebar-dark">
                <div class="menu-list">
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav flex-column">
                                <div class="main-menu-content"> 
                                    <li class="nav-divider">
                                        Menu
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link active" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"><i class="fa fa-fw fa-user-circle"></i>Dashboard<span class="badge badge-success">6</span></a>
                                        <div id="submenu-1" class="collapse submenu" style="">
                                            <ul class="nav flex-column">
                                                <%
                                                    try {
                                                        String data = "SELECT id FROM user WHERE username=?";
                                                        PreparedStatement ps = java_process.connection().prepareStatement(data);
                                                        ps.setString(1, username);
                                                        ResultSet rs = ps.executeQuery();
                                                        if (rs.next()) {
                                                            data = "SELECT id FROM user_criteria WHERE id=?";
                                                            ps = java_process.connection().prepareStatement(data);
                                                            ps.setInt(1, rs.getInt(1));
                                                            rs = ps.executeQuery();
                                                            if (rs.next()) {
                                                                data = "SELECT * FROM project_table WHERE initiator=?";
                                                                ps = java_process.connection().prepareStatement(data);
                                                                ps.setString(1, username);
                                                                rs = ps.executeQuery();
                                                                if (rs.next()) {
                                                                    out.println("<li class='nav-item'>"
                                                                            + "<input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-exam' name='button' value='Performance Measurement'>"
                                                                            + "</li>");
                                                                    out.println("<li class='nav-item'>"
                                                                            + "<input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-contract' name='button' value='Project List'>"
                                                                            + "</li>");
                                                                    out.println("<li class='nav-item'>"
                                                                            + "<a class='nav-link' href='# 'data-toggle='collapse' aria-expanded='false' data-target='#submenu-1-2' aria-controls='submenu-1-2'>Project</a>"
                                                                            + "<div id='submenu-1-2' class='collapse submenu' style=''>"
                                                                            + "<ul class='nav flex-column'>"
                                                                            + "<li class='nav-item'><input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-Create' name='button' value='Create Project'></li>"
                                                                            + "<li class='nav-item'><input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-Review' name='button' value='Manage Project'></li>"
                                                                            + "</ul>"
                                                                            + "</div>"
                                                                            + "</li>");
                                                                } else if (!rs.next()) {
                                                                    out.println("<li class='nav-item'>"
                                                                            + "<input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-exam' name='button' value='Performance Measurement'>"
                                                                            + "</li>");
                                                                    out.println("<li class='nav-item'>"
                                                                            + "<input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-contract' name='button' value='Project List'>"
                                                                            + "</li>");
                                                                    out.println("<li class='nav-item'>"
                                                                            + "<a class='nav-link' href='# 'data-toggle='collapse' aria-expanded='false' data-target='#submenu-1-2' aria-controls='submenu-1-2'>Project</a>"
                                                                            + "<div id='submenu-1-2' class='collapse submenu' style=''>"
                                                                            + "<ul class='nav flex-column'>"
                                                                            + "<li class='nav-item'><input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-Create' name='button' value='Create Project'></li>"
                                                                            + "</ul>"
                                                                            + "</div>"
                                                                            + "</li>");
                                                                }
                                                            } else if (!rs.next()) {
                                                                out.println("<li class='nav-item'>"
                                                                        + "<input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-exam' name='button' value='Performance Measurement*'>"
                                                                        + "</li>");
                                                            }
                                                        }
                                                        java_process.connection().close();
                                                    } catch (SQLException ex) {
                                                        out.print(ex.toString());
                                                    }
                                                %>
                                            </ul>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- end left sidebar -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- wrapper  -->
            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="dashboard-ecommerce">
                    <div class="container-fluid dashboard-content ">
                        <!-- ============================================================== -->
                        <!-- pageheader  -->
                        <!-- ============================================================== -->
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <div style="width: 100%;" class="card">
                                        <form action="jsp_process.jsp" method="POST">
                                            <div class="question_list">
                                                <div class="card-body">
                                                    <div style="width:100%;" class="table-responsive">
                                                        <div class="QuestionContainer">
                                                            <div class="1">
                                                                <h3><p style="color:grey;">Question 1/32 </p></h3><hr>
                                                                <p style="color:black;">The previous achievement has been publicly stated and shared in blogs or social media or search engine.</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="2">
                                                                <h3><p style="color:grey;">Question 2/32 </p></h3><hr>
                                                                <p style="color:black;">The business performance of the company has been publish for public references.</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="3">
                                                                <h3><p style="color:grey;">Question 3/32 </p></h3><hr>
                                                                <p style="color:black;">The company share mission, location, contact info, services in blogs or social media</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="4">
                                                                <h3><p style="color:grey;">Question 4/32 </p></h3><hr>
                                                                <p style="color:black;">Information about your company can be find easily in search engine</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="5">
                                                                <h3><p style="color:grey;">Question 5/32 </p></h3><hr>
                                                                <p style="color:black;">The company use social media monitoring and social analytics to monitor and analyse its social engagement and performance factors</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="6">
                                                                <h3><p style="color:grey;">Question 6/32 </p></h3><hr>
                                                                <p style="color:black;">The company has a good rating in working performance in social media</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="7">
                                                                <h3><p style="color:grey;">Question 7/32 </p></h3><hr>
                                                                <p style="color:black;">Years of involvement in industry</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <select class="exp_option">
                                                                        <option value="0">Years</option>
                                                                        <option value="1">1</option>
                                                                        <option value="1">2</option>
                                                                        <option value="1">3</option>
                                                                        <option value="1">4</option>
                                                                        <option value="1">5</option>
                                                                        <option value="2">6</option>
                                                                        <option value="2">7</option>
                                                                        <option value="2">8</option>
                                                                        <option value="2">9</option>
                                                                        <option value="2">10</option>
                                                                    </select>
                                                                    <input type="hidden" name="option" id="option" class="option" >
                                                                </div><hr>
                                                            </div>
                                                            <div class="8">
                                                                <h3><p style="color:grey;">Question 8/32 </p></h3><hr>
                                                                <p style="color:black;">Do you share content of your mutual agreement with your partner via cloud?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>



                                                            <div class="9">
                                                                <h3><p style="color:grey;">Question 9/32 </p></h3><hr>
                                                                <p style="color:black;">Do you share content of your mutual agreement with your partner?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="10">
                                                                <h3><p style="color:grey;">Question 10/32 </p></h3><hr>
                                                                <p style="color:black;">An agreement between my company and collaborators</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="11">
                                                                <h3><p style="color:grey;">Question 11/32 </p></h3><hr>
                                                                <p style="color:black;">My Company use workflow management system to manage jobs/processes</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="12">
                                                                <h3><p style="color:grey;">Question 12/32 </p></h3><hr>
                                                                <p style="color:black;">My company use eletronic calender (also know as time management software to manage schedule events)</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="13">
                                                                <h3><p style="color:grey;">Question 13/32 </p></h3><hr>
                                                                <p style="color:black;">My company provide video and slide sharing with our partners</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="14">
                                                                <h3><p style="color:grey;">Question 14/32 </p></h3><hr>
                                                                <p style="color:black;">Do you share information or document about your revenue or sales with other companies</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="15">
                                                                <h3><p style="color:grey;">Question 15/32 </p></h3><hr>
                                                                <p style="color:black;">My company publicly share the annual report of the company</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="16">
                                                                <h3><p style="color:grey;">Question 16/32 </p></h3><hr>
                                                                <p style="color:black;">Do you any project management tools in managing the project?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="17">
                                                                <h3><p style="color:grey;">Question 17/32 </p></h3><hr>
                                                                <p style="color:black;">Do you provide chat rooms or online forum/discussion boards to facilitate and manage online text messages?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="18">
                                                                <h3><p style="color:grey;">Question 18/32 </p></h3><hr>
                                                                <p style="color:black;">Do you provide workgroup solutions to support or give feedback to any issues in the project?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="19">
                                                                <h3><p style="color:grey;">Question 19/32 </p></h3><hr>
                                                                <p style="color:black;">Do you provide electronic meeting rooms or other live group support system?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="20">
                                                                <h3><p style="color:grey;">Question 20/32 </p></h3><hr>
                                                                <p style="color:black;">Do you have desktop conferencing or video conferencing system in your office?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="21">
                                                                <h3><p style="color:grey;">Question 21/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use small group collaboration tools, email, text-chat (e.g WhatsApp or Telegram)?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="22">
                                                                <h3><p style="color:grey;">Question 22/32 </p></h3><hr>
                                                                <p style="color:black;">Do you know about public relation tools for monitoring and managing media relationship(e.g Prowly, Muck Rack, Prezly, Mention or PR Web)?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="23">
                                                                <h3><p style="color:grey;">Question 23/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use them in monitoring and managing media relationship with your partner?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="24">
                                                                <h3><p style="color:grey;">Question 24/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use online calendars or resource management tool in your company?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="25">
                                                                <h3><p style="color:grey;">Question 25/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use any workflow management system?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="26">
                                                                <h3><p style="color:grey;">Question 26/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use project management tool/system to manage and monitor your work?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="27">
                                                                <h3><p style="color:grey;">Question 27/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use time management software in you company for event schedule and automatically notify and remind group members?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>



                                                            <div class="28">
                                                                <h3><p style="color:grey;">Question 28/32 </p></h3><hr>
                                                                <p style="color:black;">The company provides correct information about project/achievement in its media social (twitter/blogs/Facebook/Flickr)</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>



                                                            <div class="29">
                                                                <h3><p style="color:grey;">Question 29/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use project management tools to manage your sales planning?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="30">
                                                                <h3><p style="color:grey;">Question 30/32 </p></h3><hr>
                                                                <p style="color:black;">Do you publicly share you sales planning with other companies?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="31">
                                                                <h3><p style="color:grey;">Question 31/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use any team collaboration and real time document management?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <div class="32">
                                                                <h3><p style="color:grey;">Question 32/32 </p></h3><hr>
                                                                <p style="color:black;">Do you use any team collaboration and real time document management?</p>
                                                                <div style="color:black;" class="option-answer">
                                                                    <input  type="checkbox" name="option" class="option" value="1" id="yes"> Yes<br>
                                                                    <input type="checkbox" name="option" class="option" value="0" id="no"> No
                                                                </div><hr>
                                                            </div>
                                                            <input type="button" name="button_back" class="button_back" id="button_back" value="<">
                                                            <input type="button" name="button_next" class="button_next" id="button_next" value=">">
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>
                                                <p><input type="submit" name="submit" id="submit-button" value="Submit" disabled></p>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="pageheader-content-create">
                                        <form action="jsp_process.jsp" method="GET">
                                            <div class="details_table">
                                                <div style="width: 100%; height: 100%;" class="card">
                                                    <h4 class="card-header">Project Details</h4>
                                                    <div class="card-body">
                                                        <div style="width:100%; height:93vh; overflow:auto;" class="table-responsive">
                                                            <table class="table table-striped">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">Project Name:</th>
                                                                        <td><input style="width: 100%; padding: 1px 5px 1px 5px;" type="text" name="project_name" class="project_name" placeholder="Enter project name" required></td>
                                                                            <%
                                                                                try {
                                                                                    String data = "SELECT * FROM user_contract WHERE username=?";
                                                                                    PreparedStatement ps = java_process.connection().prepareStatement(data);
                                                                                    ps.setString(1, username);
                                                                                    ResultSet rs = ps.executeQuery();
                                                                                    if (rs.next()) {
                                                                                        out.print("<input style='width: 100%; padding: 1px 5px 1px 5px;' type='hidden' name='initiator' class='initiator' value='" + rs.getString(2) + "' required>");
                                                                                    }
                                                                                    java_process.connection().close();
                                                                                } catch (SQLException ex) {
                                                                                    out.print(ex.toString());
                                                                                }
                                                                            %>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Project Code:</th>
                                                                        <td><input style="width: 100%; padding: 1px 5px 1px 5px;" type="text" name="project_code" class="project_code" placeholder="Enter project code" required></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Project Category:</th>
                                                                        <td>
                                                                            <select style="color: black;" class="form-control border-input" name="category" class="category" id="category" required>
                                                                                <option value="Agriculture">Agriculture</option>
                                                                                <option value="Motor Vehicle">Motor Vehicle</option>
                                                                                <option value="Chemical">Chemical</option>
                                                                                <option value="Clothing">Clothing</option>
                                                                                <option value="Computer">Computer</option>
                                                                                <option value="Construction & Civil Engineering">Construction & Civil Engineering</option>
                                                                                <option value="Design">Design</option>
                                                                                <option value="Education">Education</option>
                                                                                <option value="Electronic">Electronic</option>
                                                                                <option value="Energy">Energy</option>
                                                                                <option value="Financial Services">Financial Services</option>
                                                                                <option value="Food & Drink">Food & Drink</option>
                                                                                <option value="Health Care">Health Care</option>
                                                                                <option value="Manufacturing">Manufacturing</option>
                                                                                <option value="Oil & Gas">Oil & Gas</option>
                                                                                <option value="Software">Software</option>
                                                                                <option value="Technology">Technology</option>
                                                                                <option value="Telecommunication">Telecommunications</option>
                                                                                <option value="Transport">Transport</option>
                                                                                <option value="Travel & Holiday">Travel & Holiday</option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row" style="width:200px;">Project Introduction:</th>
                                                                        <td><textarea style="height:100px;resize:none;width:100%;padding: 5px;border-radius: 3px;" placeholder="Enter project introdcution" name="project_intro" class="project_intro"></textarea></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Project Background:</th>
                                                                        <td><textarea style="height:100px;resize:none;width:100%;padding: 5px;border-radius: 3px;" placeholder="Enter project background" name="project_bg" class="project_bg"></textarea></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Project Objective:</th>
                                                                        <td><input style="width: 100%; padding: 1px 5px 1px 5px;" type="text" name="project_objective" class="project_objective" placeholder="Enter project objective" required></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Project Start Date:</th>
                                                                        <td><input style="width: 100%; padding: 1px 5px 1px 5px;background-color: #ebebe0;border: 0;" type="text" name="project_start" class="dt1" id="dt1" placeholder="DD-MM-YYYY" required></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Project End Date:</th>
                                                                        <td><input style="width: 100%; padding: 1px 5px 1px 5px;background-color: #f5f5f0;border: 0;" type="text" name="project_end" class="dt2" id="dt2"  placeholder="DD-MM-YYYY" required></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th></th>
                                                                        <td><input style="float:right;" type="button" id="details_button" value="Next"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pairwise_table">
                                                <div style="width: 100%; height: 100%;" class="card">
                                                    <h4 class="card-header">Pairwise Comparisons
                                                        <div class="floater_parent" id="floater_parent">
                                                            <img style="cursor: pointer;float: right;" class="floater_img_tag" src="assets\images\information.png" width="20px" height="20px">
                                                            <div class="floater_tag" id="floater_tag">
                                                                <p style="font-weight: bold;">Ranking Scale<p>
                                                                <p style="padding:0 50px 0 50px;">
                                                                    1 = Equal Importance
                                                                    <br>3 = Moderate Importance
                                                                    <br>5 = Strong Importance
                                                                    <br>7 = Very Strong Importance
                                                                    <br>9 = Extreme Importance
                                                                </p>
                                                                <p style="padding:0 50px 0 50px;">
                                                                    2, 4, 6, 8 = Intermediate values <br>
                                                                    between two adjacent judgment
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </h4><br>
                                                    <div>
                                                        <p style="padding:0 50px 0 50px;"><b style="color:black;">About Pairwise Comparison</b></p>
                                                        <p style="padding:0 50px 0 50px;">
                                                            Please compare the TWO criteria as given in the table (e.g. Trust vs Commitment) based on the index
                                                            ranking scale from ranking 1-9 for your new project. The scale given is to guide you in prioritizing the
                                                            criteria based on your preference.
                                                        </p>
                                                        <p style="padding:0 50px 0 50px;">
                                                            For example please select 1 if criteria Trust is equal importance to Commitment. If criteria trust is strongly important than commitment, please select 9 as the index scale in the given dropdown.
                                                        </p>
                                                        <p style="padding:0 50px 0 50px;">
                                                            For details index ranking scale, <b style="color:black;">hover on Ranking Scale (?) at top right corner</b> 
                                                        </p>
                                                        <p style="padding:0 50px 0 50px;">
                                                            <b style="color:red;">* </b> Please read Pairwise Table <b style="color:black;">LEFT-OVER-TOP</b> as example:<br>
                                                            1) <b style="color:green;">Trust</b> - <b style="color:black;">Over</b> - <b style="color:blue;">Commitment</b><br>
                                                            2) <b style="color:green;">Commitment</b> - <b style="color:black;">Over</b> - <b style="color:blue;">Trust</b><br>
                                                            3) <b style="color:green;">Integrity</b> - <b style="color:black;">Over</b> - <b style="color:blue;">Trust</b><br>
                                                            4) <b style="color:green;">Track Record</b> - <b style="color:black;">Over</b> - <b style="color:blue;">Trust</b><br>
                                                            5) <b style="color:green;">Experience</b> - <b style="color:black;">Over</b> - <b style="color:blue;">Trust</b><br>
                                                        </p>
                                                    </div>
                                                    <div class="card-body">
                                                        <div style="width:100%; height:100%; overflow:auto;" class="table-responsive">
                                                            <input type="hidden" name="counter" class="counter" id="counter" value="5">
                                                            <table class="table table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col"> Criteria </th>
                                                                        <th scope="col"> Trust </th>
                                                                        <th scope="col"> Commitment </th>
                                                                        <th scope="col"> Integrity </th>
                                                                        <th scope="col"> Track Record </th>
                                                                        <th scope="col"> Experience </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="col">Trust</th>
                                                                        <td>
                                                                            <input type="number" name="trust_trust" class="trust_trust" id="pw_constant" step="0.01" value="1.00" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="trust_commit" class="trust_commit" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="trust_inte" class="trust_inte" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="trust_track" class="trust_track" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="trust_exp" class="trust_exp" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Commitment</th>
                                                                        <td>
                                                                            <input type="number" name="commit_trust" class="commit_trust" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="commit_commit" class="commit_commit" id="pw_constant" step="0.01" value="1.00" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="commit_inte" class="commit_inte" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="commit_track" class="commit_track" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="commit_exp" class="commit_exp" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Integrity</th>
                                                                        <td>
                                                                            <input type="number" name="inte_trust" class="inte_trust" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="inte_commit" class="inte_commit" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="inte_inte" class="inte_inte" id="pw_constant" step="0.01" value="1.00" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="inte_track" class="inte_track" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="inte_exp" class="inte_exp" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Track Record</th>
                                                                        <td>
                                                                            <input type="number" name="track_trust" class="track_trust" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="track_commit" class="track_commit" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="track_inte" class="track_inte" id="pw_box" step="0.01" required>
                                                                        <td>
                                                                            <input type="number" name="track_track" class="track_track" id="pw_constant" step="0.01" value="1.00" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="track_exp" class="track_exp" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Experience</th>
                                                                        <td>
                                                                            <input type="number" name="exp_trust" class="exp_trust" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="exp_commit" class="exp_commit" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="exp_inte" class="exp_inte" id="pw_box" step="0.01" required>
                                                                        <td>
                                                                            <input type="number" name="exp_track" class="exp_track" id="pw_box" step="0.01" required>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="exp_exp" class="exp_exp" id="pw_constant" value="1.00" step="0.01" readOnly>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">SUM</th>
                                                                        <td>
                                                                            <input type="number" name="trust_sum" class="trust_sum" id="pw_constant" step="0.01" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="commit_sum" class="commit_sum" id="pw_constant" step="0.01" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="inte_sum" class="inte_sum" id="pw_constant" step="0.01" readOnly>
                                                                        <td>
                                                                            <input type="number" name="track_sum" class="track_sum" id="pw_constant" step="0.01" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input type="number" name="exp_sum" class="exp_sum" id="pw_constant" step="0.01" readOnly>
                                                                        </td>
                                                                    </tr>
                                                                    <tr rowspan="5">
                                                                        <td><input style="float:left;" type="button" id="pairwise_button_back" value="Back"></td>
                                                                        <td colspan="10"><input style="float:right;" type="button" id="pairwise_button" value="Next"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="chart_table">
                                                <div class="pageheader-content-chart">
                                                    <div style="width: 100%; height: 100%;" class="card">
                                                        <h5 class="card-header">Weight (%)</h5>
                                                        <div class="card-body">
                                                            <div style="width:100%; height:100vh; overflow:auto;" class="table-responsive">
                                                                <table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th></th>
                                                                            <th></th>
                                                                            <th scope="col">Trust</th>
                                                                            <th scope="col">Commitment</th>
                                                                            <th scope="col">Integrity</th>
                                                                            <th scope="col">Track Record</th>
                                                                            <th scope="col">Experience</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td>
                                                                                <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="trust_weight" class="trust_weight" id="trust_weight" readOnly>
                                                                            </td>
                                                                            <td>
                                                                                <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="commit_weight" class="commit_weight" id="commit_weight" readOnly>
                                                                            </td>
                                                                            <td>
                                                                                <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="inte_weight" class="inte_weight" id="inte_weight" readOnly>
                                                                            </td>
                                                                            <td>
                                                                                <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="track_weight" class="track_weight" id="track_weight" readOnly>
                                                                            </td>
                                                                            <td>
                                                                                <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="exp_weight" class="exp_weight" id="exp_weight" readOnly>
                                                                            </td>
                                                                            <td></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div class="weight_chart_container">
                                                                    <canvas id="weight_chart_bar">

                                                                    </canvas>
                                                                </div>
                                                                <input style="float:left;" type="button" id="chart_button_back" value="Back">
                                                                <input style="float:right;" type="button" id="chart_button" value="Next">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="conclusion_table">
                                                <div style="width: 100%; height: 100%;" class="card">
                                                    <h4 class="card-header">Conclusion</h4>
                                                    <div class="card-body">
                                                        <div style="width:100%; height:100%;overflow:auto;" class="table-responsive">
                                                            <table class="table table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Data Count</th>
                                                                        <th scope="col">Constant</th>
                                                                        <th scope="col">Lambda Max</th>
                                                                        <th scope="col">Consistency Index (CI)</th>
                                                                        <th scope="col">Consistency Ratio (CR)</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="data_count" class="data_count" id="data_count" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="constant" class="constant" id="constant" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="lambda_max" class="lambda_max" id="lambda_max" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="c_index" class="c_index" id="c_index" readOnly>
                                                                        </td>
                                                                        <td>
                                                                            <input style="width:70px;background-color:#d9d9d9;outline:none;cursor:default;" type="number" name="c_ratio" class="c_ratio" id="c_ratio" readOnly>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="5">
                                                                            <input style="width:100%;height:40px;text-align:center;background-color:#d9d9d9;outline:none;cursor:default;" type="text" name="conclusion_msg" class="conclusion_msg" id="conclusion_msg" readOnly>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><input style="float:left;" type="button" id="conclusion_button_back" value="Back"></td>
                                                                        <input type="hidden" name="initiator" value="<%=username%>">
                                                                        <td colspan="5"><input style="float:right;" type="submit" name="submit" class="create-button" id="create-button" value="Create"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="pageheader-content-review">
                                        <div class="pageheader-content-table">
                                            <div style="width: 100%; height: 100vh;" class="card">
                                                <h5 class="card-header">Project</h5>
                                                <div class="project_review_container">
                                                    <div class="card-body">
                                                        <div style="width:100%; height:100%; overflow:auto;" class="table-responsive">
                                                            <table class="table table-striped table-bordered first">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Project Name</th>
                                                                        <th>Project Code</th>
                                                                        <th>Project Option</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <%
                                                                        try {
                                                                            String data_join = "SELECT * FROM project_table "
                                                                                    + "LEFT JOIN project_criteria ON project_table.id = project_criteria.id "
                                                                                    + "LEFT JOIN project_weight ON project_criteria.id = project_weight.id";
                                                                            PreparedStatement ps = java_process.connection().prepareStatement(data_join);
                                                                            ResultSet rs = ps.executeQuery();
                                                                            while (rs.next()) {
                                                                                if(rs.getString(10).equals(username)){
                                                                                    String name = rs.getString(2);
                                                                                    String code = rs.getString(3);
                                                                                    String category = rs.getString(4);
                                                                                    String intro = rs.getString(5);
                                                                                    String background = rs.getString(6);
                                                                                    String objective = rs.getString(7);
                                                                                    String start_date = rs.getString(8);
                                                                                    String end_date = rs.getString(9);
                                                                                    String lambda_max = rs.getString(12);
                                                                                    String ci = rs.getString(13);
                                                                                    String cr = rs.getString(14);
                                                                                    String constant = rs.getString(15);
                                                                                    String trust_weight = rs.getString(17);
                                                                                    String commit_weight = rs.getString(18);
                                                                                    String inte_weight = rs.getString(19);
                                                                                    String track_weight = rs.getString(20);
                                                                                    String exp_weight = rs.getString(21);
                                                                                    out.print("<tr class='project_data_tr'>"
                                                                                            + "<td class='project_n'><input style='background-color: transparent;border:0;outline:none;' type='text' name='name' class='name' id='name' value='" + name + "' readOnly></td>"
                                                                                            + "<td class='project_c'><input style='background-color: transparent;border:0;outline:none;' type='text' name='code' class='code' id='code' value='" + code + "' readOnly></td>"
                                                                                            + "<td class='project_data_td'>"
                                                                                            + "<form action='jsp_process.jsp' method='POST' target='_blank'>"
                                                                                            + "<input type='hidden' name='trust_weight_data' id='trust_weight_data' value='" + trust_weight + "'>"
                                                                                            + "<input type='hidden' name='commit_weight_data' id='commit_weight_data' value='" + commit_weight + "'>"
                                                                                            + "<input type='hidden' name='inte_weight_data' id='inte_weight_data' value='" + inte_weight + "'>"
                                                                                            + "<input type='hidden' name='track_weight_data' id='track_weight_data' value='" + track_weight + "'>"
                                                                                            + "<input type='hidden' name='exp_weight_data' id='exp_weight_data' value='" + exp_weight + "'>"
                                                                                            + "<input type='hidden' name='lambda_max_data' id='lambda_max_data' value='" + lambda_max + "'>"
                                                                                            + "<input type='hidden' name='ci_data' id='ci_data' value='" + ci + "'>"
                                                                                            + "<input type='hidden' name='cr_data' id='cr_data' value='" + cr + "'>"
                                                                                            + "<input type='hidden' name='constant_data' id='constant_data' value='" + constant + "'>"
                                                                                            + "<input type='hidden' name='name' class='name' id='name' value='" + name + "'>"
                                                                                            + "<input type='hidden' name='code' class='code' id='code' value='" + code + "'>"
                                                                                            + "<input type='submit' name='submit' class='project-button-view' id='project-button-view' value='View'><hr>"
                                                                                            + "</form>"
                                                                                            + "<form action='jsp_process.jsp' method='POST'>"
                                                                                            + "<input type='hidden' name='name' class='name' id='name' value='" + name + "'>"
                                                                                            + "<input type='hidden' name='code' class='code' id='code' value='" + code + "'>"
                                                                                            + "<input type='submit' name='submit' class='project-button-delete' id='project-button-delete' value='Delete'><hr>"
                                                                                            + "</form>"
                                                                                            + "<p>"
                                                                                            + "<input type='hidden' name='name' class='name' id='name' value='" + name + "'>"
                                                                                            + "<input type='hidden' name='code' class='code' id='code' value='" + code + "'>"
                                                                                            + "<input type='hidden' name='category_data' class='category_data' id='category_data' value='" + category + "'>"
                                                                                            + "<input type='hidden' name='intro_data' class='intro_data' id='intro_data' value='" + intro + "'>"
                                                                                            + "<input type='hidden' name='background_data' class='background_data' id='background_data' value='" + background + "'>"
                                                                                            + "<input type='hidden' name='objective_data' class='objective_data' id='objective_data' value='" + objective + "'>"
                                                                                            + "<input type='hidden' name='start_date_data' class='start_date_data' id='start_date_data' value='" + start_date + "'>"
                                                                                            + "<input type='hidden' name='end_date_data' class='end_date_data' id='end_date_data' value='" + end_date + "'>"
                                                                                            + "<input type='button' name='project-button-update' class='project-button-update' id='project-button-update' value='Update'>"
                                                                                            + "</p>"
                                                                                            + "</td>");
                                                                                }
                                                                            }
                                                                            java_process.connection().close();
                                                                        } catch (SQLException ex) {
                                                                            out.print(ex.toString());
                                                                        }
                                                                    %>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                               
                                    </div>
                                    <div style="width: 100%;" class="card">
                                        <div class="contract_list">
                                            <h4 class="card-header">Project Dashboard</h4>
                                            <div class="table-responsive">
                                                <div style="width: 100%;" class="card-body">
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Details</th>
                                                                <th>About</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <%
                                                                try {
//                                                                    int counter = 0;
                                                                    String data = "SELECT * FROM project_table";
                                                                    PreparedStatement ps = java_process.connection().prepareStatement(data);
                                                                    ResultSet rs = ps.executeQuery();
//                                                                    while (rs.next()) {
//                                                                        String name = rs.getString(2);
//                                                                        String code = rs.getString(3);
//                                                                        String data_1 = "SELECT * FROM user_contract WHERE username=? AND project_name=? AND project_code=?";
//                                                                        PreparedStatement statement = java_process.connection().prepareStatement(data_1);
//                                                                        statement.setString(1, username);
//                                                                        statement.setString(2, name);
//                                                                        statement.setString(3, code);
//                                                                        ResultSet result = statement.executeQuery();
//                                                                        while (result.next()) {
//                                                                            counter++;
//                                                                        }
//                                                                    }
                                                                    data = "SELECT * FROM project_table";
                                                                    ps = java_process.connection().prepareStatement(data);
                                                                    rs = ps.executeQuery();
                                                                    while (rs.next()) {
                                                                        String name = rs.getString(2);
                                                                        String code = rs.getString(3);
                                                                        String category = rs.getString(4);
                                                                        String intro = rs.getString(5);
                                                                        String background = rs.getString(6);
                                                                        String objective = rs.getString(7);
                                                                        String start_date = rs.getString(8);
                                                                        String end_date = rs.getString(9);
                                                                        String initiator = rs.getString(10);
                                                                        String data_1 = "SELECT * FROM user_contract WHERE username=? AND project_name=? AND project_code=?";
                                                                        PreparedStatement statement = java_process.connection().prepareStatement(data_1);
                                                                        statement.setString(1, username);
                                                                        statement.setString(2, name);
                                                                        statement.setString(3, code);
                                                                        ResultSet result = statement.executeQuery();
                                                                        if(!initiator.equals(username)){
                                                                            if (result.next()) {
                                                                                    out.print("<tr class='project_data_tr'>"
                                                                                            + "<td style='width:300px'>"
                                                                                            + "<form action='jsp_process.jsp' method='POST'>"
                                                                                            + "<b>Name : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_name' class='project_name' id='project_name' value='" + name + "' readOnly><hr>"
                                                                                            + "<b>Code : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_code' class='project_code' id='project_code' value='" + code + "' readOnly><hr>"
                                                                                            + "<b>Category : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_category' class='project_category' id='project_category' value='" + category + "' readOnly><hr>"
                                                                                            + "<p><b>Start Date : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_start' class='project_start' id='project_start' value='" + start_date + "' readOnly></p>"
                                                                                            + "<p><b>End Date : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_end' class='project_end' id='project_end' value='" + end_date + "' readOnly></p>"
                                                                                            + "<input style='float:left;padding: 10px;width:100px;background-color:rgb(244,208,63);color:rgb(50,50,50);cursor: pointer;' type='submit' name='submit' id='submit-button' value='Cancel'>"
                                                                                            + "</form>"
                                                                                            + "</td>"
                                                                                            + "<td>"
                                                                                            + "<b>Introduction : </b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + intro + "</textarea><hr>"
                                                                                            + "<b>Objective : </b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + objective + "</textarea><hr>"
                                                                                            + "<b>Background : </b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + background + "</textarea>"
                                                                                            + "</td>"
                                                                                            + "</tr>");
                                                                                } else if (!result.next()) {
                                                                                    out.print("<tr class='project_data_tr'>"
                                                                                            + "<td style='width:300px'>"
                                                                                            + "<form action='jsp_process.jsp' method='POST'>"
                                                                                            + "<b>Name : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_name' class='project_name' id='project_name' value='" + name + "' readOnly><hr>"
                                                                                            + "<b>Code : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_code' class='project_code' id='project_code' value='" + code + "' readOnly><hr>"
                                                                                            + "<b>Category : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_category' class='project_category' id='project_category' value='" + category + "' readOnly><hr>"
                                                                                            + "<p><b>Start Date : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_start' class='project_start' id='project_start' value='" + start_date + "' readOnly></p>"
                                                                                            + "<p><b>End Date : </b><input style='border:none;outline:none;background-color:transparent;' type='text' name='project_end' class='project_end' id='project_end' value='" + end_date + "' readOnly></p>"
                                                                                            + "<input style='float:left;padding: 10px;width:100px;cursor: pointer;' type='submit' name='submit' id='submit-button' value='Request'>"
                                                                                            + "</form>"
                                                                                            + "</td>"
                                                                                            + "<td>"
                                                                                            + "<b>Introduction : </b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + intro + "</textarea><hr>"
                                                                                            + "<b>Objective : </b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + objective + "</textarea><hr>"
                                                                                            + "<b>Background : </b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + background + "</textarea>"
                                                                                            + "</td>"
                                                                                            + "</tr>");
                                                                                }
                                                                        }
                                                                    }
                                                                    java_process.connection().close();
                                                                } catch (SQLException ex) {
                                                                    out.print(ex.toString());
                                                                }
                                                            %>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- ============================================================== -->
                            <!-- end pageheader  -->
                            <!-- ============================================================== -->
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- end sales traffice country source  -->
                    <!-- ============================================================== -->
                    <!-- ============================================================== -->
                    <!-- footer -->
                    <!-- ============================================================== -->
                    <footer class="footer">
                        <div class="container-fluid">
                            <nav class="pull-left">
                                <ul style="display: flex;justify-content: space-around;list-style: none;">
                                    <li>
                                        <a href="http://www.ppimg.umt.edu.my">
                                            Pusat Pengajian Informatik Dan Matematik Gunaan
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://www.umt.edu.my">
                                            Universiti Malaysia Terengganu
                                        </a>
                                    </li>
                                    <li>
                                        &copy; <script>document.write(new Date().getFullYear())</script>, made by SIPSS solution
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </footer>
                    <!-- ============================================================== -->
                    <!-- end footer -->
                    <!-- ============================================================== -->
                </div>
                <!-- ============================================================== -->
                <!-- end wrapper  -->
                <!-- ============================================================== -->
            </div>
            <!-- ============================================================== -->
            <!-- end main wrapper  -->
            <!-- ============================================================== -->
            <!-- Optional JavaScript -->
            <!-- jquery 3.3.1 -->
            <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
            <!-- bootstap bundle js -->
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
            <!-- slimscroll js -->
            <script src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
            <!-- main js -->
            <script src="assets/libs/js/main-js.js"></script>
            <!-- chart chartist js -->
            <script src="assets/vendor/charts/chartist-bundle/chartist.min.js"></script>
            <!-- sparkline js -->
            <script src="assets/vendor/charts/sparkline/jquery.sparkline.js"></script>
            <!-- morris js -->
            <script src="assets/vendor/charts/morris-bundle/raphael.min.js"></script>
            <script src="assets/vendor/charts/morris-bundle/morris.js"></script>
            <!-- chart c3 js -->
            <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
            <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
            <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>
            <script src="assets/vendor/charts/charts-bundle/Chart.bundle.js"></script>
            <script src="assets/vendor/charts/charts-bundle/chartjs.js"></script>
            <script src="assets/libs/js/dashboard-ecommerce.js"></script>
            <!--Extend-->
            <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.js"></script>
            <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
    </body>
</html>