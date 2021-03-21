<%@page import="java.util.ArrayList"%>
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
            String project_name = (String) session.getAttribute("project_name");
            String project_code = (String) session.getAttribute("project_code");
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
            <div style="width: 100%; height: 100%;"  class="pop_pairwise">
                <div style="width: 100%; height: 100%;" class="card">
                    <h4 class="card-header">Pairwise Comparisons (Trustworthiness)
                        <div class="floater_parent" id="floater_parent">
                            <img style="cursor: pointer;float: right;" class="floater_img_tag" src="assets\images\information.png" width="20px" height="20px">
                            <div class="floater_tag" id="floater_tag">
                                <div style="margin-left: 40%">
                                    <p style="font-weight: bold;">About Pairwise Comparison<p>
                                    <p style="padding:0 50px 0 50px;">
                                        Please compare the TWO criteria as given in the table (e.g. Trust vs Commitment) based on the index
                                        ranking scale from ranking 1-9 for your new project. The scale given is to guide you in prioritizing the
                                        criteria based on your preference.
                                    </p>
                                    <p style="padding:0 50px 0 50px;">
                                        For example please select 1 if criteria Trust is equal importance to Commitment. If criteria trust is strongly important than commitment, please select 9 as the index scale in the given dropdown.
                                    </p>
                                    <p style="padding:0 50px 0 50px;">
                                        For details index ranking scale refer Ranking Scale
                                    </p>
                                </div>
                                <div style="position: absolute; top: 0;">
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
                        </div>
                    </h4>
                    <div class="card-body">
                        <div style="width:100%; height:100%; overflow:auto;" class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <%
                                        try {
                                            String data_join = "SELECT * FROM user_contract WHERE project_name=? AND project_code=?";
                                            PreparedStatement ps = java_process.connection().prepareStatement(data_join);
                                            ps.setString(1, project_name);
                                            ps.setString(2, project_code);
                                            ResultSet rs = ps.executeQuery();
                                            while (rs.next()) {
                                                out.print("<th scope='col'>" + rs.getString(3) + "</th>");
                                            }
                                            java_process.connection().close();
                                        } catch (SQLException ex) {
                                            out.print(ex.toString());
                                        }
                                    %>
                                </thead>
                                <tbody>
                                    <tr>
                                    <%
                                        try {
                                            String data_join = "SELECT * FROM user_contract WHERE project_name=? AND project_code=?";
                                            PreparedStatement ps = java_process.connection().prepareStatement(data_join);
                                            ps.setString(1, project_name);
                                            ps.setString(2, project_code);
                                            ResultSet rs = ps.executeQuery();
                                            while (rs.next()) {
                                                String getData = "SELECT trust FROM user_criteria WHERE id=?";
                                                PreparedStatement statement = java_process.connection().prepareStatement(getData);
                                                statement.setInt(1, rs.getInt(1));
                                                ResultSet result = statement.executeQuery();
                                                if(result.next()){
                                                    out.print("<td>"
                                                            + "<input type='number' name='trust_ref' class='trust_ref' id='pw_constant' readOnly>%"
                                                            + "</td>");
                                                }
                                            }
                                            java_process.connection().close();
                                        } catch (SQLException ex) {
                                            out.print(ex.toString());
                                        }
                                    %>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-body">
                        <div style="width:100%; height:100%; overflow:auto;" class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope='col'>Collaborator</th>
                                        <%
                                            try {
                                                String data_join = "SELECT comp_name FROM user_contract WHERE project_name=? AND project_code=?";
                                                PreparedStatement ps = java_process.connection().prepareStatement(data_join);
                                                ps.setString(1, project_name);
                                                ps.setString(2, project_code);
                                                ResultSet rs = ps.executeQuery();
                                                while (rs.next()) {
                                                    out.print("<th scope='col'>" + rs.getString(1) + "</th>");
                                                }
                                                java_process.connection().close();
                                            } catch (SQLException ex) {
                                                out.print(ex.toString());
                                            }
                                        %>
                                    </tr>
                                </thead>
                                <tbody>
                                    <%
                                        try {
                                            ArrayList<String> user_name = new ArrayList<String>();
                                            String data = "SELECT comp_name FROM user_contract WHERE project_name=? AND project_code=?";
                                            PreparedStatement ps = java_process.connection().prepareStatement(data);
                                            ps.setString(1, project_name);
                                            ps.setString(2, project_code);
                                            ResultSet rs = ps.executeQuery();
                                            while (rs.next()) {
                                                out.print("<input type='hidden' name='comp_name' class='comp_name' id='comp_name' value=" + rs.getString(1) + ">");
                                                user_name.add(rs.getString(1));
                                            }
                                            out.print("<input type='hidden' name='counter' class='counter' id='counter' value=" + user_name.size() + ">");
                                            switch (user_name.size()) {
                                                case 0:
                                                    break;
                                                case 1:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 2:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 3:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 4:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_track' class='trust_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_track' class='commit_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_track' class='inte_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(3) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_trust' class='track_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_commit' class='track_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_inte' class='track_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_track' class='track_track' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 5:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_track' class='trust_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_exp' class='trust_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_track' class='commit_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_exp' class='commit_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_track' class='inte_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_exp' class='inte_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(3) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_trust' class='track_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_commit' class='track_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_inte' class='track_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_track' class='track_track' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_exp' class='track_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(4) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_trust' class='exp_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_commit' class='exp_commit' id='pw_box'>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_inte' class='exp_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_track' class='exp_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_exp' class='exp_exp' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 6:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_track' class='trust_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_exp' class='trust_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_6' class='extend1_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_track' class='commit_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_exp' class='commit_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_6' class='extend2_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_track' class='inte_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_exp' class='inte_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_6' class='extend3_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(3) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_trust' class='track_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_commit' class='track_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_inte' class='track_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_track' class='track_track' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_exp' class='track_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_6' class='extend4_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(4) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_trust' class='exp_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_commit' class='exp_commit' id='pw_box'>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_inte' class='exp_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_track' class='exp_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_exp' class='exp_exp' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_6' class='extend5_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(5) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_1' class='extend6_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_2' class='extend6_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_3' class='extend6_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_4' class='extend6_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_5' class='extend6_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_6' class='extend6_6' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 7:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_track' class='trust_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_exp' class='trust_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_6' class='extend1_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_7' class='extend1_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_track' class='commit_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_exp' class='commit_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_6' class='extend2_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_7' class='extend2_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_track' class='inte_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_exp' class='inte_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_6' class='extend3_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_7' class='extend3_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(3) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_trust' class='track_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_commit' class='track_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_inte' class='track_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_track' class='track_track' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_exp' class='track_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_6' class='extend4_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_7' class='extend4_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(4) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_trust' class='exp_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_commit' class='exp_commit' id='pw_box'>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_inte' class='exp_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_track' class='exp_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_exp' class='exp_exp' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_6' class='extend5_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_7' class='extend5_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(5) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_1' class='extend6_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_2' class='extend6_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_3' class='extend6_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_4' class='extend6_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_5' class='extend6_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_6' class='extend6_6' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_7' class='extend6_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(6) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_1' class='extend7_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_2' class='extend7_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_3' class='extend7_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_4' class='extend7_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_5' class='extend7_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_6' class='extend7_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_7' class='extend7_7' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 8:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_track' class='trust_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_exp' class='trust_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_6' class='extend1_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_7' class='extend1_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_8' class='extend1_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_track' class='commit_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_exp' class='commit_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_6' class='extend2_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_7' class='extend2_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_8' class='extend2_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_track' class='inte_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_exp' class='inte_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_6' class='extend3_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_7' class='extend3_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_8' class='extend3_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(3) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_trust' class='track_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_commit' class='track_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_inte' class='track_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_track' class='track_track' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_exp' class='track_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_6' class='extend4_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_7' class='extend4_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_8' class='extend4_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(4) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_trust' class='exp_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_commit' class='exp_commit' id='pw_box'>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_inte' class='exp_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_track' class='exp_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_exp' class='exp_exp' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_6' class='extend5_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_7' class='extend5_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_8' class='extend5_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(5) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_1' class='extend6_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_2' class='extend6_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_3' class='extend6_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_4' class='extend6_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_5' class='extend6_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_6' class='extend6_6' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_7' class='extend6_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_8' class='extend6_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(6) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_1' class='extend7_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_2' class='extend7_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_3' class='extend7_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_4' class='extend7_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_5' class='extend7_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_6' class='extend7_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_7' class='extend7_7' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_8' class='extend7_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(7) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_1' class='extend8_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_2' class='extend8_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_3' class='extend8_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_4' class='extend8_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_5' class='extend8_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_6' class='extend8_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_7' class='extend8_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_8' class='extend8_8' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 9:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_track' class='trust_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_exp' class='trust_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_6' class='extend1_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_7' class='extend1_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_8' class='extend1_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_9' class='extend1_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_track' class='commit_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_exp' class='commit_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_6' class='extend2_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_7' class='extend2_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_8' class='extend2_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_9' class='extend2_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_track' class='inte_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_exp' class='inte_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_6' class='extend3_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_7' class='extend3_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_8' class='extend3_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_9' class='extend3_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(3) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_trust' class='track_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_commit' class='track_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_inte' class='track_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_track' class='track_track' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_exp' class='track_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_6' class='extend4_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_7' class='extend4_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_8' class='extend4_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_9' class='extend4_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(4) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_trust' class='exp_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_commit' class='exp_commit' id='pw_box'>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_inte' class='exp_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_track' class='exp_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_exp' class='exp_exp' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_6' class='extend5_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_7' class='extend5_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_8' class='extend5_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_9' class='extend5_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(5) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_1' class='extend6_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_2' class='extend6_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_3' class='extend6_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_4' class='extend6_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_5' class='extend6_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_6' class='extend6_6' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_7' class='extend6_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_8' class='extend6_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_9' class='extend6_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(6) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_1' class='extend7_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_2' class='extend7_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_3' class='extend7_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_4' class='extend7_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_5' class='extend7_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_6' class='extend7_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_7' class='extend7_7' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_8' class='extend7_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_9' class='extend7_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(7) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_1' class='extend8_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_2' class='extend8_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_3' class='extend8_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_4' class='extend8_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_5' class='extend8_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_6' class='extend8_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_7' class='extend8_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_8' class='extend8_8' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_9' class='extend8_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                case 10:
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(0) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_trust' class='trust_trust' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_commit' class='trust_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_inte' class='trust_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_track' class='trust_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='trust_exp' class='trust_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_6' class='extend1_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_7' class='extend1_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_8' class='extend1_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_9' class='extend1_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend1_0' class='extend1_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(1) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_trust' class='commit_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_commit' class='commit_commit' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_inte' class='commit_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_track' class='commit_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='commit_exp' class='commit_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_6' class='extend2_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_7' class='extend2_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_8' class='extend2_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_9' class='extend2_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend2_0' class='extend2_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(2) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_trust' class='inte_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_commit' class='inte_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_inte' class='inte_inte' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_track' class='inte_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='inte_exp' class='inte_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_6' class='extend3_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_7' class='extend3_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_8' class='extend3_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_9' class='extend3_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend3_0' class='extend3_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(3) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_trust' class='track_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_commit' class='track_commit' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_inte' class='track_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_track' class='track_track' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='track_exp' class='track_exp' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_6' class='extend4_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_7' class='extend4_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_8' class='extend4_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_9' class='extend4_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend4_0' class='extend4_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(4) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_trust' class='exp_trust' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_commit' class='exp_commit' id='pw_box'>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_inte' class='exp_inte' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_track' class='exp_track' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='exp_exp' class='exp_exp' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_6' class='extend5_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_7' class='extend5_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_8' class='extend5_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_9' class='extend5_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend5_0' class='extend5_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(5) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_1' class='extend6_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_2' class='extend6_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_3' class='extend6_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_4' class='extend6_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_5' class='extend6_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_6' class='extend6_6' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_7' class='extend6_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_8' class='extend6_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_9' class='extend6_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend6_0' class='extend6_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(6) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_1' class='extend7_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_2' class='extend7_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_3' class='extend7_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_4' class='extend7_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_5' class='extend7_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_6' class='extend7_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_7' class='extend7_7' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_8' class='extend7_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_9' class='extend7_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend7_0' class='extend7_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(7) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_1' class='extend8_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_2' class='extend8_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_3' class='extend8_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_4' class='extend8_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_5' class='extend8_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_6' class='extend8_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_7' class='extend8_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_8' class='extend8_8' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_9' class='extend8_9' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend8_0' class='extend8_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    out.print("<tr>"
                                                            + "<th scope='col'>" + user_name.get(8) + "</th>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_1' class='extend8_1' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_2' class='extend9_2' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_3' class='extend9_3' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_4' class='extend9_4' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_5' class='extend9_5' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_6' class='extend9_6' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_7' class='extend9_7' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_8' class='extend9_8' id='pw_box' required>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_9' class='extend9_9' id='pw_constant' value='1.00' readOnly>"
                                                            + "</td>"
                                                            + "<td>"
                                                            + "<input type='number' name='extend9_0' class='extend9_0' id='pw_box' required>"
                                                            + "</td>"
                                                            + "</tr>");
                                                    break;
                                                default:
                                                    break;
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
                    <%
                        try {
                            String getId = "SELECT id FROM user_contract WHERE project_name=? AND project_code=?";
                            PreparedStatement ps = java_process.connection().prepareStatement(getId);
                            ps.setString(1, project_name);
                            ps.setString(2, project_code);
                            ResultSet rs = ps.executeQuery();
                            while(rs.next()){
                                String data = "SELECT * FROM user_criteria WHERE id=?";
                                PreparedStatement statement = java_process.connection().prepareStatement(data);
                                statement.setInt(1, rs.getInt(1));
                                ResultSet result = statement.executeQuery();
                                while(result.next()){
                                    out.print("<input type='hidden' name='trust_criteria' class='trust_criteria' id='trust_criteria' value='"+result.getInt(2)+"'>"
                                            + "<input type='hidden' name='commit_criteria' class='commit_criteria' id='commit_criteria' value='"+result.getInt(3)+"'>"
                                            + "<input type='hidden' name='inte_criteria' class='inte_criteria' id='inte_criteria' value='"+result.getInt(4)+"'>"
                                            + "<input type='hidden' name='track_criteria' class='track_criteria' id='track_criteria' value='"+result.getInt(5)+"'>"
                                            + "<input type='hidden' name='exp_criteria' class='exp_criteria' id='exp_criteria' value='"+result.getInt(6)+"'>");
                                }
                            }
                            java_process.connection().close();
                        } catch (SQLException ex) {
                            out.print(ex.toString());
                        }
                    %>
                </div>
                <div class="chart_pop_1">
                    <div style="float: left; width: 100%; height:100%;margin-top:-15px;" class='card'>
                        <p style="margin-left:20px;margin-top:2.5px;"> Name : <input style="outline:none;background-color: transparent;border: none;cursor:default;" type="text" name="p_name" class="p_name" id="p_name" readOnly></p>
                        <p style="margin-left:20px;margin-top:-25px;"> Code : <input style="outline:none;background-color: transparent;border: none;cursor:default;" type="text" name="p_code" class="p_code" id="p_code" readOnly></p>
                        <div style="width:100%; height:100%;overflow:auto;margin-top:-35px;" class='card-body'>
                            <div class="table-responsive">
                                <div class='chart_display'>
                                    <canvas id="chart_bar_display">

                                    </canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pop_conclusion">
                    <div style="width: 100%; height: 100%;" class="card">
                        <div style="width:100%; height:100%;overflow:auto;" class="table-responsive">
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td colspan="5">
                                            <input style="width: 100%; height: 40px; text-align: center;;background-color:#d9d9d9;" type="text" name="conclusion_msg" class="conclusion_msg" id="conclusion_msg" readOnly>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <input type="hidden" name="trust_data" class="trust_data" id="trust_data" value="1" readOnly>
                            <input type="hidden" name="commit_data" class="commit_data" id="commit_data" value="1" readOnly>
                            <input type="hidden" name="inte_data" class="inte_data" id="inte_data" value="1" readOnly>
                            <input type="hidden" name="track_data" class="track_data" id="track_data" value="1" readOnly>
                            <input type="hidden" name="exp_data" class="exp_data" id="exp_data" value="1" readOnly>
                            <input type="hidden" name="extend6_data" class="extend6_data" id="extend6_data" value="1" readOnly>
                            <input type="hidden" name="extend7_data" class="extend7_data" id="extend7_data" value="1" readOnly>
                            <input type="hidden" name="extend8_data" class="extend8_data" id="extend8_data" value="1" readOnly>
                            <input type="hidden" name="extend9_data" class="extend9_data" id="extend9_data" value="1" readOnly>
                            <input type="hidden" name="extend0_data" class="extend0_data" id="extend0_data" value="1" readOnly>
                            <input type="hidden" name="lambda_max" class="lambda_max" id="lambda_max" value="1" readOnly>
                            <input type="hidden" name="c_index" class="c_index" id="c_index" value="1" readOnly>
                            <input type="hidden" name="c_ratio" class="c_ratio" id="c_ratio" value="1" readOnly>
                            <input type="submit" name="proceed_pop_page" id="proceed_pop_page" value="Proceed">
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
