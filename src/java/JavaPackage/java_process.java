/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaPackage;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.RoundingMode;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.Part;

/**
 *
 * @author FeralSpirit
 */
public class java_process {
    
    public static Connection connection() {
        
        String db_url = "jdbc:mysql://localhost:3306/contractor_db";
        String db_class = "com.mysql.jdbc.Driver";
        String db_username = "root";
//        String db_password = "";
        String db_password = "!sup3r_adm1n!";
        
        try {
            Class.forName(db_class);
            Connection conn = DriverManager.getConnection(db_url, db_username, db_password);
            return conn;
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(java_process.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
    
    public static String login (String username, String password) {
        if(!username.equals("") && !password.equals("")){
            try {
                String data = "SELECT * FROM user WHERE username=? AND password=?";
                PreparedStatement ps = connection().prepareStatement(data);
                ps.setString(1, username);
                ps.setString(2, password);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    return rs.getString("username");
                }
                
                data = "SELECT * FROM super_admin WHERE username=? AND password=?";
                ps = connection().prepareStatement(data);
                ps.setString(1, username);
                ps.setString(2, password);
                rs = ps.executeQuery();
                if (rs.next()) {
                    return "super";
                }
                
            } catch (SQLException ex) {
                return ex.toString();
            }
        }else if(username.equals("") && password.equals("")){
            return "invalid";
        }
        return "invalid";
    }
    
    public static String getUsername (String username) {
        try {
            String data_user_selection = "SELECT * FROM super_admin WHERE username=?";
            PreparedStatement ps = connection().prepareStatement(data_user_selection);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                connection().close();
                return rs.getString("username");
            }
        } catch (SQLException ex) {
            return "";
        }
        return "";
    }
    
    public static String getLogo (String username) {
        try {
            String user = "user";
            String data_user_selection = "SELECT * FROM " + user + " WHERE username=?";
            PreparedStatement ps = connection().prepareStatement(data_user_selection);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Blob logo = rs.getBlob("logo");
                InputStream inputStream = logo.getBinaryStream();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[4096];
                int bytesRead = -1;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);                  
                }
                byte[] imageBytes = outputStream.toByteArray();
                String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                inputStream.close();
                outputStream.close();
                connection().close();
                return "data:image/jpg;base64,"+base64Image;
            }
        } catch (SQLException ex) {
            return "";
        } catch (IOException ex) {
            return "";
        }
        return "";
    }
    
    public static String getLogoAdmin (String username) {
        try {
            String data_user_selection = "SELECT * FROM user WHERE username=?";
            PreparedStatement ps = connection().prepareStatement(data_user_selection);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Blob logo = rs.getBlob("logo");
                InputStream inputStream = logo.getBinaryStream();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[4096];
                int bytesRead = -1;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);                  
                }
                byte[] imageBytes = outputStream.toByteArray();
                String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                inputStream.close();
                outputStream.close();
                connection().close();
                return "data:image/jpg;base64,"+base64Image;
            }
        } catch (SQLException ex) {
            return "";
        } catch (IOException ex) {
            return "";
        }
        return "";
    }
    
    public static String create_user(Part logo, String username, String password, String comp_name, String comp_reg, String loc, String xpertise, String xperience, String contact, String email, String descr) {
        try {
            String searchClient = "SELECT username FROM user WHERE username=?";
            PreparedStatement ps = connection().prepareStatement(searchClient);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                InputStream logoIS = null;
                if (logo != null) {
                    logoIS = logo.getInputStream();
                }
                String data_user = "INSERT INTO user(logo, username, password) VALUES (?,?,?)";
                ps = connection().prepareStatement(data_user);
                ps.setBlob(1, logoIS);
                ps.setString(2, username);
                ps.setString(3, password);
                ps.executeUpdate();

                String data_user_selection = "SELECT id FROM user WHERE username=? AND password=?";
                ps = connection().prepareStatement(data_user_selection);
                ps.setString(1, username);
                ps.setString(2, password);
                rs = ps.executeQuery();
                if (rs.next()) {
                    String data_comp_details = "INSERT INTO comp_details(id, comp_name, comp_reg, loc, contact, email) VALUES (?,?,?,?,?,?)";
                    ps = connection().prepareStatement(data_comp_details);
                    ps.setInt(1, rs.getInt("id"));
                    ps.setString(2, comp_name);
                    ps.setString(3, comp_reg);
                    ps.setString(4, loc);
                    ps.setString(5, contact);
                    ps.setString(6, email);
                    ps.executeUpdate();

                    String data_comp_descr = "INSERT INTO comp_descr(id, descr, xpertise, xperience) VALUES (?,?,?,?)";
                    ps = connection().prepareStatement(data_comp_descr);
                    ps.setInt(1, rs.getInt("id"));
                    ps.setString(2, descr);
                    ps.setString(3, xpertise);
                    ps.setString(4, xperience);
                    ps.executeUpdate();
                    connection().close();
                    return "true";
                }
            } else if (rs.next()) {
                connection().close();
                return "taken";
            }
            connection().close();
            return "taken";
        } catch (SQLException | IOException ex) {
            return ex.toString();
        }
    }
    
    public static String add_criteria (String username, double trust, double commit, double inte, double track, double exp) {
        try {
            DecimalFormat df = new DecimalFormat(".##");
            df.setRoundingMode(RoundingMode.CEILING);
            df.format(trust);
            df.format(commit);
            df.format(inte);
            df.format(track);
            df.format(exp);
            
            String search_id = "SELECT id FROM user WHERE username=?";
            PreparedStatement ps = connection().prepareStatement(search_id);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                String data_checker = "SELECT * FROM user_criteria WHERE id=?";
                PreparedStatement ps1 = connection().prepareStatement(data_checker);
                ps1.setInt(1, rs.getInt(1));
                ResultSet rs1 = ps1.executeQuery();
                if(rs1.next()){
                    String data_update = "UPDATE user_criteria SET trust=?, commit=?, inte=?, track=?, exp=? WHERE id=?";
                    PreparedStatement ps2 = connection().prepareStatement(data_update);
                    ps2.setDouble(1, trust);
                    ps2.setDouble(2, commit);
                    ps2.setDouble(3, inte);
                    ps2.setDouble(4, track);
                    ps2.setDouble(5, exp);
                    ps2.setInt(6, rs.getInt(1));
                    ps2.executeUpdate();
                    connection().close();
                    return "true";
                }else if(!rs1.next()){
                    String data_criteria = "INSERT INTO user_criteria(id,trust,commit,inte,track,exp) VALUES (?,?,?,?,?,?)";
                    PreparedStatement ps3 = connection().prepareStatement(data_criteria);
                    ps3.setInt(1, rs.getInt("id"));
                    ps3.setDouble(2, trust);
                    ps3.setDouble(3, commit);
                    ps3.setDouble(4, inte);
                    ps3.setDouble(5, track);
                    ps3.setDouble(6, exp);
                    ps3.executeUpdate();
                    connection().close();
                    return "true";
                }
            }else if(!rs.next()){
                connection().close();
                return "false";
            }
        } catch (SQLException ex) {
            return ex.toString();
        }
        return "false";
    }
    
    public static String contractor_retrieve () {
        try {
            String comp_descr = "comp_descr";
            String comp_details = "comp_details";
            String user_criteria = "user_criteria";
            String comp_name = "";
            String loc = "";
            String contact = "";
            String email = "";
            String expertise = "";
            String experience = "";
            String trust = "";
            String commit = "";
            String inte = "";
            String track = "";
            String exp = "";
            String data_comp_details = "SELECT * FROM " + comp_details;
            PreparedStatement ps = connection().prepareStatement(data_comp_details);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                comp_name = rs.getString(2);
                loc = rs.getString(4);
                contact = rs.getString(5);
                email = rs.getString(6);
                
                String data_comp_descr = "SELECT * FROM " + comp_descr;
                PreparedStatement ps1 = connection().prepareStatement(data_comp_descr);
                ResultSet rs1 = ps1.executeQuery();
                if(rs1.next()){
                    expertise = rs1.getString(3);
                    experience = rs1.getString(4);
                }
                
                String data_user_criteria = "SELECT * FROM " + user_criteria;
                PreparedStatement ps2 = connection().prepareStatement(data_user_criteria);
                ResultSet rs2 = ps2.executeQuery();
                if(rs2.next()){
                    trust = rs2.getString(2);
                    commit = rs2.getString(3);
                    inte = rs2.getString(4);
                    track = rs2.getString(5);
                    exp = rs2.getString(6);
                }
                return "<tr>"
                        + "<td>"+comp_name+"</td>"
                        + "<td>"
                        + "<table border='1' style='table-layout: fixed; width: 100%;'>"
                        + "<tr><th>Trust</th> <td>"+trust+"</td></tr>"
                        + "<tr><th>Commit</th><td>"+commit+"</td></tr>"
                        + "<tr><th>Integrity</th><td>"+inte+"</td></tr>"
                        + "<tr><th>Report</th><td>"+track+"</td></tr>"
                        + "<tr><th>Experience</th><th>"+exp+"</th></tr>"
                        + "</table>"
                        + "</td>"
                        + "<td>"+expertise+"</td><td>"+experience+"</td><td>"+loc+"</td><td>"+contact+"</td><td>"+email+"</td><td><input type='checkbox' name='hire-checkbox' class='hire-checkbox' id='hire-checkbox'></td></tr>";
            }
        } catch (SQLException ex) {
            return ex.toString();
        }
        return "Empty";
    }
    
    public static String contract_retrieve () {
        try {
            String project_table = "project_table";
            String commit_table = "commit_table";
            String exp_table = "exp_table";
            String trust_table = "trust_table";
            String track_table = "track_table";
            String inte_table = "inte_table";
            
            String name = "";
            String code = "";
            
            int trust_commit = 0; 
            int trust_inte = 0; 
            int trust_track = 0; 
            int trust_exp = 0; 
            int commit_trust = 0;  
            int commit_inte = 0;  
            int commit_track = 0;  
            int commit_exp = 0; 
            int inte_trust = 0; 
            int inte_commit = 0; 
            int inte_track = 0; 
            int inte_exp = 0; 
            int track_trust = 0; 
            int track_commit= 0;  
            int track_inte = 0; 
            int track_exp = 0; 
            int exp_trust = 0; 
            int exp_commit= 0;  
            int exp_inte = 0; 
            int exp_track= 0; 
            
            String data_project_table = "SELECT * FROM " + project_table;
            PreparedStatement ps = connection().prepareStatement(data_project_table);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                name = rs.getString(2);
                code = rs.getString(3);
                
                String data = "";
                PreparedStatement ps1 = null;
                ResultSet rs1 = null;
                
                data = "SELECT * FROM " + trust_table;
                ps1 = connection().prepareStatement(data);
                rs1 = ps1.executeQuery();
                if(rs1.next()){
                    trust_commit = rs1.getInt(2);
                    trust_inte = rs1.getInt(3);
                    trust_track = rs1.getInt(4);
                    trust_exp = rs1.getInt(5);
                }
                
                data = "SELECT * FROM " + commit_table;
                ps1 = connection().prepareStatement(data);
                rs1 = ps1.executeQuery();
                if(rs1.next()){
                    commit_trust = rs1.getInt(2);
                    commit_inte = rs1.getInt(3);
                    commit_track = rs1.getInt(4);
                    commit_exp = rs1.getInt(5);
                }
                
                data = "SELECT * FROM " + inte_table;
                ps1 = connection().prepareStatement(data);
                rs1 = ps1.executeQuery();
                if(rs1.next()){
                    inte_trust = rs1.getInt(2);
                    inte_commit = rs1.getInt(3);
                    inte_track = rs1.getInt(4);
                    inte_exp = rs1.getInt(5);
                }
                
                data = "SELECT * FROM " + track_table;
                ps1 = connection().prepareStatement(data);
                rs1 = ps1.executeQuery();
                if(rs1.next()){
                    track_trust = rs1.getInt(2);
                    track_commit = rs1.getInt(3);
                    track_inte = rs1.getInt(4);
                    track_exp = rs1.getInt(5);
                }
                
                data = "SELECT * FROM " + exp_table;
                ps1 = connection().prepareStatement(data);
                rs1 = ps1.executeQuery();
                if(rs1.next()){
                    exp_trust = rs1.getInt(2);
                    exp_commit = rs1.getInt(3);
                    exp_inte = rs1.getInt(4);
                    exp_track = rs1.getInt(5);
                }
                
                connection().close();
                String combine_data = "<tr><td>"+name+"</td><td>"+code+"</td>"
                        + "<td>"
                        + "<table border='1' style='table-layout: fixed; width: 100%;'>"
                        + "<tr><th>Criteria</th><th>Trust</th><th>Commitment</th><th>Integrity</th><th>Track Report</th><th>Management Experience</th></tr>"
                        + "<tr><th>Trust</th><td>X</td><td>"+trust_commit+"</td><td>"+trust_inte+"</td><td>"+trust_track+"</td><td>"+trust_exp+"</td></tr>"
                        + "<tr><th>Commitment</th><td>"+commit_trust+"</td><td>X</td><td>"+commit_inte+"</td><td>"+commit_track+"</td><td>"+commit_exp+"</td></tr>"
                        + "<tr><th>Integrity</th><td>"+inte_trust+"</td><td>"+inte_commit+"</td><td>X</td><td>"+inte_track+"</td><td>"+inte_exp+"</td></tr>"
                        + "<tr><th>Track Report</th><td>"+track_trust+"</td><td>"+track_commit+"</td><td>"+track_inte+"</td><td>X</td><td>"+track_exp+"</td></tr>"
                        + "<tr><th>Management Experience</th><td>"+exp_trust+"</td><td>"+exp_commit+"</td><td>"+exp_inte+"</td><td>"+exp_track+"</td><td>X</td></tr>"
                        + "</table>"
                        + "</td>"
                        + "<td><input type='button' name='project-button' class='project-button' id='project-button' value='Select'></td></tr>";
                return combine_data;
            }
        } catch (SQLException ex) {
            return ex.toString();
        }
        return "Empty";
    }
    
    public static String add_project (String name, String code, String initiator,
                                        String category, String intro, String background, 
                                        String objective, String start_date, String end_date, 
                                        double lambda_max, double ci, double cr, double constant,
                                        double trust_weight, double commit_weight, double inte_weight,
                                        double track_weight, double exp_weight) 
    {
        try {
            String data_check = "SELECT * FROM project_table WHERE name=? AND code=?";
            PreparedStatement statement = connection().prepareStatement(data_check);
            statement.setString(1, name);
            statement.setString(2, code);
            ResultSet result = statement.executeQuery();
            if(result.next()){
                String data_update_project = "UPDATE project_table SET name=?, code=?, category=?, intro=?, background=?, objective=?, start_date=?, end_date=?, initiator=? WHERE id=?";
                PreparedStatement ps = connection().prepareStatement(data_update_project);
                ps.setString(1, name);
                ps.setString(2, code);
                ps.setString(3, category);
                ps.setString(4, intro);
                ps.setString(5, background);
                ps.setString(6, objective);
                ps.setString(7, start_date);
                ps.setString(8, end_date);
                ps.setString(9, initiator);
                ps.setInt(10, result.getInt(1));
                ps.executeUpdate();
                
                String data_update_criteria = "UPDATE project_criteria SET lambda_max=?, ci=?, cr=?, constant=? WHERE id=?";
                ps = connection().prepareStatement(data_update_criteria);
                ps.setDouble(1, lambda_max);
                ps.setDouble(2, ci);
                ps.setDouble(3, cr);
                ps.setDouble(4, constant);
                ps.setInt(5, result.getInt(1));
                ps.executeUpdate();

                String data_update_weight = "UPDATE project_weight SET trust_weight=?, commit_weight=?, inte_weight=?, track_weight=?, exp_weight=? WHERE id=?";
                ps = connection().prepareStatement(data_update_weight);
                ps.setDouble(1, trust_weight);
                ps.setDouble(2, commit_weight);
                ps.setDouble(3, inte_weight);
                ps.setDouble(4, track_weight);
                ps.setDouble(5, exp_weight);
                ps.setInt(6, result.getInt(1));
                ps.executeUpdate();
                
                connection().close();
                return "true";
            }else if(!result.next()){
                String data_project = "INSERT INTO project_table(name,code,category,intro,background,objective,start_date,end_date,initiator) VALUES (?,?,?,?,?,?,?,?,?)";
                PreparedStatement ps = connection().prepareStatement(data_project);
                ps.setString(1, name);
                ps.setString(2, code);
                ps.setString(3, category);
                ps.setString(4, intro);
                ps.setString(5, background);
                ps.setString(6, objective);
                ps.setString(7, start_date);
                ps.setString(8, end_date);
                ps.setString(9, initiator);
                ps.executeUpdate();

                String getId = "SELECT id FROM project_table WHERE name=? AND code=?";
                ps = connection().prepareStatement(getId);
                ps.setString(1, name);
                ps.setString(2, code);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    String data_trust_table = "INSERT INTO project_criteria(id,lambda_max,ci,cr,constant) VALUES (?,?,?,?,?)";
                    PreparedStatement ps1 = connection().prepareStatement(data_trust_table);
                    ps1.setInt(1, rs.getInt(1));
                    ps1.setDouble(2, lambda_max);
                    ps1.setDouble(3, ci);
                    ps1.setDouble(4, cr);
                    ps1.setDouble(5, constant);
                    ps1.executeUpdate();

                    String data_commit_table = "INSERT INTO project_weight(id,trust_weight,commit_weight,inte_weight,track_weight,exp_weight) VALUES (?,?,?,?,?,?)";
                    ps1 = connection().prepareStatement(data_commit_table);
                    ps1.setInt(1, rs.getInt(1));
                    ps1.setDouble(2, trust_weight);
                    ps1.setDouble(3, commit_weight);
                    ps1.setDouble(4, inte_weight);
                    ps1.setDouble(5, track_weight);
                    ps1.setDouble(6, exp_weight);
                    ps1.executeUpdate();
                    connection().close();
                }
                return "true";
            }
            return "false";
        } catch (SQLException ex) {
            return ex.toString();
        }
    }
    
    public static boolean delete_project (String name, String code){
        try {
            String data = "DELETE FROM project_table WHERE name=? AND code=?";
            PreparedStatement ps = connection().prepareStatement(data);
            ps.setString(1, name);
            ps.setString(2, code);
            ps.executeUpdate();
            
            String project_data = "SELECT * FROM user_contract WHERE project_name=? AND project_code=?";
            PreparedStatement statement_1 = connection().prepareStatement(project_data);
            statement_1.setString(1, name);
            statement_1.setString(2, code);
            ResultSet rs_1 = statement_1.executeQuery();
            while(rs_1.next()){
                String data_1 = "DELETE FROM user_contract WHERE project_name=? AND project_code=?";
                PreparedStatement statement_2 = connection().prepareStatement(data_1);
                statement_2.setString(1, name);
                statement_2.setString(2, code);
                statement_2.executeUpdate();
            }
            
            connection().close();
            return true;
        } catch (SQLException ex) {
            return false;
        }
    }
    
    public static String create_project_contractor (String username, String project_name, String project_code) {
        try {
            String getData = "SELECT * FROM user LEFT JOIN comp_details ON user.id = comp_details.id WHERE user.username=?";
            PreparedStatement ps = connection().prepareStatement(getData);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                String checkData = "SELECT * FROM user_contract WHERE username=? AND project_name=?";
                ps = connection().prepareStatement(checkData);
                ps.setString(1, username);
                ps.setString(2, project_name);
                ResultSet result = ps.executeQuery();
                if(!result.next()){
                    int counter = 0;
                    String checkLimit = "SELECT * FROM user_contract WHERE project_name=? AND project_code=?";
                    ps = connection().prepareStatement(checkLimit);
                    ps.setString(1, username);
                    ps.setString(2, project_name);
                    result = ps.executeQuery();
                    while(result.next()){
                        counter++;
                    }
                    if(counter <= 10){
                        String setData = "INSERT INTO user_contract(id, username, comp_name, project_name, project_code, project_status) VALUES (?,?,?,?,?,?)";
                        ps = connection().prepareStatement(setData);
                        ps.setInt(1, rs.getInt(1));
                        ps.setString(2, username);
                        ps.setString(3, rs.getString(6));
                        ps.setString(4, project_name);
                        ps.setString(5, project_code);
                        ps.setInt(6, 0);
                        ps.executeUpdate();
                    }else if(counter > 10){
                        return "max";
                    }
                    connection().close();
                    return "valid";
                }else if(result.next()){
                    connection().close();
                    return "duplicate";
                }
            }
        } catch (SQLException ex) {
            return ex.toString();
        }
        return "invalid";
    }
    
    public static String delete_cancel_request (String username, String project_name, String project_code) {
        try {
            String data = "DELETE FROM user_contract WHERE username=? AND project_name=? AND project_code=?";
            PreparedStatement ps = connection().prepareStatement(data);
            ps.setString(1, username);
            ps.setString(2, project_name);
            ps.setString(3, project_code);
            ps.executeUpdate();
            connection().close();
            return "true";
        } catch (SQLException ex) {
            return ex.toString();
        }
    }
    
    public static List<String> retrieve_contractor (String project_name, String project_code){
        List<String> holder = new ArrayList<String>();
        try {
            String data = "SELECT user_contract.username, user_contract.comp_name, comp_details.contact, comp_details.email FROM user_contract LEFT JOIN comp_details ON user_contract.id = comp_details.id WHERE user_contract.project_name=? AND user_contract.project_code=?";
            PreparedStatement ps = connection().prepareStatement(data);
            ps.setString(1, project_name);
            ps.setString(2, project_code);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                holder.add(rs.getString(1));
                holder.add(rs.getString(2));
                holder.add(rs.getString(3));
                holder.add(rs.getString(4));
            }
            connection().close();
            return holder;
        } catch (SQLException ex) {
            List<String> checker = new ArrayList<String>();
            checker.add(ex.toString());
            return checker;
        }
    }
    
    public static String update_status (String username, String comp_name, String project_name, String project_code) {
        try {
            String all_data = "SELECT * FROM user_contract";
            PreparedStatement Prime_ps = connection().prepareStatement(all_data);
            ResultSet Prime_rs = Prime_ps.executeQuery();
            while(Prime_rs.next()){
                String update_data  = "UPDATE user_contract SET project_status=? WHERE project_name=? AND project_code=?";
                PreparedStatement statement = connection().prepareStatement(update_data);
                statement.setInt(1, 2);
                statement.setString(2, project_name);
                statement.setString(3, project_code);
                statement.executeUpdate();
            }
            
            String data = "SELECT * FROM user_contract WHERE username=? AND comp_name=?";
            PreparedStatement ps = connection().prepareStatement(data);
            ps.setString(1, username);
            ps.setString(2, comp_name);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                String update_data  = "UPDATE user_contract SET project_status=? WHERE username=? AND comp_name=? AND project_name=? AND project_code=?";
                PreparedStatement statement = connection().prepareStatement(update_data);
                statement.setInt(1, 1);
                statement.setString(2, username);
                statement.setString(3, comp_name);
                statement.setString(4, project_name);
                statement.setString(5, project_code);
                statement.executeUpdate();
            }
            connection().close();
            return "true";
        } catch (SQLException ex) {
            return ex.toString();
        }
    }
    
    public static String update_denied_status (String username, String comp_name, String project_name, String project_code){
        try {
            String data = "SELECT * FROM user_contract WHERE username=? AND comp_name=?";
            PreparedStatement ps = connection().prepareStatement(data);
            ps.setString(1, username);
            ps.setString(2, comp_name);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                String update_data  = "UPDATE user_contract SET project_status=? WHERE username=? AND comp_name=? AND project_name=? AND project_code=?";
                PreparedStatement statement = connection().prepareStatement(update_data);
                statement.setInt(1, 2);
                statement.setString(2, username);
                statement.setString(3, comp_name);
                statement.setString(4, project_name);
                statement.setString(5, project_code);
                statement.executeUpdate();
            }
            connection().close();
            return "true";
        } catch (SQLException ex) {
            return ex.toString();
        }
    }
    
    public static String update_super_admin_personal (String old_username, String new_username, String old_password, String new_password) {
        try {
            String searchClient = "SELECT username FROM user WHERE username=?";
            PreparedStatement ps = connection().prepareStatement(searchClient);
            ps.setString(1, new_username);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                String update_data = "UPDATE super_admin SET username=?, password=? WHERE username=? AND password=?";
                ps = connection().prepareStatement(update_data);
                ps.setString(1, new_username);
                ps.setString(2, new_password);
                ps.setString(3, old_username);
                ps.setString(4, old_password);
                int checker = ps.executeUpdate();
                if(checker <= 0){
                    return "false";
                }else if(checker > 0){
                    connection().close();
                    return "true";
                }
            } else if (rs.next()) {
                connection().close();
                return "taken";
            }
            connection().close();
            return "taken";
        } catch (SQLException ex) {
            return ex.toString();
        }
    }
    
    public static String delete_user (String username){
        try {
            String data = "DELETE FROM user WHERE username=?";
            PreparedStatement ps = connection().prepareStatement(data);
            ps.setString(1, username);
            ps.executeUpdate();
            connection().close();
            return "true";
        } catch (SQLException ex) {
            return ex.toString();
        }
    }
}
