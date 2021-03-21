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
    <title>SIPSS - Home</title>
</head>

<body>
    <%
        response.setHeader("cache-control", "no-cache");
        response.setHeader("cache-control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        session.invalidate();
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
                <a class="navbar-brand" href="">Welcome</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
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
                            <form action="jsp_process.jsp" method="GET" name="login-menu" id="login-menu">
                                <p>Username : <input style="width:100%;" type="text" name="login-menu-username" id="login-menu-username" placeholder="Enter your username" required></p>
                                <p>Password : <input style="width:100%;" type="password" name="login-menu-password" id="login-menu-password" placeholder="Enter your password" required></p>
                                <p><input style="float: left;" type="button" name="signup_menu" id="signup-menu" value="Sign Up"></p>
                                <p><input style="float: right;" type="submit" name="submit" id="login-menu-button" value="Log in"></p>
                            </form>
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
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="front_page_welcome">
                                <div style="width: 100%; height: 100%;" class="card">
                                    <h4 style="text-align: center;font-size: 20px;" class="card-header">Welcome to Smart Integrated Partner Selection System (SIPSS)!</h4>
                                    <div class="card-body">
                                        <div style="position: absolute; padding-right: 60%;top: 30vh;width:100%;"class="table-responsive">
                                            <p style="font-size: 15px;">SIPSS is developed to aid decision makers in making decision for selecting the right partner(s) for their collaboration project.</p>
                                            <p style="font-size: 15px;">The system is based on Analytical Hierarchical Process (AHP) to support top management in their selection, taking intangible criteria into consideration.</p>
                                            <p style="font-size: 15px;">Lets sign up in SIPSS and you will find an excitement in your decision making.</p>
                                        </div>
                                    </div>
                                    <div class="contract_view">
                                        <div style=" float: right; width: 50%; height: 90vh;" class="card">
                                            <h5 style="text-align: center;font-size: 20px;" class="card-header">Job Listing</h5>
                                            <div class="card-body">
                                                <div style="float: right; width:100%; height:80vh; overflow:auto;" class="table-responsive">
                                                    <div class="contract_table_view">
                                                        <table class="table table-striped table-bordered first">
                                                            <thead>
                                                                <tr>
                                                                    <th>Details</th>
                                                                    <th>About</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <%
                                                                    try {
                                                                        String data = "SELECT * FROM project_table";
                                                                        PreparedStatement ps = java_process.connection().prepareStatement(data);
                                                                        ResultSet rs = ps.executeQuery();
                                                                        while (rs.next()) {
                                                                            String name = rs.getString(2);
                                                                            String code = rs.getString(3);
                                                                            String category = rs.getString(4);
                                                                            String intro = rs.getString(5);
                                                                            String background = rs.getString(6);
                                                                            String objective = rs.getString(7);
                                                                            String start_date = rs.getString(8);
                                                                            String end_date = rs.getString(9);
                                                                            out.print("<tr class='project_data_tr'>"
                                                                                    + "<td>"
                                                                                    + "<b>Name:</b><p>" + name + "</p><hr>"
                                                                                    + "<b>Code:</b><p>" + code + "</p><hr>"
                                                                                    + "<b>Category:</b><p>" + category + "</p><hr>"
                                                                                    + "<b>Start Date:</b><p>" + start_date + "</p>"
                                                                                    + "<b>End Date:</b><p>" + end_date + "</p>"
                                                                                    + "</td>"
                                                                                    + "<td>"
                                                                                    + "<b>Introduction:</b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + intro + "</textarea><hr>"
                                                                                    + "<b>Objective:</b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + objective + "</textarea><hr>"
                                                                                    + "<b>Background:</b><textarea style='height:100px;width:100%;resize:none;padding: 1px 5px 1px 5px;border:0;background-color:transparent;' name='descr-signup' disabled>" + background + "</textarea>"
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
                                        </div>
                                    </div>
                                    <div class="signup_container">
                                        <div style="width: 100%; height: 100%;" class="card">
                                            <div class="card-body">
                                                <div style="width:100%; height:100%; overflow:auto;" class="table-responsive">
                                                    <form action="jsp_process.jsp" method="POST" enctype="multipart/form-data">
                                                        <table class="table table-striped">
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row" style="width:200px;">Company Logo:</th>
                                                                    <td><input style="width:100%;" type="file" name="file-signup"></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Username</th>
                                                                    <td><input style="width:100%;padding: 1px 5px 1px 5px;" type="text" name="username-signup" placeholder="Enter username" required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Password</th>
                                                                    <td><input style="width:100%;padding: 1px 5px 1px 5px;" type="password" name="password-signup" id="password-signup" placeholder="Enter password" required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Confirm Password</th>
                                                                    <td>
                                                                        <input style="width:100%;padding: 1px 5px 1px 5px;" type="password" name="confirmation-signup" id="confirmation-signup" placeholder="Re-Enter password" required>
                                                                        <span id="message"></span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Company Name</th>
                                                                    <td><input <input style="width:100%;padding: 1px 5px 1px 5px;" type="text" name="comp-name-signup" placeholder="Enter company name" required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Registration Number</th>
                                                                    <td><input style="width:100%;padding: 1px 5px 1px 5px;" type="text" name="com-reg-signup" placeholder="Enter company registeration number" required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Location</th>
                                                                    <td><input style="width:100%;padding: 1px 5px 1px 5px;" type="text" name="loc-signup" placeholder="Enter company location"  required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Expertise</th>
                                                                    <!--<td><input style="width:100%;padding: 1px 5px 1px 5px;" type="text" name="xpertise-signup" placeholder="Enter company expertise"  required></td>-->
                                                                    <td>
                                                                        <select style="color: black;" class="form-control border-input" name="xpertise-signup" required>
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
                                                                    <th scope="row">Experience</th>
                                                                    <td><input style="width:100%;padding: 1px 5px 1px 5px;" type="number" name="xperience-signup" placeholder="Enter years of experience in business" min="0"  required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Contact</th>
                                                                    <td><input style="width:100%;padding: 1px 5px 1px 5px;" type="number" name="cont-signup" placeholder="Enter company contact" min="0"  required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Email</th>
                                                                    <td><input style="width:100%;padding: 1px 5px 1px 5px;" type="email" name="email-signup" placeholder="Enter company email"  required></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Description</th>
                                                                    <td><textarea style="height:200px;width:100%;resize:none;padding: 1px 5px 1px 5px;" name="descr-signup" placeholder="Enter about your company" required></textarea></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <input style="float:right;padding: 10px;width:100px;" type="submit" name="submit" id="sign-up-button"value="Sign Up">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </form>
                                                </div>
                                            </div>
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
    <script src="assets/libs/js/dashboard-ecommerce.js"></script>
    <!--Extend-->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
</body>
 
</html>