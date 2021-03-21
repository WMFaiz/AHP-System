<%-- 
    Document   : process
    Created on : May 30, 2019, 5:22:06 AM
    Author     : FeralSpirit
--%>

<%@page import="java.util.Arrays"%>
<%@page import="JavaPackage.java_process"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="refresh" content="0;url=index.jsp;">
    </head>
    <body>
        <%
            String input = request.getParameter("submit").toLowerCase();
            
            if(input.equalsIgnoreCase("Log in")){
                String username = request.getParameter("login-menu-username");
                String password = request.getParameter("login-menu-password");
                if(!username.equals("") && !password.equals("")){
                    String checker = java_process.login(username, password);
                    if (checker.indexOf("Admin") == -1 && !checker.equals("invalid") && !checker.equals("super")) {
                        session.setAttribute("username", checker);
                        response.sendRedirect("contractor-page.jsp");
                    } else if(checker.equals("super")){
                        session.setAttribute("username", checker);
                        response.sendRedirect("admin-page.jsp");
                    } else if(checker.equals("invalid")){
                        response.sendRedirect("index.jsp");
                    }
                }else if(username.equals("") && password.equals("")){
                    out.print("<script>alert('Please insert your username and password');</script>");
                }
            }else if(input.equalsIgnoreCase("sign up")){
                Part logo = request.getPart("file-signup");
                String username = request.getParameter("username-signup");
                String password = request.getParameter("password-signup");
                String comp_name = request.getParameter("comp-name-signup");
                String comp_reg = request.getParameter("com-reg-signup");
                String loc = request.getParameter("loc-signup");
                String xpertise = request.getParameter("xpertise-signup");
                String xperience = request.getParameter("xperience-signup");
                String contact = request.getParameter("cont-signup");
                String email = request.getParameter("email-signup");
                String descr = request.getParameter("descr-signup");
                String checker = java_process.create_user(logo, username, password, comp_name, comp_reg, loc, xpertise, xperience, contact, email, descr);
                if (checker.equals("true")) {
                    out.print("<script type='text/javascript'>alert('Successfuly create your account');</script>");
                }else if (checker.equals("taken")) {
                    out.print("<script type='text/javascript'>alert('The username is already been taken');</script>");
                }else if(!checker.equals("true") && !checker.equals("taken")){
                    out.print("<script type='text/javascript'>alert('"+checker+"');</script>");
                }
            }else if(input.equalsIgnoreCase("logout")){
                session.removeAttribute("username");
                session.invalidate();
            }else if(input.equalsIgnoreCase("submit")){
                double AddOn_6 = 0;
                double AddOn_1 = 0;
                double AddOn_5 = 0;
                
                double totalTrust = 0;
                double totalCommitment = 0;
                double totalIntegrity = 0;
                double totalTrackRecord = 0;
                double totalManagementExperience = 0;
                String username = (String) session.getAttribute("username");
                if (!username.equals("")) {
                    String[] answersBox = request.getParameterValues("option");
                    double[] convertAnswerBox = new double[answersBox.length];
                    for(int i = 0; i < answersBox.length; i++){
                        if(i == 6){
                            if(Float.parseFloat(answersBox[i]) == 1){
                                convertAnswerBox[i] = 0.5f;
                            }else if(Float.parseFloat(answersBox[i]) == 2){
                                convertAnswerBox[i] = 1;
                            }
                        }else{
                            convertAnswerBox[i] = Float.parseFloat(answersBox[i]);
                        }
                    }
                    for(int i = 0; i < convertAnswerBox.length; i++){
                        //Trust
                        if(i >= 0 && i <= 7){
                            if (i >= 0 && i <= 5) {
                                AddOn_6 += convertAnswerBox[i];
                            }
                            totalTrust += convertAnswerBox[i];
                        }
                        //Commit
                        if(i >= 8 && i <= 26){
                            if (i >= 10 && i <= 14) {
                                AddOn_5 += convertAnswerBox[i];
                            }
                            totalCommitment += convertAnswerBox[i];
                        }
                        //Exp
                        if(i >= 28 && i <=  convertAnswerBox.length){
                            totalManagementExperience += convertAnswerBox[i];
                        }
                    }
                    AddOn_1 = convertAnswerBox[6];
                    totalCommitment += AddOn_6 + AddOn_1;
                    totalIntegrity += convertAnswerBox[27] + AddOn_6;
                    totalTrackRecord += AddOn_6 + AddOn_1 + AddOn_5;
                    totalManagementExperience += AddOn_6;
                    String checker = java_process.add_criteria(username, totalTrust, totalCommitment, totalIntegrity, totalTrackRecord, totalManagementExperience);
                    if (checker.equals("true")) {
                        out.print("<script type='text/javascript'>alert('You criteria has successfuly being save in our database');window.location.href = 'contractor-page.jsp';</script>");
                    } else if (checker.equals("false")) {
                        out.print("<script type='text/javascript'>alert('You criteria has fail to save in our database');window.location.href = 'contractor-page.jsp';</script>");
                    }else if(!checker.equals("true") && !checker.equals("false")){
                        out.print(checker);
                    }
                }
            }else if(input.equalsIgnoreCase("Create")){
                String name = request.getParameter("project_name");
                String code = request.getParameter("project_code");
                String category = request.getParameter("category");
                String intro = request.getParameter("project_intro");
                String background = request.getParameter("project_bg");
                String objective = request.getParameter("project_objective");
                String start_date = request.getParameter("project_start");
                String end_date = request.getParameter("project_end");
                String initiator = request.getParameter("initiator");
                double lambda_max = Double.parseDouble(request.getParameter("lambda_max"));
                double ci = Double.parseDouble(request.getParameter("c_index"));
                double cr = Double.parseDouble(request.getParameter("c_ratio"));
                double constant = Double.parseDouble(request.getParameter("constant"));
                double trust_weight = Double.parseDouble(request.getParameter("trust_weight"));
                double commit_weight = Double.parseDouble(request.getParameter("commit_weight"));
                double inte_weight = Double.parseDouble(request.getParameter("inte_weight"));
                double track_weight = Double.parseDouble(request.getParameter("track_weight"));
                double exp_weight = Double.parseDouble(request.getParameter("exp_weight"));
                String checker = java_process.add_project(name, code, initiator, category, intro, background, 
                                                          objective, start_date, end_date, lambda_max, ci, cr, 
                                                          constant, trust_weight, commit_weight, 
                                                          inte_weight, track_weight, exp_weight);
                if(checker.equals("true")){
                    out.print("<script type='text/javascript'>alert('Successfuly create contract');window.location.href = 'contractor-page.jsp';</script>");
                }else if(!checker.equals("true")){
                    out.print(checker);
                }
            }else if(input.equalsIgnoreCase("Delete")){
                String name = request.getParameter("name");
                String code = request.getParameter("code");
                String username = (String)session.getAttribute("username");
                boolean checker = java_process.delete_project(name, code);
                if(!username.equalsIgnoreCase("super")){
                    if (checker) {
                        out.print("<script type='text/javascript'>alert('Successfuly delete project');window.location.href = 'contractor-page.jsp';</script>");
                    } else if (!checker) {
                        out.print("<script type='text/javascript'>alert('Fail to delete project');window.location.href = 'contractor-page.jsp';</script>");
                    }
                }else if(username.equalsIgnoreCase("super")){
                     if (checker) {
                        out.print("<script type='text/javascript'>alert('Successfuly delete project');window.location.href = 'admin-page.jsp';</script>");
                    } else if (!checker) {
                        out.print("<script type='text/javascript'>alert('Fail to delete project');window.location.href = 'admin-page.jsp';</script>");
                    }
                }
            }else if(input.equalsIgnoreCase("Request")){
                String username = session.getAttribute("username").toString();
                String project_name = request.getParameter("project_name");
                String project_code = request.getParameter("project_code");
                String checker = java_process.create_project_contractor(username, project_name, project_code);
                if(checker.equals("valid")){
                    out.print("<script type='text/javascript'>alert('Successfuly request contract');window.location.href = 'contractor-page.jsp';</script>");
                }else if(checker.equals("invalid")){
                    out.print("<script type='text/javascript'>alert('Fail to request contract');window.location.href = 'contractor-page.jsp';</script>");
                }else if(checker.equals("duplicate")){
                    out.print("<script type='text/javascript'>alert('You already request for this contract');window.location.href = 'contractor-page.jsp';</script>");
                }else if(checker.equals("max")){
                    out.print("<script type='text/javascript'>alert('This project has reach it maximum number of collaborator');window.location.href = 'contractor-page.jsp';</script>");
                }else {
                    out.print(checker);
                }
            }else if(input.equalsIgnoreCase("Cancel")){
                String username = session.getAttribute("username").toString();
                String project_name = request.getParameter("project_name");
                String project_code = request.getParameter("project_code");
                String checker = java_process.delete_cancel_request(username, project_name, project_code);
                if(checker.equals("true")){
                    out.print("<script type='text/javascript'>alert('Successfuly cancel requesting contracr');window.location.href = 'contractor-page.jsp';</script>");
                }else {
                    out.print(checker);
                }
            }else if(input.equalsIgnoreCase("View")){
                String project_name = request.getParameter("name");
                String project_code = request.getParameter("code");
                String trust_weight_data = request.getParameter("trust_weight_data");
                String commit_weight_data = request.getParameter("commit_weight_data");
                String inte_weight_data = request.getParameter("inte_weight_data");
                String track_weight_data = request.getParameter("track_weight_data");
                String exp_weight_data = request.getParameter("exp_weight_data");
                String lambda_max_data = request.getParameter("lambda_max_data");
                String ci_data = request.getParameter("ci_data");
                String cr_data = request.getParameter("cr_data");
                String constant_data = request.getParameter("constant_data");
                
                session.setAttribute("project_name", project_name);
                session.setAttribute("project_code", project_code);
                session.setAttribute("trust_weight_data", trust_weight_data);
                session.setAttribute("commit_weight_data", commit_weight_data);
                session.setAttribute("inte_weight_data", inte_weight_data);
                session.setAttribute("track_weight_data", track_weight_data);
                session.setAttribute("exp_weight_data", exp_weight_data);
                session.setAttribute("lambda_max_data", lambda_max_data);
                session.setAttribute("ci_data", ci_data);
                session.setAttribute("cr_data", cr_data);
                session.setAttribute("constant_data", constant_data);
                
                response.sendRedirect("pop-page_trust.jsp");
//                getServletContext().getRequestDispatcher("/pop-page_trust.jsp").forward(request, response);
            }else if(input.equalsIgnoreCase("Accept")){
                String username = request.getParameter("name_hire");
                String comp_name = request.getParameter("comp_hire");
                String project_name = request.getParameter("project_name");
                String project_code = request.getParameter("project_code");
                String checker = java_process.update_status(username, comp_name,project_name, project_code);
                if(checker.equals("true")){
                    out.print("<script type='text/javascript'>alert('You have accept "+username+" and company "+comp_name+" as your partner');window.close();</script>");
                }else if(!checker.equals("true")){
                    out.print(checker);
                }
            }else if(input.equalsIgnoreCase("Reject")){
                String username = request.getParameter("name_hire");
                String comp_name = request.getParameter("comp_hire");
                String project_name = request.getParameter("project_name");
                String project_code = request.getParameter("project_code");
                String checker = java_process.update_denied_status(username, comp_name,project_name, project_code);
                if(checker.equals("true")){
                    out.print("<script type='text/javascript'>alert('You have accept "+username+" and company "+comp_name+" as your partner');window.close();</script>");
                }else if(!checker.equals("true")){
                    out.print(checker);
                }
            }else if(input.equalsIgnoreCase("Change")){
                String old_username = request.getParameter("super_username_old");
                String new_username = request.getParameter("super_username_new");
                String old_password = request.getParameter("super_password_old");
                String new_password = request.getParameter("super_password_new");
                String checker_username = request.getParameter("super_username");
                String checker_password = request.getParameter("super_password");
                if(checker_username.equals(new_username) && checker_password.equals(new_password)){
                    String checker = java_process.update_super_admin_personal(old_username, new_username, old_password, new_password);
                    if (checker.equals("true'")) {
                        out.print("<script type='text/javascript'>alert('Successfuly update new username and password');window.location.href = 'admin-page.jsp';</script>");
                    } else if (checker.equals("taken")) {
                        out.print("<script type='text/javascript'>alert('Username is already been taken');window.location.href = 'admin-page.jsp';</script>");
                    } else if (checker.equals("false")) {
                        out.print("<script type='text/javascript'>alert('There is no '"+old_username+" in our database');window.location.href = 'admin-page.jsp';</script>");
                    }else {
                        out.print(checker);
                    }
                }else if(!checker_username.equals(new_username) || !checker_password.equals(new_password)){
                    out.print("<script type='text/javascript'>alert('Your new Username or your password is not match when you reenter them');window.location.href = 'contractor-page.jsp';</script>");
                }
            }else if(input.equalsIgnoreCase("Deactive")){
                String username = request.getParameter("admin_user");
                String checker = java_process.delete_user(username);
                if(checker.equals("true")){
                    out.print("<script type='text/javascript'>alert('User by the name of "+username+" has been deleted');window.location.href = 'admin-page.jsp';</script>");
                }
            } else if(input.equalsIgnoreCase("Update")){
                String name = request.getParameter("name");
                String code = request.getParameter("code");
                String category = request.getParameter("category");
                String intro = request.getParameter("project_intro");
                String background = request.getParameter("project_bg");
                String objective = request.getParameter("project_objective");
                String start_date = request.getParameter("project_start");
                String end_date = request.getParameter("project_end");
                String initiator = request.getParameter("initiator");
                double lambda_max = Double.parseDouble(request.getParameter("lambda_max"));
                double ci = Double.parseDouble(request.getParameter("c_index"));
                double cr = Double.parseDouble(request.getParameter("c_ratio"));
                double constant = Double.parseDouble(request.getParameter("constant"));
                double trust_weight = Double.parseDouble(request.getParameter("trust_weight"));
                double commit_weight = Double.parseDouble(request.getParameter("commit_weight"));
                double inte_weight = Double.parseDouble(request.getParameter("inte_weight"));
                double track_weight = Double.parseDouble(request.getParameter("track_weight"));
                double exp_weight = Double.parseDouble(request.getParameter("exp_weight"));
                String checker = java_process.add_project(name, code, initiator, category, intro, background, 
                                                          objective, start_date, end_date, lambda_max, ci, cr, 
                                                          constant, trust_weight, commit_weight, 
                                                          inte_weight, track_weight, exp_weight);
                if(checker.equals("true")){
                    out.print("<script type='text/javascript'>alert('Successfuly update contract');window.location.href = 'contractor-page.jsp';</script>");
                }else if(checker.equals("false")){
                    out.print("<script type='text/javascript'>alert('Fail to update contract');window.location.href = 'contractor-page.jsp';</script>");
                }else {
                    out.print(checker);
                }
            }else {
                response.sendRedirect("index.jsp");
            }
        %>
    </body>
</html>
