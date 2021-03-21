<%@page import="java.sql.*"%>
<%@page import="JavaPackage.java_process"%>
<!DOCTYPE html>
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
        <%
            String project_name = session.getAttribute("project_name").toString();
            String project_code = session.getAttribute("project_code").toString();
            String trust_weight_data = session.getAttribute("trust_weight_data").toString();
            String commit_weight_data = session.getAttribute("commit_weight_data").toString();
            String inte_weight_data = session.getAttribute("inte_weight_data").toString();
            String track_weight_data = session.getAttribute("track_weight_data").toString();
            String exp_weight_data = session.getAttribute("exp_weight_data").toString();
            String lambda_max_data = session.getAttribute("lambda_max_data").toString();
            String ci_data = session.getAttribute("ci_data").toString();
            String cr_data = session.getAttribute("cr_data").toString();
            String constant_data = session.getAttribute("constant_data").toString();
        %>
        <title>Compare <%=project_name%></title>
    </head>
    <body>
        <%
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "no-store");
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
//            response.setIntHeader("Refresh", 1);
            String username = (String) session.getAttribute("username");
            if (username == null) {
                username = "";
                if (username.equals("") || username == "") {
                    out.print("<script>window.close();</script>");
                }
            }
        %>
        <div style="margin: 10px 20px 10px 20px;" class="page-header">       
            <div class="pop_project_details">
                <div style="width: 100%; height: 100%;" class="card">
                    <h5 class="card-header"><%=project_name%> details</h5>
                    <div style="width:100%; height: 100%; overflow:auto;" class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Trust</th>
                                    <th scope="col">Commit</th>
                                    <th scope="col">Integrity</th>
                                    <th scope="col">Track Record</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">Lambda Max</th>
                                    <th scope="col">Consistency Index</th>
                                    <th scope="col">Consistency Ratio</th>
                                    <th scope="col">Constant</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="trust_data" class="trust_data" id="trust_data" value="<%=trust_weight_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="commit_data" class="commit_data" id="commit_data" value="<%=commit_weight_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="inte_data" class="inte_data" id="inte_data" value="<%=inte_weight_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="track_data" class="track_data" id="track_data" value="<%=track_weight_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="exp_data" class="exp_data" id="exp_data" value="<%=exp_weight_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="lamda_max_data" class="lambda_max_data" id="lambda_max_data" value="<%=lambda_max_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="ci_data" class="ci_data" id="ci_data" value="<%=ci_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="cr_data" class="cr_data" id="cr_data" value="<%=cr_data%>" readOnly>
                                    </td>
                                    <td>
                                        <input style="width:70px;background-color:transparent;outline:none;cursor:default;border:none;" 
                                            type="text" name="constant_data" class="constant_data" id="constant_data" value="<%=constant_data%>" readOnly>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="chart_pop">
                <div style="float: left; width: 51%; height:70vh;margin-top:-15px;" class='card'>
                    <h5 class='card-header'>Comparison Table <input style="float: right;" type="button" name="nextChart" id="nextChard" class="nextChard" value=">"></h5>
                    <p style="margin-left:20px;margin-top:2.5px;"> Name : <input style="outline:none;background-color: transparent;border: none;cursor:default;" type="text" name="p_name" class="p_name" id="p_name" readOnly></p>
                    <p style="margin-left:20px;margin-top:-25px;"> Code : <input style="outline:none;background-color: transparent;border: none;cursor:default;" type="text" name="p_code" class="p_code" id="p_code" readOnly></p>
                    <div style="width:100%; height:60vh;overflow:auto;margin-top:-35px;" class='card-body'>
                        <div class="table-responsive">
                            <div class='chart_container_1'>
                                
                            </div>
                            <div class='chart_container_2'>
                                
                            </div>
                            <div class='chart_container_3'>
                                
                            </div>
                            <div class='chart_container_4'>
                                
                            </div>
                            <div class='chart_container_5'>
                                
                            </div>
                            <div class='chart_container_6'>
                                
                            </div>
                            <%
                                try {
                                    int counter = 0;
                                    String data = "SELECT comp_name FROM user_contract WHERE project_name=? AND project_code=?";
                                    PreparedStatement ps = java_process.connection().prepareStatement(data);
                                    ps.setString(1, project_name);
                                    ps.setString(2, project_code);
                                    ResultSet rs = ps.executeQuery();
                                    while (rs.next()) {
                                        counter++;
                                    }
                                    java_process.connection().close();
                                    out.print("<input type='hidden' name='counter' class='counter' id='counter' value=" + counter + ">");
                                } catch (SQLException ex) {
                                    out.print(ex.toString());
                                }
                            %>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop_guide">
                <div style="float: right; width: 48%; height: 100%;margin-top:-15px;" class='card'>
                    <div style="width:100%; height:70vh;" class='card-body'>
                        <div style="width:100%; height:60vh; overflow:auto;"  class="table-responsive">
                            <table class="table table-striped table-bordered first">
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Option</th>
                                </tr>
                                <tbody>
                                    <%
                                        try {
                                            String data = "SELECT * FROM user_contract WHERE project_name=? AND project_code=?";
                                            PreparedStatement ps = java_process.connection().prepareStatement(data);
                                            ps.setString(1, project_name);
                                            ps.setString(2, project_code);
                                            ResultSet rs = ps.executeQuery();
                                            while (rs.next()) {
                                                String data_criteria = "SELECT * FROM user_criteria WHERE id=?";
                                                PreparedStatement statement = java_process.connection().prepareStatement(data_criteria);
                                                statement.setInt(1, rs.getInt(1));
                                                ResultSet result = statement.executeQuery();
                                                if (result.next()) {
                                                    out.print("<tr class='tobe_hire'>"
                                                            + "<th><input style='background-color:transparent;outline:none;border:none;' type='text' name='name_hire' class='name_hire' id='name_hire' value='" + rs.getString(2) + "' readOnly></th>"
                                                            + "<th><input style='background-color:transparent;outline:none;border:none;' type='text' name='comp_hire' class='comp_hire' id='comp_hire' value='" + rs.getString(3) + "' readOnly></th>"
                                                            + "<th class='tobe_hire_td'>"
                                                            + "<form action='jsp_process.jsp' method='GET' class='tobe_hire_form'>"
                                                            + "<input type='hidden' name='trust_hidden' class='trust_hidden' id='trust_hidden' value='" + result.getString(2) + "'>"
                                                            + "<input type='hidden' name='commit_hidden' class='commit_hidden' id='commit_hidden' value='" + result.getString(3) + "'>"
                                                            + "<input type='hidden' name='inte_hidden' class='inte_hidden' id='inte_hidden' value='" + result.getString(4) + "'>"
                                                            + "<input type='hidden' name='track_hidden' class='track_hidden' id='track_hidden' value='" + result.getString(5) + "'>"
                                                            + "<input type='hidden' name='exp_hidden' class='exp_hidden' id='exp_hidden' value='" + result.getString(6) + "'>"
                                                            + "<input type='hidden' name='project_name' value='" + request.getParameter("project_name") + "'>"
                                                            + "<input type='hidden' name='project_code' value='" + request.getParameter("project_code") + "'>"
                                                            + "<input style='float:right;' type='submit' name='submit' class='denied-button' id='denied-button' value='Reject'>"
                                                            + "<input style='float:left;' type='submit' name='submit' class='accept-button' id='accept-button' value='Accept'> "
                                                            + "</form>"
                                                            + "</th>"
                                                            + "</tr>");
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
