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
    <title>SIPSS - Manager</title>
</head>

<body>
    <%
        response.setHeader("cache-control", "no-cache");
        response.setHeader("cache-control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setIntHeader("Refresh", session.getMaxInactiveInterval());
        String username = (String)session.getAttribute("username");
        if(username == null){
            username = "";
            if(username.equals("") || username == ""){
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
                        if(username.equals("super")){
                            out.print("Manager");
                        }else if(!username.equals("super")){
                            out.print("");
                        }
                    %>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto navbar-right-top">
                        <li class="nav-item dropdown nav-user">
                            <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <%
                                    String logo = java_process.getLogo(username);
                                    if(logo.equals("")){
                                        out.print("<img src='assets/images/avatar-1.jpg' alt='' class='user-avatar-md rounded-circle'>");
                                    }else if(!logo.equals("")){
                                        out.print("<img src='"+logo+"' alt='' class='user-avatar-md rounded-circle'>");
                                    }
                                %>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div class="nav-user-info">
                                    <h5 class='mb-0 text-white nav-user-name'>Manager</h5>
                                </div>
                                <%
                                    if(!username.equals("")){
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
                                            <li class='nav-item'>
                                                <ul class='nav flex-column'>
                                                    <li class='nav-item'> 
                                                        <input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-approveadmin' name='button' value='User'>
                                                    </li>
                                                    <li class='nav-item'> 
                                                        <input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-project' name='button' value='Project'>
                                                    </li>
                                                    <li class='nav-item'> 
                                                        <input style='border: none; background-color: transparent; outline: none; cursor: pointer;' type='button' class='nav-link' id='nav-link-personaladmin' name='button' value='Personal'>
                                                    </li>
                                                </ul>
                                            </li>
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
                <div class="container-fluid dashboard-content">
                    <!-- ============================================================== -->
                    <!-- pageheader  -->
                    <!-- ============================================================== -->
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="pageheader-content-project">
                                <div style="width: 100%; height: 100%;" class="card">
                                    <div style="width:100%; height:100%; overflow:auto;" class="table-responsive">
                                        <table class="table table-striped table-bordered first">
                                            <thead>
                                                <tr>
                                                    <th>About</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <%
                                                    try {
                                                        String data_join = "SELECT * FROM project_table";
                                                        PreparedStatement ps = java_process.connection().prepareStatement(data_join);
                                                        ResultSet rs = ps.executeQuery();
                                                        while (rs.next()) {
                                                            String project_name = rs.getString(2);
                                                            String project_code = rs.getString(3);
                                                            String project_category = rs.getString(4);
                                                            String project_intro = rs.getString(5);
                                                            String project_background = rs.getString(6);
                                                            String project_objective = rs.getString(7);
                                                            String project_start_date = rs.getString(8);
                                                            String project_end_date = rs.getString(9);
                                                            String project_initiator = rs.getString(10);
                                                            out.print("<tr class='project_data_tr'>"
                                                                    + "<td>"
                                                                    + "<div style='width:100%;'>"
                                                                    + "Introduction: <p><textarea style='height:10vh;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='intro-review' disabled>" + project_intro + "</textarea></p>"
                                                                    + "Objective: <p><textarea style='height:10vh;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='objecttive-review' disabled>" + project_objective + "</textarea></p>"
                                                                    + "Background: <p><textarea style='height:10vh;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='background-review' disabled>" + project_background + "</textarea></p>"
                                                                    + "</div>"
                                                                    + "</td>"
                                                                    + "<td>"
                                                                    + "<form action='jsp_process.jsp' method='POST'>"
                                                                    + "<p><b>Name: </b><input style='background-color:transparent;border:none;color:grey;' type='text' name='project_name' value='" + project_name + "' readOnly></p>"
                                                                    + "<p><b>Code: </b><input style='background-color:transparent;border:none;color:grey;' type='text' name='project_code' value='" + project_code + "' readOnly></p>"
                                                                    + "<p><b>Category: </b>" + project_category + "</p>"
                                                                    + "<p><b>Start: </b>" + project_start_date + "</p>"
                                                                    + "<p><b>End: </b>" + project_end_date + "</p>"
                                                                    + "<p><b>Initiator: </b>" + project_initiator + "</p><hr>"
                                                                    + "<input style='float:right;background-color: #ff3333;' type='submit' name='submit' class='project-button-view' id='project-button-view' value='Delete'></p>"
                                                                    + "</form>"
                                                                    + "</td>"
                                                                    + "</tr>");
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
                            <div class="pageheader-content-newadmin">
                                <div style="width: 100%; height: 100%;" class="card">
                                    <div style="width:100%; height:100%; overflow:auto;" class="table-responsive">
                                        <table class="table table-striped table-bordered first">
                                            <thead>
                                                <tr>
                                                    <th>About</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <%
                                                    try {
                                                        String data_join = "SELECT * FROM user "
                                                                + "LEFT JOIN comp_details ON user.id = comp_details.id "
                                                                + "LEFT JOIN comp_descr ON comp_details.id = comp_descr.id";
                                                        PreparedStatement ps = java_process.connection().prepareStatement(data_join);
                                                        ResultSet rs = ps.executeQuery();
                                                        while (rs.next()) {
                                                            String adminName = rs.getString(3);
                                                            String adminEmail = rs.getString(10);
                                                            String adminDescr = rs.getString(12);
                                                            String adminXpertise = rs.getString(13);
                                                            String adminXP = rs.getString(14);
                                                            String adminComp_name = rs.getString(6);
                                                            String adminComp_reg = rs.getString(7);
                                                            String adminLoc = rs.getString(8);
                                                            String adminContact = rs.getString(9);
                                                            String icon = java_process.getLogoAdmin(adminName);
                                                            out.print("<tr class='project_data_tr'>"
                                                                    + "<td>"
                                                                    + "<div style='width:100%;'>"
                                                                    + "<img src='" + icon + "' alt='' height='100%' width='150px'>"
                                                                    + "<textarea style='height:100%;width:50%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + adminDescr + "</textarea>"
                                                                    + "</div>"
                                                                    + "</td>"
                                                                    + "<td>"
                                                                    + "<form action='jsp_process.jsp' method='POST'>"
                                                                    + "<p'><b>Username:</b><input style='border:none; background-color:transparent;color:#71748d;outline:none;' type='text' name='admin_user' value='" + adminName + "'></p>"
                                                                    + "<p><b>Email: </b>" + adminEmail + "</p>"
                                                                    + "<p><b>Company Name: </b>" + adminComp_name + "</p>"
                                                                    + "<p><b>Registeration Number: </b>" + adminComp_reg + "</p>"
                                                                    + "<p><b>Location: </b>" + adminLoc + "</p>"
                                                                    + "<p><b>Contact: </b>" + adminContact + "</p>"
                                                                    + "<p><b>Expertise: </b>" + adminXpertise + "</p>"
                                                                    + "<p><b>Experience: </b>" + adminXP + "</p><hr>"
                                                                    + "<input style='float:right;background-color: #ff3333;' type='submit' name='submit' class='project-button-view' id='project-button-view' value='Deactive'></p>"
                                                                    + "</form>"
                                                                    + "</td>"
                                                                    + "</tr>");
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
                            <div class="pageheader-content-superadmin">
                                <%
                                    if (username.equals("super")) {
                                        out.print("<form action='jsp_process.jsp' method='POST'>"
                                                + "<div class='details_table'>"
                                                + "<div style='width: 100%; height: 100%;' class='card'>"
                                                + "<h4 class='card-header'>Change Password & Username</h4>"
                                                + "<div class='card-body'>"
                                                + "<div style='width:100%; height:100%; overflow:auto;' class='table-responsive'>"
                                                + "<table class='table table-striped'>"
                                                + "<tbody>"
                                                + "<tr><th style='text-transform: uppercase;font-size: 20px;' colspan='2'>Username</th></tr>"
                                                + "<tr><th scope='row'>Old Username</th><td><input style='width: 100%; padding: 1px 5px 1px 5px;' type='text' name='super_username_old' id='super_username_old' placeholder='Enter your old Username' required></td></tr>"
                                                + "<tr><th scope='row'>New Username</th><td><input style='width: 100%; padding: 1px 5px 1px 5px;' type='text' name='super_username_new' id='super_username_new' placeholder='Enter your new Username' required></td></tr>"
                                                + "<tr><th scope='row'>Re-Enter Username</th><td><input style='width: 100%; padding: 1px 5px 1px 5px;' type='text' name='super_username' id='super_username' placeholder='Re-enter your new Username' required><spans style='position:absolute;left:30vh;' id='message_username'></span></td></tr>"
                                                + "<tr><th style='text-transform: uppercase;font-size: 20px;' colspan='2'>Password</th></tr>"
                                                + "<tr><th scope='row'>Old Password</th><td><input style='width: 100%; padding: 1px 5px 1px 5px;' type='password' name='super_password_old' id='super_password_old' placeholder='Enter your old Password' required></td></tr>"
                                                + "<tr><th scope='row'>New Password</th><td><input style='width: 100%; padding: 1px 5px 1px 5px;' type='password' name='super_password_new' id='super_password_new' placeholder='Enter your new Password' required></td></tr>"
                                                + "<tr><th scope='row'>Re-Enter Password</th><td><input style='width: 100%; padding: 1px 5px 1px 5px;' type='password' name='super_password' id='super_password' placeholder='Re-enter your new Password' required><span style='position:absolute;left:30vh;' id='message_password'></span></td></tr>"
                                                + "<tr><td colspan='2'><input style='float:right;' type='submit' name='submit' class='create-button' id='create-button' value='Change'></td></tr>"
                                                + "</tbody></table></div></div></div></div></form>");
                                    }
                                %>
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
    <!--<script src="assets/vendor/charts/charts-bundle/chartjs.js"></script>-->
    <script src="assets/libs/js/dashboard-ecommerce.js"></script>
    <!--Extend-->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
</body>
 
</html>