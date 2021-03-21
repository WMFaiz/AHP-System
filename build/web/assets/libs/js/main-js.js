jQuery(document).ready(function($) {
    'use strict';

//    if($('#txtStartDate').length){
//        var dtToday = new Date();
//
//        var month = dtToday.getMonth() + 1;
//        var day = dtToday.getDate();
//        var year = dtToday.getFullYear();
//        if (month < 10)
//            month = '0' + month.toString();
//        if (day < 10)
//            day = '0' + day.toString();
//        var minDate = year + '-' + month + '-' + day;
//        $('#txtStartDate').attr('min', minDate);
//    }
    
//    var toolset_date_range_handler = function (date, datepicker) {
//        jQuery('#txtStartDate').datepicker('option', 'minDate', date);
//    };
//    jQuery('#txtenddate').datepicker('option', 'onClose', toolset_date_range_handler);
    
//    jQuery(".txtstartdate").datepicker("option", "minDate", 0);
//    jQuery(".txtenddate").datepicker("option", "minDate", 0);
    
//    $("#txtstartdate").datepicker({
//        minDate: 0,
//        onSelect: function (date) {
//            $("#txtenddate").datepicker('option', 'minDate', date);
//        }
//    });
//    $("#txtenddate").datepicker({});

    $("#dt1").datepicker({
        dateFormat: "dd-M-yy",
        minDate: 0,
        onSelect: function () {
            var dt2 = $('#dt2');
            var startDate = $(this).datepicker('getDate');
            //add 30 days to selected date
            startDate.setDate(startDate.getDate() + 30);
            var minDate = $(this).datepicker('getDate');
            var dt2Date = dt2.datepicker('getDate');
            //difference in days. 86400 seconds in day, 1000 ms in second
            var dateDiff = (dt2Date - minDate) / (86400 * 1000);

            //dt2 not set or dt1 date is greater than dt2 date
            if (dt2Date == null || dateDiff < 0) {
                dt2.datepicker('setDate', minDate);
            }
            //dt1 date is 30 days under dt2 date
            else if (dateDiff > 30) {
                dt2.datepicker('setDate', startDate);
            }
            //sets dt2 maxDate to the last day of 30 days window
            dt2.datepicker('option', 'maxDate', startDate);
            //first day which can be selected in dt2 is selected date in dt1
            dt2.datepicker('option', 'minDate', minDate);
        }
    });
    $('#dt2').datepicker({
        dateFormat: "dd-M-yy",
        minDate: 0
    });

    $('#password-signup, #confirmation-signup').on('keyup', function () {
        if ($('#password-signup').val() === $('#confirmation-signup').val()) {
            $('#message').html('Matching').css('color', 'green');
        } else
            $('#message').html('Not Matching').css('color', 'red');
    });
    
    $('#super_username_new, #super_username').on('keyup', function () {
        if ($('#super_username_new').val() === $('#super_username').val()) {
            $('#message_username').html('Matching').css('color', 'green');
        } else
            $('#message_username').html('Not Matching').css('color', 'red');
    });
    
    $('#super_password_new, #super_password').on('keyup', function () {
        if ($('#super_password_new').val() === $('#super_password').val()) {
            $('#message_password').html('Matching').css('color', 'green');
        } else
            $('#message_password').html('Not Matching').css('color', 'red');
    });
    
    $('.pageheader-content-create').hide();
//    $('.pageheader-content-review').hide();
    $('.signup_container').hide();
    $('.contract_list').hide();
    $('.question_list').hide();
    $('.floater_tag').hide();
    $('.pairwise_table').hide();
    $('.chart_table').hide();
    $('.conclusion_table').hide();
    $('.pageheader-content-review').hide();
    $('.pageheader-content-newadmin').hide();
    $('.pageheader-content-superadmin').hide();
    $('.pageheader-content-project').hide();
    $('.pageheader-content-update').hide();
    
    if($('#proceed_pop_page').length){
        $('#proceed_pop_page').attr('disabled','disabled');
        $("#proceed_pop_page").css("background-color", "#999999");
    }
    
    if($(".pageheader-content-newadmin").length){
        $(".pageheader-content-newadmin").show();
    }
    
    $('#details_button').click(function (){
        $('.details_table').slideUp();
        $('.pairwise_table').slideDown();
    });
    
    $('#pairwise_button').click(function (){
        $('.pairwise_table').slideUp();
        $('.chart_table').slideDown();
    });
    
    $('#pairwise_button_back').click(function (){
        $('.details_table').slideDown();
        $('.pairwise_table').slideUp();
    });
    
    $('#chart_button').click(function (){
        $('.chart_table').slideUp();
        $('.conclusion_table').slideDown();
    });
    
    $('#chart_button_back').click(function (){
        $('.pairwise_table').slideDown();
        $('.chart_table').slideUp();
    });
    
    $('#conclusion_button_back').click(function (){
        $('.conclusion_table').slideUp();
        $('.chart_table').slideDown();
    });
    
    if($('#nav-link-exam').length){
        if($('#nav-link-exam').val() === "Performance Measurement*"){
            $('.question_list').show();
        }else if($('#nav-link-exam').val() === "Performance Measurement"){
             $('.question_list').hide();
        }
    }
    
    if($('#nav-link-contract').length){
        $('.contract_list').show();
    }
    
//    $('#nav-link-contract').click(function () {
//        if($('.contract_list').is(":visible")){
//            $('.contract_list').slideUp(300);
//        }else{
//            $('.contract_list').slideDown(300);
//        }
//    });
    
    $('#signup-menu').click(function () {
        if($('.signup_container').is(":visible")){
            $('.signup_container').slideUp(500);
            $('.contract_view').slideDown(500);
        }else{
            $('.signup_container').slideDown(500);
            $('.contract_view').slideUp(500);
        }
    });
    
    $('#nav-link-contract').click(function () {
        $('.pageheader-content-create').slideUp();
        $('.pageheader-content-review').slideUp();
        $('.pageheader-content-newadmin').slideUp(); 
        $('.pageheader-content-superadmin').slideUp(); 
        $('.contract_list').slideDown();
        $('.question_list').slideUp();
    });
    
     $('#nav-link-exam').click(function () {
        $('.pageheader-content-create').slideUp();
        $('.pageheader-content-review').slideUp();
        $('.pageheader-content-newadmin').slideUp(); 
        $('.pageheader-content-superadmin').slideUp(); 
        $('.contract_list').slideUp();
        $('.question_list').slideDown();
    });
    
    $('#nav-link-Review').click(function () {
       $('.pageheader-content-review').slideDown();
       $('.pageheader-content-create').slideUp();
       $('.pageheader-content-newadmin').slideUp(); 
       $('.pageheader-content-superadmin').slideUp();
       $('.contract_list').slideUp();
       $('.question_list').slideUp();
    });
    
    $('#nav-link-Create').click(function () {
        $('.pageheader-content-create').slideDown();
        $('.create-button').val("Create");
        $('.project_name').val("");
        $('.project_code').val("");
        $('#category').val('Agriculture').change();
        $('.project_intro').val("");
        $('.project_bg').val("");
        $('.project_objective').val("");
        $('.project_start').val("");
        $('.project_end').val("");
        $('.project_name').css("background-color", "white");
        $('.project_code').css("background-color", "white");
        $('.project_name').prop('readonly', false);
        $('.project_code').prop('readonly', false);
        
        $('.pageheader-content-review').slideUp();
        $('.pageheader-content-newadmin').slideUp();
        $('.pageheader-content-superadmin').slideUp();
        $('.contract_list').slideUp();
        $('.question_list').slideUp();
    });
    
    jQuery('.project-button-update').click(function () {
        $('.project_name').val("");
        $('.project_code').val("");
        $('#category').val('Agriculture').change();
        $('.project_intro').val("");
        $('.project_bg').val("");
        $('.project_objective').val("");
        $('.project_start').val("");
        $('.project_end').val("");
        var name = $(this).parent().parent().find(".name").val();
        var code = $(this).parent().parent().find(".code").val();
        var category = $(this).parent().parent().find(".category_data").val();
        var intro = $(this).parent().parent().find(".intro_data").val();
        var background = $(this).parent().parent().find(".background_data").val();
        var objective = $(this).parent().parent().find(".objective_data").val();
        var start_date = $(this).parent().parent().find(".start_date_data").val();
        var end_date = $(this).parent().parent().find(".end_date_data").val();
        console.log(name + "  " + code);
        $('.pageheader-content-create').slideDown();
        $('.project_name').val(name);
        $('.project_code').val(code);
        $('#category').val(category).change();
        $('.project_intro').val(intro);
        $('.project_bg').val(background);
        $('.project_objective').val(objective);
        $('.project_start').val(start_date);
        $('.project_end').val(end_date);
        $('.project_name').css("background-color", "#d9d9d9");
        $('.project_code').css("background-color", "#d9d9d9");
        $('.project_name').prop('readonly', true);
        $('.project_code').prop('readonly', true);
        $('.create-button').val("Update");

        $('.pageheader-content-review').slideUp();
        $('.pageheader-content-newadmin').slideUp();
        $('.pageheader-content-superadmin').slideUp();
        $('.contract_list').slideUp();
        $('.question_list').slideUp();
    }); 
    
    $('#nav-link-approveadmin').click(function () {
       $('.pageheader-content-superadmin').slideUp();
       $('.pageheader-content-newadmin').slideDown(); 
       $('.pageheader-content-project').slideUp();
    });
    
    $('#nav-link-personaladmin').click(function () {
        $('.pageheader-content-superadmin').slideDown();
        $('.pageheader-content-newadmin').slideUp(); 
        $('.pageheader-content-project').slideUp();
    });
    
    $('#nav-link-project').click(function(){
       $('.pageheader-content-superadmin').slideUp();
       $('.pageheader-content-newadmin').slideUp(); 
       $('.pageheader-content-project').slideDown();
    });
    
    $('.floater_img_tag').mouseenter (function () {
        $('.floater_tag').slideDown(300);
    });
    
    $('.floater_img_tag').mouseleave (function () {
        $('.floater_tag').slideUp(300);
    });
    
    $('.project-button-view').click(function (){
        var name = $(this).parent().parent().parent().find('.name').val();
        var code = $(this).parent().parent().parent().find('.code').val();
        var weight_trust = $(this).parent().parent().parent().find('.project_data_td form').find('#trust_weight_data').val();
        var weight_commit = $(this).parent().parent().parent().find('.project_data_td form').find('#commit_weight_data').val();
        var weight_inte = $(this).parent().parent().parent().find('.project_data_td form').find('#inte_weight_data').val();
        var weight_track = $(this).parent().parent().parent().find('.project_data_td form').find('#track_weight_data').val();
        var weight_exp = $(this).parent().parent().parent().find('.project_data_td form').find('#exp_weight_data').val();
//        alert('name: ' + name + '  code: ' + code + '  weight_trust: ' + weight_trust + '  weight_commit: ' + weight_commit +
//                '  weight_commit: ' + weight_commit + '  weight_inte: ' + weight_inte + '  weight_track: ' + weight_track 
//                + '  weight_exp: ' + weight_exp);
        localStorage.setItem("project_name", name);
        localStorage.setItem("project_code", code);
        localStorage.setItem("trust", parseFloat(weight_trust));
        localStorage.setItem("commit", parseFloat(weight_commit));
        localStorage.setItem("inte", parseFloat(weight_inte));
        localStorage.setItem("track", parseFloat(weight_track));
        localStorage.setItem("exp", parseFloat(weight_exp));
//        window.open('pop-page.jsp', null, 'height=' + screen.height / 2 + ',width=' + screen.width / 2 + ',status=no,toolbar=no,menubar=no,location=no'); 
    });
    
    //trust
    $('.trust_commit').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.commit_trust').val(divide.toFixed(2));
    });
    $('.commit_trust').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.trust_commit').val(divide.toFixed(2));
    });
    
    $('.trust_inte').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.inte_trust').val(divide.toFixed(2));
    });
    $('.inte_trust').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.trust_inte').val(divide.toFixed(2));
    });

    $('.trust_track').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.track_trust').val(divide.toFixed(2));
    });
    $('.track_trust').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.trust_track').val(divide.toFixed(2));
    });
    
    $('.trust_exp').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.exp_trust').val(divide.toFixed(2));
    });
    $('.exp_trust').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.trust_exp').val(divide.toFixed(2));
    });

    //commit
    $('.commit_inte').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.inte_commit').val(divide.toFixed(2));
    });
    $('.inte_commit').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.commit_inte').val(divide.toFixed(2));
    });

    $('.commit_track').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.track_commit').val(divide.toFixed(2));
    });
    $('.track_commit').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.commit_track').val(divide.toFixed(2));
    });
    
    $('.commit_exp').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.exp_commit').val(divide.toFixed(2));
    });
    $('.exp_commit').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.commit_exp').val(divide.toFixed(2));
    });

    //inte
    $('.inte_track').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.track_inte').val(divide.toFixed(2));
    });
    $('.track_inte').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.inte_track').val(divide.toFixed(2));
    });

    $('.inte_exp').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.exp_inte').val(divide.toFixed(2));
    });
    $('.exp_inte').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.inte_exp').val(divide.toFixed(2));
    });

    //track
    $('.track_exp').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.exp_track').val(divide.toFixed(2));
    });
    $('.exp_track').focusout(function () {
        var solid = parseFloat($(this).val());
        var divide = 1 / parseFloat($(this).val());
        $(this).val(solid.toFixed(2));
        $('.track_exp').val(divide.toFixed(2));
    });

    //extend 6
    if ($('.extend6_1').length) {
        $('.extend6_1').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend1_6').val(divide.toFixed(2));
        });
        $('.extend1_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_1').val(divide.toFixed(2));
        });
        
        $('.extend6_2').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend2_6').val(divide.toFixed(2));
        });
        $('.extend2_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_2').val(divide.toFixed(2));
        });
        
        $('.extend6_3').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend3_6').val(divide.toFixed(2));
        });
        $('.extend3_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_3').val(divide.toFixed(2));
        });
        
        $('.extend6_4').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend4_6').val(divide.toFixed(2));
        });
        $('.extend4_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_4').val(divide.toFixed(2));
        });
        
        $('.extend6_4').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend4_6').val(divide.toFixed(2));
        });
        $('.extend4_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_4').val(divide.toFixed(2));
        });
        
        $('.extend6_5').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend5_6').val(divide.toFixed(2));
        });
        $('.extend5_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_5').val(divide.toFixed(2));
        });
    }

    //extend 7 
    if ($('.extend7_1').length) {
        $('.extend7_1').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend1_7').val(divide.toFixed(2));
        });
        $('.extend1_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_1').val(divide.toFixed(2));
        });
        
        $('.extend7_2').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend2_7').val(divide.toFixed(2));
        });
        $('.extend2_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_2').val(divide.toFixed(2));
        });
        
        $('.extend7_3').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend3_7').val(divide.toFixed(2));
        });
        $('.extend3_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_3').val(divide.toFixed(2));
        });
        
        $('.extend7_4').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend4_7').val(divide.toFixed(2));
        });
        $('.extend4_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_4').val(divide.toFixed(2));
        });
        
        $('.extend7_5').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend5_7').val(divide.toFixed(2));
        });
        $('.extend5_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_5').val(divide.toFixed(2));
        });
        
        $('.extend7_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_7').val(divide.toFixed(2));
        });
        $('.extend6_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_6').val(divide.toFixed(2));
        });
    }

    //extend 8
    if ($('.extend8_1').length) {
        $('.extend8_1').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend1_8').val(divide.toFixed(2));
        });
        $('.extend1_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_1').val(divide.toFixed(2));
        });
        
        $('.extend8_2').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend2_8').val(divide.toFixed(2));
        });
        $('.extend2_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_2').val(divide.toFixed(2));
        });
        
        $('.extend8_3').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend3_8').val(divide.toFixed(2));
        });
        $('.extend3_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_3').val(divide.toFixed(2));
        });
        
        $('.extend8_4').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend4_8').val(divide.toFixed(2));
        });
        $('.extend4_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_4').val(divide.toFixed(2));
        });
        
        $('.extend8_5').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend5_8').val(divide.toFixed(2));
        });
        $('.extend5_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_5').val(divide.toFixed(2));
        });
        
        $('.extend8_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_8').val(divide.toFixed(2));
        });
        $('.extend6_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_6').val(divide.toFixed(2));
        });
        
        $('.extend8_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_8').val(divide.toFixed(2));
        });
        $('.extend7_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_7').val(divide.toFixed(2));
        });
    }

    //extend 9
    if ($('.extend9_1').length) {
        $('.extend9_1').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend1_9').val(divide.toFixed(2));
        });
        $('.extend1_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_1').val(divide.toFixed(2));
        });
        
        $('.extend9_2').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend2_9').val(divide.toFixed(2));
        });
        $('.extend2_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_2').val(divide.toFixed(2));
        });
        
        $('.extend9_3').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend3_9').val(divide.toFixed(2));
        });
        $('.extend3_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_3').val(divide.toFixed(2));
        });
        
        $('.extend9_4').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend4_9').val(divide.toFixed(2));
        });
        $('.extend4_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_4').val(divide.toFixed(2));
        });
        
        $('.extend9_5').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend5_9').val(divide.toFixed(2));
        });
        $('.extend5_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_5').val(divide.toFixed(2));
        });
        
        $('.extend9_6').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend6_9').val(divide.toFixed(2));
        });
        $('.extend6_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_6').val(divide.toFixed(2));
        });
        
        $('.extend9_7').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend7_9').val(divide.toFixed(2));
        });
        $('.extend7_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_7').val(divide.toFixed(2));
        });
        
        $('.extend9_8').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend8_9').val(divide.toFixed(2));
        });
        $('.extend8_9').focusout(function () {
            var solid = parseFloat($(this).val());
            var divide = 1 / parseFloat($(this).val());
            $(this).val(solid.toFixed(2));
            $('.extend9_8').val(divide.toFixed(2));
        });
    }
    
    if ($('input[id=pw_box]').length) {
        $('input[id=pw_box]').focusout(function () {
            var input = $('input[id=pw_box]');
            for (var i = 0; i < input.length; i++) {
                if ($(input[i]).val() > 1.00 && $(input[i]).val() < 1.50)
                    $(input[i]).val(1.00);
                if ($(input[i]).val() >= 1.50 && $(input[i]).val() < 2.50)
                    $(input[i]).val(2.00);
                if ($(input[i]).val() >= 2.50 && $(input[i]).val() < 3.50)
                    $(input[i]).val(3.00);
                if ($(input[i]).val() >= 3.50 && $(input[i]).val() < 4.50)
                    $(input[i]).val(4.00);
                if ($(input[i]).val() >= 4.50 && $(input[i]).val() < 5.50)
                    $(input[i]).val(5.00);
                if ($(input[i]).val() >= 5.50 && $(input[i]).val() < 6.50)
                    $(input[i]).val(6.00);
                if ($(input[i]).val() >= 6.50 && $(input[i]).val() < 7.50)
                    $(input[i]).val(7.00);
                if ($(input[i]).val() >= 7.50 && $(input[i]).val() < 8.50)
                    $(input[i]).val(8.00);
                if ($(input[i]).val() >= 8.50 && $(input[i]).val() < 9.50)
                    $(input[i]).val(9.00);
                if ($(input[i]).val() >= 9.50)
                    $(input[i]).val(9.00);
                if ($(input[i]).val() > 0.00 && $(input[i]).val() < 0.11)
                    $(input[i]).val(0.11);
                if ($(input[i]).val() >= 0.11 && $(input[i]).val() < 0.13)
                    $(input[i]).val(0.11);
                if ($(input[i]).val() >= 0.13 && $(input[i]).val() < 0.14)
                    $(input[i]).val(0.13);
                if ($(input[i]).val() >= 0.14 && $(input[i]).val() < 0.17)
                    $(input[i]).val(0.14);
                if ($(input[i]).val() >= 0.17 && $(input[i]).val() < 0.20)
                    $(input[i]).val(0.17);
                if ($(input[i]).val() >= 0.20 && $(input[i]).val() < 0.25)
                    $(input[i]).val(0.20);
                if ($(input[i]).val() >= 0.25 && $(input[i]).val() < 0.33)
                    $(input[i]).val(0.25);
                if ($(input[i]).val() >= 0.33 && $(input[i]).val() < 0.50)
                    $(input[i]).val(0.33);
                if ($(input[i]).val() >= 0.50 && $(input[i]).val() < 1.00)
                    $(input[i]).val(0.50);
            }
        });
    }
    
    $('#proceed_pop_page').click(function () {
        if($('.chart_pop_1').length){
            localStorage.setItem("trust_data_1", parseFloat($('.trust_data').val()));
            localStorage.setItem("commit_data_1", parseFloat($('.commit_data').val()));
            localStorage.setItem("inte_data_1", parseFloat($('.inte_data').val()));
            localStorage.setItem("track_data_1", parseFloat($('.track_data').val()));
            localStorage.setItem("exp_data_1", parseFloat($('.exp_data').val()));
            localStorage.setItem("extend6_data_1", parseFloat($('.extend6_data').val()));
            localStorage.setItem("extend7_data_1", parseFloat($('.extend7_data').val()));
            localStorage.setItem("extend8_data_1", parseFloat($('.extend8_data').val()));
            localStorage.setItem("extend9_data_1", parseFloat($('.extend9_data').val()));
            localStorage.setItem("extend0_data_1", parseFloat($('.extend0_data').val()));  
            window.location.href = 'pop-page_commit.jsp';
        }else if($('.chart_pop_2').length){
            localStorage.setItem("trust_data_2", parseFloat($('.trust_data').val()));
            localStorage.setItem("commit_data_2", parseFloat($('.commit_data').val()));
            localStorage.setItem("inte_data_2", parseFloat($('.inte_data').val()));
            localStorage.setItem("track_data_2", parseFloat($('.track_data').val()));
            localStorage.setItem("exp_data_2", parseFloat($('.exp_data').val()));
            localStorage.setItem("extend6_data_2", parseFloat($('.extend6_data').val()));
            localStorage.setItem("extend7_data_2", parseFloat($('.extend7_data').val()));
            localStorage.setItem("extend8_data_2", parseFloat($('.extend8_data').val()));
            localStorage.setItem("extend9_data_2", parseFloat($('.extend9_data').val()));
            localStorage.setItem("extend0_data_2", parseFloat($('.extend0_data').val()));  
            window.location.href = 'pop-page_inte.jsp';
        }else if($('.chart_pop_3').length){
            localStorage.setItem("trust_data_3", parseFloat($('.trust_data').val()));
            localStorage.setItem("commit_data_3", parseFloat($('.commit_data').val()));
            localStorage.setItem("inte_data_3", parseFloat($('.inte_data').val()));
            localStorage.setItem("track_data_3", parseFloat($('.track_data').val()));
            localStorage.setItem("exp_data_3", parseFloat($('.exp_data').val()));
            localStorage.setItem("extend6_data_3", parseFloat($('.extend6_data').val()));
            localStorage.setItem("extend7_data_3", parseFloat($('.extend7_data').val()));
            localStorage.setItem("extend8_data_3", parseFloat($('.extend8_data').val()));
            localStorage.setItem("extend9_data_3", parseFloat($('.extend9_data').val()));
            localStorage.setItem("extend0_data_3", parseFloat($('.extend0_data').val()));  
            window.location.href = 'pop-page_track.jsp';
        }else if($('.chart_pop_4').length){
            localStorage.setItem("trust_data_4", parseFloat($('.trust_data').val()));
            localStorage.setItem("commit_data_4", parseFloat($('.commit_data').val()));
            localStorage.setItem("inte_data_4", parseFloat($('.inte_data').val()));
            localStorage.setItem("track_data_4", parseFloat($('.track_data').val()));
            localStorage.setItem("exp_data_4", parseFloat($('.exp_data').val()));
            localStorage.setItem("extend6_data_4", parseFloat($('.extend6_data').val()));
            localStorage.setItem("extend7_data_4", parseFloat($('.extend7_data').val()));
            localStorage.setItem("extend8_data_4", parseFloat($('.extend8_data').val()));
            localStorage.setItem("extend9_data_4", parseFloat($('.extend9_data').val()));
            localStorage.setItem("extend0_data_4", parseFloat($('.extend0_data').val()));  
            window.location.href = 'pop-page_exp.jsp';
        }else if($('.chart_pop_5').length){
            localStorage.setItem("trust_data_5", parseFloat($('.trust_data').val()));
            localStorage.setItem("commit_data_5", parseFloat($('.commit_data').val()));
            localStorage.setItem("inte_data_5", parseFloat($('.inte_data').val()));
            localStorage.setItem("track_data_5", parseFloat($('.track_data').val()));
            localStorage.setItem("exp_data_5", parseFloat($('.exp_data').val()));
            localStorage.setItem("extend6_data_5", parseFloat($('.extend6_data').val()));
            localStorage.setItem("extend7_data_5", parseFloat($('.extend7_data').val()));
            localStorage.setItem("extend8_data_5", parseFloat($('.extend8_data').val()));
            localStorage.setItem("extend9_data_5", parseFloat($('.extend9_data').val()));
            localStorage.setItem("extend0_data_5", parseFloat($('.extend0_data').val()));  
            window.location.href = 'pop-page.jsp';
        }
    });
    
    if($('.trust_criteria').length){
        var trust_criteria = $('.trust_criteria');
        var trust = [], commit = [], inte = [], track = [], exp = [];
        for (var i = 0; i < trust_criteria.length; i++) {
            trust[i] = (((parseFloat($(trust_criteria[i]).val())) / 8) * 100) / 5;
        }
        if ($('.trust_ref').length) {
            var trust_ref = $('.trust_ref');
            for (var i = 0; i < trust_ref.length; i++) {
                $(trust_ref[i]).val(trust[i].toFixed(2));
            }
        }
    }
    
    if($('.commit_criteria').length){
        var commit_criteria = $('.commit_criteria');
        var commit = [];
        for (var i = 0; i < trust_criteria.length; i++) {
            commit[i] = (((parseFloat($(commit_criteria[i]).val())) / 26) * 100) / 5;
        }
        if ($('.commit_ref').length) {
            var commit_ref = $('.commit_ref');
            for (var i = 0; i < commit_ref.length; i++) {
                $(commit_ref[i]).val(commit[i].toFixed(2));
            }
        }
    }
    
    if($('.inte_criteria').length){
        var inte_criteria = $('.inte_criteria');
        var inte = [];
        for (var i = 0; i < inte_criteria.length; i++) {
            inte[i] = (((parseFloat($(inte_criteria[i]).val())) / 7) * 100) / 5;
        }
        if ($('.inte_ref').length) {
            var inte_ref = $('.inte_ref');
            for (var i = 0; i < inte_ref.length; i++) {
                $(inte_ref[i]).val(inte[i].toFixed(2));
            }
        }
    }
    
    if($('.track_criteria').length){
        var track_criteria = $('.track_criteria');
        var track = [];
        for (var i = 0; i < track_criteria.length; i++) {
            track[i] = (((parseFloat($(track_criteria[i]).val())) / 12) * 100) / 5;
        }
        if ($('.track_ref').length) {
            var track_ref = $('.track_ref');
            for (var i = 0; i < track_ref.length; i++) {
                $(track_ref[i]).val(track[i].toFixed(2));
            }
        }
    }
    
    if($('.exp_criteria').length){
        var exp_criteria = $('.exp_criteria');
        var exp = [];
        for (var i = 0; i < trust_criteria.length; i++) {
            exp[i] = ((parseFloat($(exp_criteria[i]).val()) / 10) * 100) / 5;
        }
        if ($('.exp_ref').length) {
            var exp_ref = $('.exp_ref');
            for (var i = 0; i < exp_ref.length; i++) {
                $(exp_ref[i]).val(exp[i].toFixed(2));
            }
        }
    }
    
    $('input[id=pw_box]').focusout(function(){
        if($(this).val() !== ""){            
            var counter = parseInt($('.counter').val());
            if(counter === 0 || counter === null){
                counter = 5;
            }
//            console.log(counter);
            var weight = {
                trust: 0,
                commit: 0,
                inte: 0,
                track: 0,
                exp: 0,
                extend6: 0,
                extend7: 0,
                extend8: 0,
                extend9: 0,
                extend0: 0
            };
            //=====================================================//
            //Pairwise Comparisons
            //=====================================================//
            //
            //trust
            var trust_trust = 0,commit_trust=0,inte_trust=0,track_trust=0,exp_trust=0,extend1_6=0,extend1_7=0,extend1_8=0,extend1_9=0,extend1_0=0;
            if ($('.trust_trust').length)
                trust_trust = parseFloat($('.trust_trust').val());
            if ($('.commit_trust').length)
                commit_trust = parseFloat($('.commit_trust').val());
            if ($('.inte_trust').length)
                inte_trust = parseFloat($('.inte_trust').val());
            if ($('.track_trust').length)
                track_trust = parseFloat($('.track_trust').val());
            if ($('.exp_trust').length)
                exp_trust = parseFloat($('.exp_trust').val());
            if ($('.extend1_6').length)
                extend1_6 = parseFloat($('.extend1_6').val());
            if ($('.extend1_7').length)
                extend1_7 = parseFloat($('.extend1_7').val());
            if ($('.extend1_8').length)
                extend1_8 = parseFloat($('.extend1_8').val());
            if ($('.extend1_9').length)
                extend1_9 = parseFloat($('.extend1_9').val());
            if ($('.extend1_0').length)
                extend1_0 = parseFloat($('.extend1_0').val());
            
            if(isNaN(trust_trust)){trust_trust = 0;}
            if(isNaN(commit_trust)){commit_trust = 0;}
            if(isNaN(inte_trust)){inte_trust = 0;}
            if(isNaN(track_trust)){track_trust = 0;}
            if(isNaN(exp_trust)){exp_trust = 0;}
            if(isNaN(extend1_6)){extend1_6 = 0;}
            if(isNaN(extend1_7)){extend1_7 = 0;}
            if(isNaN(extend1_8)){extend1_8 = 0;}
            if(isNaN(extend1_9)){extend1_9 = 0;}
            if(isNaN(extend1_0)){extend1_0 = 0;}

            var sum1 = trust_trust + commit_trust + inte_trust + track_trust + exp_trust + extend1_6 + extend1_7 + extend1_8 + extend1_9 + extend1_0;
            if($('.trust_sum').length)
                $('.trust_sum').val(sum1.toFixed(2));
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_trust: ' + trust_trust);
//            console.log('commit_trust: ' + commit_trust);
//            console.log('inte_trust: ' + inte_trust);
//            console.log('track_trust: ' + track_trust);
//            console.log('exp_trust: ' + exp_trust);
//            console.log('sum1: ' + sum1);
            
            //commit
            var trust_commit = 0,commit_commit=0,inte_commit=0,track_commit=0,exp_commit=0,extend2_6=0,extend2_7=0,extend2_8=0,extend2_9=0,extend2_0=0;
            if ($('.trust_commit').length)
                trust_commit = parseFloat($('.trust_commit').val());
            if ($('.commit_commit').length)
                commit_commit = parseFloat($('.commit_commit').val());
            if ($('.inte_commit').length)
                inte_commit = parseFloat($('.inte_commit').val());
            if ($('.track_commit').length)
                track_commit = parseFloat($('.track_commit').val());
            if ($('.exp_commit').length)
                exp_commit = parseFloat($('.exp_commit').val());
            if($('.extend2_6').length)
                extend2_6 = parseFloat($('.extend2_6').val());
            if($('.extend2_7').length)
                extend2_7 = parseFloat($('.extend2_7').val());
            if($('.extend2_8').length)
                extend2_8 = parseFloat($('.extend2_8').val());
            if($('.extend2_9').length)
                extend2_9 = parseFloat($('.extend2_9').val());
            if($('.extend2_0').length)
                extend2_0 = parseFloat($('.extend2_0').val());
            
            if(isNaN(trust_commit)){trust_commit = 0;}
            if(isNaN(commit_commit)){commit_commit = 0;}
            if(isNaN(inte_commit)){inte_commit = 0;}
            if(isNaN(track_commit)){track_commit = 0;}
            if(isNaN(exp_commit)){exp_commit = 0;}
            if(isNaN(extend2_6)){extend2_6 = 0;}
            if(isNaN(extend2_7)){extend2_7 = 0;}
            if(isNaN(extend2_8)){extend2_8 = 0;}
            if(isNaN(extend2_9)){extend2_9 = 0;}
            if(isNaN(extend2_0)){extend2_0 = 0;}
            
            var sum2 = trust_commit + commit_commit + inte_commit + track_commit + exp_commit + extend2_6 + extend2_7 + extend2_8 + extend2_9 + extend2_0;
            if($('.commit_sum').length)
                $('.commit_sum').val(sum2.toFixed(2));
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_commit: ' + trust_commit);
//            console.log('commit_commit: ' + commit_commit);
//            console.log('inte_commit: ' + inte_commit);
//            console.log('track_commit: ' + track_commit);
//            console.log('exp_commit: ' + exp_commit);
//            console.log('sum2: ' + sum2);

            //inte
            var trust_inte = 0,commit_inte=0,inte_inte=0,track_inte=0,exp_inte=0,extend3_6=0,extend3_7=0,extend3_8=0,extend3_9=0,extend3_0=0;
            if ($('.trust_inte').length)
                trust_inte = parseFloat($('.trust_inte').val());
            if ($('.commit_inte').length)
                commit_inte = parseFloat($('.commit_inte').val());
            if ($('.inte_inte').length)
                inte_inte = parseFloat($('.inte_inte').val());
            if ($('.track_inte').length)
                track_inte = parseFloat($('.track_inte').val());
            if ($('.exp_inte').length)
                exp_inte = parseFloat($('.exp_inte').val());
            if($('.extend3_6').length)
                extend3_6 = parseFloat($('.extend3_6').val());
            if($('.extend3_7').length)
                extend3_7 = parseFloat($('.extend3_7').val());
            if($('.extend3_8').length)
                extend3_8 = parseFloat($('.extend3_8').val());
            if($('.extend3_9').length)
                extend3_9 = parseFloat($('.extend3_9').val());
            if($('.extend3_0').length)
                extend3_0 = parseFloat($('.extend3_0').val());
            
            if(isNaN(trust_inte)){trust_commit = 0;}
            if(isNaN(commit_inte)){commit_commit = 0;}
            if(isNaN(inte_inte)){inte_commit = 0;}
            if(isNaN(track_inte)){track_commit = 0;}
            if(isNaN(exp_inte)){exp_commit = 0;}
            if(isNaN(extend3_6)){extend3_6 = 0;}
            if(isNaN(extend3_7)){extend3_7 = 0;}
            if(isNaN(extend3_8)){extend3_8 = 0;}
            if(isNaN(extend3_9)){extend3_9 = 0;}
            if(isNaN(extend3_0)){extend3_0 = 0;}
            
            var sum3 = trust_inte + commit_inte + inte_inte + track_inte + exp_inte + extend3_6 + extend3_7 + extend3_8 + extend3_9 + extend3_0;
            if($('.inte_sum').length)
                $('.inte_sum').val(sum3.toFixed(2));
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_inte: ' + trust_inte);
//            console.log('commit_inte: ' + commit_inte);
//            console.log('inte_inte: ' + inte_inte);
//            console.log('track_inte: ' + track_inte);
//            console.log('exp_inte: ' + exp_inte);
//            console.log('sum3: ' + sum3);
            
            //track
            var trust_track = 0,commit_track=0,inte_track=0,track_track=0,exp_track=0,extend4_6=0,extend4_7=0,extend4_8=0,extend4_9=0,extend4_0=0;
            if ($('.trust_track').length)
                trust_track = parseFloat($('.trust_track').val());
            if ($('.commit_track').length)
                commit_track = parseFloat($('.commit_track').val());
            if ($('.inte_track').length)
                inte_track = parseFloat($('.inte_track').val());
            if ($('.track_track').length)
                track_track = parseFloat($('.track_track').val());
            if ($('.exp_track').length)
                exp_track = parseFloat($('.exp_track').val());
            if($('.extend4_6').length)
                extend4_6 = parseFloat($('.extend4_6').val());
            if($('.extend4_7').length)
                extend4_7 = parseFloat($('.extend4_7').val());
            if($('.extend4_8').length)
                extend4_8 = parseFloat($('.extend4_8').val());
            if($('.extend4_9').length)
                extend4_9 = parseFloat($('.extend4_9').val());
            if($('.extend4_0').length)
                extend4_0 = parseFloat($('.extend4_0').val());
            
            if(isNaN(trust_track)){trust_commit = 0;}
            if(isNaN(commit_track)){commit_commit = 0;}
            if(isNaN(inte_track)){inte_commit = 0;}
            if(isNaN(track_track)){track_commit = 0;}
            if(isNaN(exp_track)){exp_commit = 0;}
            if(isNaN(extend4_6)){extend4_6 = 0;}
            if(isNaN(extend4_7)){extend4_7 = 0;}
            if(isNaN(extend4_8)){extend4_8 = 0;}
            if(isNaN(extend4_9)){extend4_9 = 0;}
            if(isNaN(extend4_0)){extend4_0 = 0;}
            
            var sum4 = trust_track + commit_track + inte_track + track_track + exp_track + extend4_6 + extend4_7 + extend4_8 + extend4_9 + extend4_0;
            if($('.track_sum').length)
                $('.track_sum').val(sum4.toFixed(2));

//            console.log('---------------------------------------------------------------');
//            console.log('trust_track: ' + trust_track);
//            console.log('commit_track: ' + commit_track);
//            console.log('inte_track: ' + inte_track);
//            console.log('track_track: ' + track_track);
//            console.log('exp_track: ' + exp_track);
//            console.log('sum4: ' + sum4);

            //exp
            var trust_exp = 0,commit_exp=0,inte_exp=0,track_exp=0,exp_exp=0,extend5_6=0,extend5_7=0,extend5_8=0,extend5_9=0,extend5_0=0;
            if ($('.trust_exp').length)
                trust_exp = parseFloat($('.trust_exp').val());
            if ($('.commit_exp').length)
                commit_exp = parseFloat($('.commit_exp').val());
            if ($('.inte_exp').length)
                inte_exp = parseFloat($('.inte_exp').val());
            if ($('.track_exp').length)
                track_exp = parseFloat($('.track_exp').val());
            if ($('.exp_exp').length)
                exp_exp = parseFloat($('.exp_exp').val());
            if($('.extend5_6').length)
                extend5_6 = parseFloat($('.extend5_6').val());
            if($('.extend5_7').length)
                extend5_7 = parseFloat($('.extend5_7').val());
            if($('.extend5_8').length)
                extend5_8 = parseFloat($('.extend5_8').val());
            if($('.extend5_9').length)
                extend5_9 = parseFloat($('.extend5_9').val());
            if($('.extend5_0').length)
                extend5_0 = parseFloat($('.extend5_0').val());
            
            if(isNaN(trust_exp)){trust_commit = 0;}
            if(isNaN(commit_exp)){commit_commit = 0;}
            if(isNaN(inte_exp)){inte_commit = 0;}
            if(isNaN(track_exp)){track_commit = 0;}
            if(isNaN(exp_exp)){exp_commit = 0;}
            if(isNaN(extend5_6)){extend5_6 = 0;}
            if(isNaN(extend5_7)){extend5_7 = 0;}
            if(isNaN(extend5_8)){extend5_8 = 0;}
            if(isNaN(extend5_9)){extend5_9 = 0;}
            if(isNaN(extend5_0)){extend5_0 = 0;}
            
            var sum5 = trust_exp + commit_exp + inte_exp + track_exp + exp_exp + extend5_6 + extend5_7 + extend5_8 + extend5_9 + extend5_0;
            if($('.exp_sum').length)
                $('.exp_sum').val(sum5.toFixed(2));
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_exp: ' + trust_exp);
//            console.log('commit_exp: ' + commit_exp);
//            console.log('inte_exp: ' + inte_exp);
//            console.log('track_exp: ' + track_exp);
//            console.log('exp_exp: ' + exp_exp);
//            console.log('sum5: ' + sum5);
            
            //extend 6
            var extend6_1 = 0,extend6_2=0,extend6_3=0,extend6_4=0,extend6_5=0,extend6_6=0,extend6_7=0,extend6_8=0,extend6_9=0,extend6_0=0;
            if($('.extend6_1').length)
                extend6_1 = parseFloat($('.extend6_1').val());
            if($('.extend6_2').length)
                extend6_2 = parseFloat($('.extend6_2').val());
            if($('.extend6_3').length)
                extend6_3 = parseFloat($('.extend6_3').val());
            if($('.extend6_4').length)
                extend6_4 = parseFloat($('.extend6_4').val());
            if($('.extend6_5').length)
                extend6_5 = parseFloat($('.extend6_5').val());
            if($('.extend6_6').length)
                extend6_6 = parseFloat($('.extend6_6').val());
            if($('.extend6_7').length)
                extend6_7 = parseFloat($('.extend6_7').val());
            if($('.extend6_8').length)
                extend6_8 = parseFloat($('.extend6_8').val());
            if($('.extend6_9').length)
                extend6_9 = parseFloat($('.extend6_9').val());
            if($('.extend6_0').length)
                extend6_0 = parseFloat($('.extend6_0').val());
            
            if(isNaN(extend6_1)){extend6_1 = 0;}
            if(isNaN(extend6_2)){extend6_2 = 0;}
            if(isNaN(extend6_3)){extend6_3 = 0;}
            if(isNaN(extend6_4)){extend6_4 = 0;}
            if(isNaN(extend6_5)){extend6_5 = 0;}
            if(isNaN(extend6_6)){extend6_6 = 0;}
            if(isNaN(extend6_7)){extend6_7 = 0;}
            if(isNaN(extend6_8)){extend6_8 = 0;}
            if(isNaN(extend6_9)){extend6_9 = 0;}
            if(isNaN(extend6_0)){extend6_0 = 0;}
            
            var extend6Sum = extend6_1 + extend6_2 + extend6_3 + extend6_4 + extend6_5 + extend6_6 + extend6_7 + extend6_8 + extend6_9 + extend6_0;
            
            //extend 7
            var extend7_1 = 0,extend7_2=0,extend7_3=0,extend7_4=0,extend7_5=0,extend7_6=0,extend7_7=0,extend7_8=0,extend7_9=0,extend7_0=0;
            if($('.extend7_1').length)
                extend7_1 = parseFloat($('.extend7_1').val());
            if($('.extend7_2').length)
                extend7_2 = parseFloat($('.extend7_2').val());
            if($('.extend7_3').length)
                extend7_3 = parseFloat($('.extend7_3').val());
            if($('.extend7_4').length)
                extend7_4 = parseFloat($('.extend7_4').val());
            if($('.extend7_5').length)
                extend7_5 = parseFloat($('.extend7_5').val());
            if($('.extend7_6').length)
                extend7_6 = parseFloat($('.extend7_6').val());
            if($('.extend7_7').length)
                extend7_7 = parseFloat($('.extend7_7').val());
            if($('.extend7_8').length)
                extend7_8 = parseFloat($('.extend7_8').val());
            if($('.extend7_9').length)
                extend7_9 = parseFloat($('.extend7_9').val());
            if($('.extend7_0').length)
                extend7_0 = parseFloat($('.extend7_0').val());
            
            if(isNaN(extend7_1)){extend7_1 = 0;}
            if(isNaN(extend7_2)){extend7_2 = 0;}
            if(isNaN(extend7_3)){extend7_3 = 0;}
            if(isNaN(extend7_4)){extend7_4 = 0;}
            if(isNaN(extend7_5)){extend7_5 = 0;}
            if(isNaN(extend7_6)){extend7_6 = 0;}
            if(isNaN(extend7_7)){extend7_7 = 0;}
            if(isNaN(extend7_8)){extend7_8 = 0;}
            if(isNaN(extend7_9)){extend7_9 = 0;}
            if(isNaN(extend7_0)){extend7_0 = 0;}
            
            var extend7Sum = extend7_1 + extend7_2 + extend7_3 + extend7_4 + extend7_5 + extend7_6 + extend7_7 + extend7_8 + extend7_9 + extend7_0;
            
            //extend 8
            var extend8_1 = 0,extend8_2=0,extend8_3=0,extend8_4=0,extend8_5=0,extend8_6=0,extend8_7=0,extend8_8=0,extend8_9=0,extend8_0=0;
            if($('.extend8_1').length)
                extend8_1 = parseFloat($('.extend8_1').val());
            if($('.extend8_2').length)
                extend8_2 = parseFloat($('.extend8_2').val());
            if($('.extend8_3').length)
                extend8_3 = parseFloat($('.extend8_3').val());
            if($('.extend8_4').length)
                extend8_4 = parseFloat($('.extend8_4').val());
            if($('.extend8_5').length)
                extend8_5 = parseFloat($('.extend8_5').val());
            if($('.extend8_6').length)
                extend8_6 = parseFloat($('.extend8_6').val());
            if($('.extend8_7').length)
                extend8_7 = parseFloat($('.extend8_7').val());
            if($('.extend8_8').length)
                extend8_8 = parseFloat($('.extend8_8').val());
            if($('.extend8_9').length)
                extend8_9 = parseFloat($('.extend8_9').val());
            if($('.extend8_0').length)
                extend8_0 = parseFloat($('.extend8_0').val());
            
            if(isNaN(extend8_1)){extend8_1 = 0;}
            if(isNaN(extend8_2)){extend8_2 = 0;}
            if(isNaN(extend8_3)){extend8_3 = 0;}
            if(isNaN(extend8_4)){extend8_4 = 0;}
            if(isNaN(extend8_5)){extend8_5 = 0;}
            if(isNaN(extend8_6)){extend8_6 = 0;}
            if(isNaN(extend8_7)){extend8_7 = 0;}
            if(isNaN(extend8_8)){extend8_8 = 0;}
            if(isNaN(extend8_9)){extend8_9 = 0;}
            if(isNaN(extend8_0)){extend8_0 = 0;}
            
            var extend8Sum = extend8_1 + extend8_2 + extend8_3 + extend8_4 + extend8_5 + extend8_6 + extend8_7 + extend8_8 + extend8_9 + extend8_0;
            
            //extend 9
            var extend9_1 = 0,extend9_2=0,extend9_3=0,extend9_4=0,extend9_5=0,extend9_6=0,extend9_7=0,extend9_8=0,extend9_9=0,extend9_0=0;
            if($('.extend9_1').length)
                extend9_1 = parseFloat($('.extend9_1').val());
            if($('.extend9_2').length)
                extend9_2 = parseFloat($('.extend9_2 ').val());
            if($('.extend9_3').length)
                extend9_3 = parseFloat($('.extend9_3').val());
            if($('.extend9_4').length)
                extend9_4 = parseFloat($('.extend9_4').val());
            if($('.extend9_5').length)
                extend9_5 = parseFloat($('.extend9_5').val());
            if($('.extend9_6').length)
                extend9_6 = parseFloat($('.extend9_6').val());
            if($('.extend9_7').length)
                extend9_7 = parseFloat($('.extend9_7').val());
            if($('.extend9_8').length)
                extend9_8 = parseFloat($('.extend9_8').val());
            if($('.extend9_9').length)
                extend9_9 = parseFloat($('.extend9_9').val());
            if($('.extend9_0').length)
                extend9_0 = parseFloat($('.extend9_0').val());
            
            if(isNaN(extend9_1)){extend9_1 = 0;}
            if(isNaN(extend9_2)){extend9_2 = 0;}
            if(isNaN(extend9_3)){extend9_3 = 0;}
            if(isNaN(extend9_4)){extend9_4 = 0;}
            if(isNaN(extend9_5)){extend9_5 = 0;}
            if(isNaN(extend9_6)){extend9_6 = 0;}
            if(isNaN(extend9_7)){extend9_7 = 0;}
            if(isNaN(extend9_8)){extend9_8 = 0;}
            if(isNaN(extend9_9)){extend9_9 = 0;}
            if(isNaN(extend9_0)){extend9_0 = 0;}
            
            var extend9Sum = extend9_1 + extend9_2 + extend9_3 + extend9_4 + extend9_5 + extend9_6 + extend9_7 + extend9_8 + extend9_9 + extend9_0;
            
            //extend 10
            var extend0_1 = 0,extend0_2=0,extend0_3=0,extend0_4=0,extend0_5=0,extend0_6=0,extend0_7=0,extend0_8=0,extend0_9=0,extend0_0=0;
            if($('.extend0_1').length)
                extend0_1 = parseFloat($('.extend0_1').val());
            if($('.extend0_2').length)
                extend0_2 = parseFloat($('.extend0_2').val());
            if($('.extend0_3').length)
                extend0_3 = parseFloat($('.extend0_3').val());
            if($('.extend0_4').length)
                extend0_4 = parseFloat($('.extend0_4').val());
            if($('.extend0_5').length)
                extend0_5 = parseFloat($('.extend0_5').val());
            if($('.extend0_6').length)
                extend0_6 = parseFloat($('.extend0_6').val());
            if($('.extend0_7').length)
                extend0_7 = parseFloat($('.extend0_7').val());
            if($('.extend0_8').length)
                extend0_8 = parseFloat($('.extend0_8').val());
            if($('.extend0_9').length)
                extend0_9 = parseFloat($('.extend0_9').val());
            if($('.extend0_0').length)
                extend0_0 = parseFloat($('.extend0_0').val());
            
            if(isNaN(extend0_1)){extend0_1 = 0;}
            if(isNaN(extend0_2)){extend0_2 = 0;}
            if(isNaN(extend0_3)){extend0_3 = 0;}
            if(isNaN(extend0_4)){extend0_4 = 0;}
            if(isNaN(extend0_5)){extend0_5 = 0;}
            if(isNaN(extend0_6)){extend0_6 = 0;}
            if(isNaN(extend0_7)){extend0_7 = 0;}
            if(isNaN(extend0_8)){extend0_8 = 0;}
            if(isNaN(extend0_9)){extend0_9 = 0;}
            if(isNaN(extend0_0)){extend0_0 = 0;}
            
            var extend0Sum = extend0_1 + extend0_2 + extend0_3 + extend0_4 + extend0_5 + extend0_6 + extend0_7 + extend0_8 + extend0_9 + extend0_0;
            
            
            //=====================================================//
            //Standardized Matrix
            //=====================================================//
            
            //trust
            var trust_trust_m = trust_trust / sum1.toFixed(2);
            var commit_trust_m = commit_trust / sum1.toFixed(2);
            var inte_trust_m = inte_trust / sum1.toFixed(2);
            var track_trust_m = track_trust / sum1.toFixed(2);
            var exp_trust_m = exp_trust / sum1.toFixed(2);
            var extend1_6_m = extend1_6 / sum1.toFixed(2);
            var extend1_7_m = extend1_7 / sum1.toFixed(2);
            var extend1_8_m = extend1_8 / sum1.toFixed(2);
            var extend1_9_m = extend1_9 / sum1.toFixed(2);
            var extend1_0_m = extend1_0 / sum1.toFixed(2);
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_trust_m: ' + trust_trust_m);
//            console.log('commit_trust_m: ' + commit_trust_m);
//            console.log('inte_trust_m: ' + inte_trust_m);
//            console.log('track_trust_m: ' + track_trust_m);
//            console.log('exp_trust_m: ' + exp_trust_m);
            
            //commit
            var trust_commit_m = trust_commit / sum2.toFixed(2);
            var commit_commit_m = commit_commit / sum2.toFixed(2);
            var inte_commit_m = inte_commit / sum2.toFixed(2);
            var track_commit_m = track_commit / sum2.toFixed(2);
            var exp_commit_m = exp_commit / sum2.toFixed(2);
            var extend2_6_m = extend2_6 / sum2.toFixed(2);
            var extend2_7_m = extend2_7 / sum2.toFixed(2);
            var extend2_8_m = extend2_8 / sum2.toFixed(2);
            var extend2_9_m = extend2_9 / sum2.toFixed(2);
            var extend2_0_m = extend2_0 / sum2.toFixed(2);
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_commit_m: ' + trust_commit_m);
//            console.log('commit_commit_m: ' + commit_commit_m);
//            console.log('inte_commit_m: ' + inte_commit_m);
//            console.log('track_commit_m: ' + track_commit_m);
//            console.log('exp_commit_m: ' + exp_commit_m);
            
            //inte
            var trust_inte_m = trust_inte / sum3.toFixed(2);
            var commit_inte_m = commit_inte / sum3.toFixed(2);
            var inte_inte_m = inte_inte / sum3.toFixed(2);
            var track_inte_m = track_inte / sum3.toFixed(2);
            var exp_inte_m = exp_inte / sum3.toFixed(2);
            var extend3_6_m = extend3_6 / sum3.toFixed(2);
            var extend3_7_m = extend3_7 / sum3.toFixed(2);
            var extend3_8_m = extend3_8 / sum3.toFixed(2);
            var extend3_9_m = extend3_9 / sum3.toFixed(2);
            var extend3_0_m = extend3_0 / sum3.toFixed(2);
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_inte_m: ' + trust_inte_m);
//            console.log('commit_inte_m: ' + commit_inte_m);
//            console.log('inte_inte_m: ' + inte_inte_m);
//            console.log('track_inte_m: ' + track_inte_m);
//            console.log('exp_inte_m: ' + exp_inte_m);
            
            //track
            var trust_track_m = trust_track / sum4.toFixed(2);
            var commit_track_m = commit_track / sum4.toFixed(2);
            var inte_track_m = inte_track / sum4.toFixed(2);
            var track_track_m = track_track / sum4.toFixed(2);
            var exp_track_m = exp_track / sum4.toFixed(2);
            var extend4_6_m = extend4_6 / sum4.toFixed(2);
            var extend4_7_m = extend4_7 / sum4.toFixed(2);
            var extend4_8_m = extend4_8 / sum4.toFixed(2);
            var extend4_9_m = extend4_9 / sum4.toFixed(2);
            var extend4_0_m = extend4_0 / sum4.toFixed(2);
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_track_m: ' + trust_track_m);
//            console.log('commit_track_m: ' + commit_track_m);
//            console.log('inte_track_m: ' + inte_track_m);
//            console.log('track_track_m: ' + track_track_m);
//            console.log('exp_track_m: ' + exp_track_m);
            
            //exp
            var trust_exp_m = trust_exp / sum5.toFixed(2);
            var commit_exp_m = commit_exp / sum5.toFixed(2);
            var inte_exp_m = inte_exp / sum5.toFixed(2);
            var track_exp_m = track_exp / sum5.toFixed(2);
            var exp_exp_m = exp_exp / sum5.toFixed(2);
            var extend5_6_m = extend5_6 / sum5.toFixed(2);
            var extend5_7_m = extend5_7 / sum5.toFixed(2);
            var extend5_8_m = extend5_8 / sum5.toFixed(2);
            var extend5_9_m = extend5_9 / sum5.toFixed(2);
            var extend5_0_m = extend5_0 / sum5.toFixed(2);
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_exp_m: ' + trust_exp_m);
//            console.log('commit_exp_m: ' + commit_exp_m);
//            console.log('inte_exp_m: ' + inte_exp_m);
//            console.log('track_exp_m: ' + track_exp_m);
//            console.log('exp_exp_m: ' + exp_exp_m);
            
            //extend 6
            var extend6_1_m = extend6_1 / extend6Sum.toFixed(2);
            var extend6_2_m = extend6_2 / extend6Sum.toFixed(2);
            var extend6_3_m = extend6_3 / extend6Sum.toFixed(2);
            var extend6_4_m = extend6_4 / extend6Sum.toFixed(2);
            var extend6_5_m = extend6_5 / extend6Sum.toFixed(2);
            var extend6_6_m = extend6_6 / extend6Sum.toFixed(2);
            var extend6_7_m = extend6_7 / extend6Sum.toFixed(2);
            var extend6_8_m = extend6_8 / extend6Sum.toFixed(2);
            var extend6_9_m = extend6_9 / extend6Sum.toFixed(2);
            var extend6_0_m = extend6_0 / extend6Sum.toFixed(2);
            
            
            //extend 7
            var extend7_1_m = extend7_1 / extend7Sum.toFixed(2);
            var extend7_2_m = extend7_2 / extend7Sum.toFixed(2);
            var extend7_3_m = extend7_3 / extend7Sum.toFixed(2);
            var extend7_4_m = extend7_4 / extend7Sum.toFixed(2);
            var extend7_5_m = extend7_5 / extend7Sum.toFixed(2);
            var extend7_6_m = extend7_6 / extend7Sum.toFixed(2);
            var extend7_7_m = extend7_7 / extend7Sum.toFixed(2);
            var extend7_8_m = extend7_8 / extend7Sum.toFixed(2);
            var extend7_9_m = extend7_9 / extend7Sum.toFixed(2);
            var extend7_0_m = extend7_0 / extend7Sum.toFixed(2);
            
            //extend 8
            var extend8_1_m = extend8_1 / extend8Sum.toFixed(2);
            var extend8_2_m = extend8_2 / extend8Sum.toFixed(2);
            var extend8_3_m = extend8_3 / extend8Sum.toFixed(2);
            var extend8_4_m = extend8_4 / extend8Sum.toFixed(2);
            var extend8_5_m = extend8_5 / extend8Sum.toFixed(2);
            var extend8_6_m = extend8_6 / extend8Sum.toFixed(2);
            var extend8_7_m = extend8_7 / extend8Sum.toFixed(2);
            var extend8_8_m = extend8_8 / extend8Sum.toFixed(2);
            var extend8_9_m = extend8_9 / extend8Sum.toFixed(2);
            var extend8_0_m = extend8_0 / extend8Sum.toFixed(2);
            
            //extend 9
            var extend9_1_m = extend9_1 / extend9Sum.toFixed(2);
            var extend9_2_m = extend9_2 / extend9Sum.toFixed(2);
            var extend9_3_m = extend9_3 / extend9Sum.toFixed(2);
            var extend9_4_m = extend9_4 / extend9Sum.toFixed(2);
            var extend9_5_m = extend9_5 / extend9Sum.toFixed(2);
            var extend9_6_m = extend9_6 / extend9Sum.toFixed(2);
            var extend9_7_m = extend9_7 / extend9Sum.toFixed(2);
            var extend9_8_m = extend9_8 / extend9Sum.toFixed(2);
            var extend9_9_m = extend9_9 / extend9Sum.toFixed(2);
            var extend9_0_m = extend9_0 / extend9Sum.toFixed(2);
            
            //extend 10
            var extend0_1_m = extend0_1 / extend0Sum.toFixed(2);
            var extend0_2_m = extend0_2 / extend0Sum.toFixed(2);
            var extend0_3_m = extend0_3 / extend0Sum.toFixed(2);
            var extend0_4_m = extend0_4 / extend0Sum.toFixed(2);
            var extend0_5_m = extend0_5 / extend0Sum.toFixed(2);
            var extend0_6_m = extend0_6 / extend0Sum.toFixed(2);
            var extend0_7_m = extend0_7 / extend0Sum.toFixed(2);
            var extend0_8_m = extend0_8 / extend0Sum.toFixed(2);
            var extend0_9_m = extend0_9 / extend0Sum.toFixed(2);
            var extend0_0_m = extend0_0 / extend0Sum.toFixed(2);
           
            //=====================================================//
            //Weight
            //=====================================================//
            
            //trust
            if(isNaN(trust_trust_m)){trust_trust_m = 0;}
            if(isNaN(trust_commit_m)){trust_commit_m = 0;}
            if(isNaN(trust_inte_m)){trust_inte_m = 0;}
            if(isNaN(trust_track_m)){trust_track_m = 0;}
            if(isNaN(trust_exp_m)){trust_exp_m = 0;}
            if(isNaN(extend1_6_m)){extend1_6_m = 0;}
            if(isNaN(extend1_7_m)){extend1_7_m = 0;}
            if(isNaN(extend1_8_m)){extend1_8_m = 0;}
            if(isNaN(extend1_9_m)){extend1_9_m = 0;}
            if(isNaN(extend1_0_m)){extend1_0_m = 0;}
            
            var trust_weight = trust_trust_m + trust_commit_m + trust_inte_m + trust_track_m + trust_exp_m + extend1_6_m + extend1_7_m + extend1_8_m + extend1_9_m + extend1_0_m;
            var trust_weight_m = (trust_weight / counter) * 100;
            
//            console.log('---------------------------------------------------------------');
//            console.log('trust_weight: ' + trust_weight);
//            console.log('trust_weight_m: ' + trust_weight_m);
            
            //commit
            if(isNaN(commit_trust_m)){commit_trust_m = 0;}
            if(isNaN(commit_commit_m)){commit_commit_m = 0;}
            if(isNaN(commit_inte_m)){commit_inte_m = 0;}
            if(isNaN(commit_track_m)){commit_track_m = 0;}
            if(isNaN(commit_exp_m)){commit_exp_m = 0;}
            if(isNaN(extend2_6_m)){extend2_6_m = 0;}
            if(isNaN(extend2_7_m)){extend2_7_m = 0;}
            if(isNaN(extend2_8_m)){extend2_8_m = 0;}
            if(isNaN(extend2_9_m)){extend2_9_m = 0;}
            if(isNaN(extend2_0_m)){extend2_0_m = 0;}
            
            var commit_weight = commit_trust_m + commit_commit_m + commit_inte_m + commit_track_m + commit_exp_m + extend2_6_m + extend2_7_m + extend2_8_m + extend2_9_m + extend2_0_m;
            var commit_weight_m = (commit_weight / counter) * 100;
            
//            console.log('---------------------------------------------------------------');
//            console.log('commit_weight: ' + commit_weight);
//            console.log('commit_weight_m: ' + commit_weight_m);

            //inte
            if(isNaN(inte_trust_m)){inte_trust_m = 0;}
            if(isNaN(inte_commit_m)){inte_commit_m = 0;}
            if(isNaN(inte_inte_m)){inte_inte_m = 0;}
            if(isNaN(inte_track_m)){inte_track_m = 0;}
            if(isNaN(inte_exp_m)){inte_exp_m = 0;}
            if(isNaN(extend3_6_m)){extend3_6_m = 0;}
            if(isNaN(extend3_7_m)){extend3_7_m = 0;}
            if(isNaN(extend3_8_m)){extend3_8_m = 0;}
            if(isNaN(extend3_9_m)){extend3_9_m = 0;}
            if(isNaN(extend3_0_m)){extend3_0_m = 0;}
            
            var inte_weight = inte_trust_m + inte_commit_m + inte_inte_m + inte_track_m + inte_exp_m + extend3_6_m + extend3_7_m + extend3_8_m + extend3_9_m + extend3_0_m;
            var inte_weight_m = (inte_weight / counter) * 100;
            
//            console.log('---------------------------------------------------------------');
//            console.log('inte_weight: ' + inte_weight);
//            console.log('inte_weight_m: ' + inte_weight_m);
            
            //track
            if(isNaN(track_trust_m)){track_trust_m = 0;}
            if(isNaN(track_commit_m)){track_commit_m = 0;}
            if(isNaN(track_inte_m)){track_inte_m = 0;}
            if(isNaN(track_track_m)){track_track_m = 0;}
            if(isNaN(track_exp_m)){track_exp_m = 0;}
            if(isNaN(extend4_6_m)){extend4_6_m = 0;}
            if(isNaN(extend4_7_m)){extend4_7_m = 0;}
            if(isNaN(extend4_8_m)){extend4_8_m = 0;}
            if(isNaN(extend4_9_m)){extend4_9_m = 0;}
            if(isNaN(extend4_0_m)){extend4_0_m = 0;}
            
            var track_weight = track_trust_m + track_commit_m + track_inte_m + track_track_m + track_exp_m + extend4_6_m + extend4_7_m + extend4_8_m + extend4_9_m + extend4_0_m;
            var track_weight_m = (track_weight / counter) * 100;
            
//            console.log('---------------------------------------------------------------');
//            console.log('track_weight: ' + track_weight);
//            console.log('track_weight_m: ' + track_weight_m);
            
            //exp
            if(isNaN(exp_trust_m)){exp_trust_m = 0;}
            if(isNaN(exp_commit_m)){exp_commit_m = 0;}
            if(isNaN(exp_inte_m)){exp_inte_m = 0;}
            if(isNaN(exp_track_m)){exp_track_m = 0;}
            if(isNaN(exp_exp_m)){exp_exp_m = 0;}
            if(isNaN(extend5_6_m)){extend5_6_m = 0;}
            if(isNaN(extend5_7_m)){extend5_7_m = 0;}
            if(isNaN(extend5_8_m)){extend5_8_m = 0;}
            if(isNaN(extend5_9_m)){extend5_9_m = 0;}
            if(isNaN(extend5_0_m)){extend5_0_m = 0;}
            
            var exp_weight = exp_trust_m + exp_commit_m + exp_inte_m + exp_track_m + exp_exp_m + extend5_6_m + extend5_7_m + extend5_8_m + extend5_9_m + extend5_0_m;
            var exp_weight_m = (exp_weight / counter) * 100;
            
//            console.log('---------------------------------------------------------------');
//            console.log('exp_weight: ' + exp_weight);
//            console.log('exp_weight_m: ' + exp_weight_m);
            
            //extend 6
            if(isNaN(extend6_1_m)){extend6_1_m = 0;}
            if(isNaN(extend6_2_m)){extend6_2_m = 0;}
            if(isNaN(extend6_3_m)){extend6_3_m = 0;}
            if(isNaN(extend6_4_m)){extend6_4_m = 0;}
            if(isNaN(extend6_5_m)){extend6_5_m = 0;}
            if(isNaN(extend6_6_m)){extend6_6_m = 0;}
            if(isNaN(extend6_7_m)){extend6_7_m = 0;}
            if(isNaN(extend6_8_m)){extend6_8_m = 0;}
            if(isNaN(extend6_9_m)){extend6_9_m = 0;}
            if(isNaN(extend6_0_m)){extend6_0_m = 0;}
            
            var extend6_weight = extend6_1_m + extend6_2_m + extend6_3_m + extend6_4_m + extend6_5_m + extend6_6_m + extend6_7_m + extend6_8_m + extend6_9_m + extend6_0_m;
            var extend6_weight_m = (extend6_weight / counter) * 100;
            
            //extend 7
            if(isNaN(extend7_1_m)){extend7_1_m = 0;}
            if(isNaN(extend7_2_m)){extend7_2_m = 0;}
            if(isNaN(extend7_3_m)){extend7_3_m = 0;}
            if(isNaN(extend7_4_m)){extend7_4_m = 0;}
            if(isNaN(extend7_5_m)){extend7_5_m = 0;}
            if(isNaN(extend7_6_m)){extend7_6_m = 0;}
            if(isNaN(extend7_7_m)){extend7_7_m = 0;}
            if(isNaN(extend7_8_m)){extend7_8_m = 0;}
            if(isNaN(extend7_9_m)){extend7_9_m = 0;}
            if(isNaN(extend7_0_m)){extend7_0_m = 0;}
            
            var extend7_weight = extend7_1_m + extend7_2_m + extend7_3_m + extend7_4_m + extend7_5_m + extend7_6_m + extend7_7_m + extend7_8_m + extend7_9_m + extend7_0_m;
            var extend7_weight_m = (extend7_weight / counter) * 100;
            
            //extend 8
            if(isNaN(extend8_1_m)){extend8_1_m = 0;}
            if(isNaN(extend8_2_m)){extend8_2_m = 0;}
            if(isNaN(extend8_3_m)){extend8_3_m = 0;}
            if(isNaN(extend8_4_m)){extend8_4_m = 0;}
            if(isNaN(extend8_5_m)){extend8_5_m = 0;}
            if(isNaN(extend8_6_m)){extend8_6_m = 0;}
            if(isNaN(extend8_7_m)){extend8_7_m = 0;}
            if(isNaN(extend8_8_m)){extend8_8_m = 0;}
            if(isNaN(extend8_9_m)){extend8_9_m = 0;}
            if(isNaN(extend8_0_m)){extend8_0_m = 0;}
            
            var extend8_weight = extend8_1_m + extend8_2_m + extend8_3_m + extend8_4_m + extend8_5_m + extend8_6_m + extend8_7_m + extend8_8_m + extend8_9_m + extend8_0_m;
            var extend8_weight_m = (extend8_weight / counter) * 100;
            
            //extend 9
            if(isNaN(extend9_1_m)){extend9_1_m = 0;}
            if(isNaN(extend9_2_m)){extend9_2_m = 0;}
            if(isNaN(extend9_3_m)){extend9_3_m = 0;}
            if(isNaN(extend9_4_m)){extend9_4_m = 0;}
            if(isNaN(extend9_5_m)){extend9_5_m = 0;}
            if(isNaN(extend9_6_m)){extend9_6_m = 0;}
            if(isNaN(extend9_7_m)){extend9_7_m = 0;}
            if(isNaN(extend9_8_m)){extend9_8_m = 0;}
            if(isNaN(extend9_9_m)){extend9_9_m = 0;}
            if(isNaN(extend9_0_m)){extend9_0_m = 0;}
            
            var extend9_weight = extend9_1_m + extend9_2_m + extend9_3_m + extend9_4_m + extend9_5_m + extend9_6_m + extend9_7_m + extend9_8_m + extend9_9_m + extend9_0_m;
            var extend9_weight_m = (extend9_weight / counter) * 100;
            
            //extend 10
            if(isNaN(extend0_1_m)){extend0_1_m = 0;}
            if(isNaN(extend0_2_m)){extend0_2_m = 0;}
            if(isNaN(extend0_3_m)){extend0_3_m = 0;}
            if(isNaN(extend0_4_m)){extend0_4_m = 0;}
            if(isNaN(extend0_5_m)){extend0_5_m = 0;}
            if(isNaN(extend0_6_m)){extend0_6_m = 0;}
            if(isNaN(extend0_7_m)){extend0_7_m = 0;}
            if(isNaN(extend0_8_m)){extend0_8_m = 0;}
            if(isNaN(extend0_9_m)){extend0_9_m = 0;}
            if(isNaN(extend0_0_m)){extend0_0_m = 0;}
            
            var extend0_weight = extend0_1_m + extend0_2_m + extend0_3_m + extend0_4_m + extend0_5_m + extend0_6_m + extend0_7_m + extend0_8_m + extend0_9_m + extend0_0_m;
            var extend0_weight_m = (extend0_weight / counter) * 100;
            
            weight = {
                trust: trust_weight_m.toFixed(2),
                commit: commit_weight_m.toFixed(2),
                inte: inte_weight_m.toFixed(2),
                track: track_weight_m.toFixed(2),
                exp: exp_weight_m.toFixed(2),
                extend6: extend6_weight_m.toFixed(2),
                extend7: extend7_weight_m.toFixed(2),
                extend8: extend8_weight_m.toFixed(2),
                extend9: extend9_weight_m.toFixed(2),
                extend0: extend0_weight_m.toFixed(2)
            };
            
            if(isNaN(weight.trust)){weight.trust = 0;}
            if(isNaN(weight.commit)){weight.commit = 0;}
            if(isNaN(weight.inte)){weight.inte = 0;}
            if(isNaN(weight.track)){weight.track = 0;}
            if(isNaN(weight.exp)){weight.exp = 0;}
            if(isNaN(weight.extend6)){weight.extend6 = 0;}
            if(isNaN(weight.extend7)){weight.extend7 = 0;}
            if(isNaN(weight.extend8)){weight.extend8 = 0;}
            if(isNaN(weight.extend9)){weight.extend9 = 0;}
            if(isNaN(weight.extend0)){weight.extend0 = 0;}
            
//            console.log('---------------------------------------------------------------');
//            console.log(weight.trust + "  " + weight.commit + "  " + weight.inte + "  " + weight.track + "  " + weight.exp + "  " + weight.extend6
//                     + "  " + weight.extend7 + "  " + weight.extend8 + "  " + weight.extend9 + "  " + weight.extend0);
            
            if($('.weight_chart_container').length){
                $('#trust_weight').val(weight.trust);
                $('#commit_weight').val(weight.commit);
                $('#inte_weight').val(weight.inte);
                $('#track_weight').val(weight.track);
                $('#exp_weight').val(weight.exp);
                $('#extend6_weight').val(weight.extend6);
                $('#extend7_weight').val(weight.extend7);
                $('#extend8_weight').val(weight.extend8);
                $('#extend9_weight').val(weight.extend9);
                $('#extend0_weight').val(weight.extend0);

                $('canvas').remove('#weight_chart_bar');
                $('.weight_chart_container').append('<canvas id="weight_chart_bar"></canvas>');

                if (counter === 5) {
                    if ($('#weight_chart_bar').length) {
                        var ctx = document.getElementById("weight_chart_bar").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Trust", "Commit", "Integrity", "Record", "Exp"],
                                datasets: [{
                                        label: 'Criteria',
                                        backgroundColor: "rgba(89, 105, 255,0.5)",
                                        borderColor: "rgba(89, 105, 255,0.7)",
                                        data: [weight.trust, weight.commit, weight.inte, weight.track, weight.exp],
                                        borderWidth: 2
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'top',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
            }
            
            if ($('.chart_display').length) {
                $('#proceed_pop_page').removeAttr('disabled');
                $("#proceed_pop_page").css("background-color", "#5b68f5");
                var comp_name = $('.comp_name');
                var name = [];
                for(var i = 0; i < comp_name.length; i++){
                    name[i] = $(comp_name[i]).val();
                }
                $('canvas').remove('#chart_bar_display');
                $('.chart_display').append('<canvas id="chart_bar_display">&nbsp</canvas>');
                
                $('.trust_data').val(weight.trust);
                $('.commit_data').val(weight.commit);
                $('.inte_data').val(weight.inte);
                $('.track_data').val(weight.track);
                $('.exp_data').val(weight.exp);
                $('.extend6_data').val(weight.extend6);
                $('.extend7_data').val(weight.extend7);
                $('.extend8_data').val(weight.extend8);
                $('.extend9_data').val(weight.extend9);
                $('.extend0_data').val(weight.extend0);
                
//                localStorage.setItem("trust_data", weight.trust);
//                localStorage.setItem("commit_data", weight.commit);
//                localStorage.setItem("inte_data", weight.inte);
//                localStorage.setItem("track_data", weight.track);
//                localStorage.setItem("exp_data", weight.exp);
//                localStorage.setItem("extend6_data", weight.extend6);
//                localStorage.setItem("extend7_data", weight.extend7);
//                localStorage.setItem("extend8_data", weight.extend8);
//                localStorage.setItem("extend9_data", weight.extend9);
//                localStorage.setItem("extend0_data", weight.extend0);
                
                switch (counter) {
                    case 1:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 2:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 3:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 4:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [weight.track],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 5:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [weight.track],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [weight.exp],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 6:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [weight.track],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [weight.exp],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [weight.extend6],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 7:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [weight.track],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [weight.exp],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [weight.extend6],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [weight.extend7],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 8:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [weight.track],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [weight.exp],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [weight.extend6],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [weight.extend7],
                                            borderWidth: 2
                                        }, {
                                            label: name[7],
                                            backgroundColor: "rgba(102, 0, 204,0.5)",
                                            borderColor: "rgba(64, 0, 128,0.7)",
                                            data: [weight.extend8],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 9:
                        if ($('#chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [weight.track],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [weight.exp],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [weight.extend6],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [weight.extend7],
                                            borderWidth: 2
                                        }, {
                                            label: name[7],
                                            backgroundColor: "rgba(102, 0, 204,0.5)",
                                            borderColor: "rgba(64, 0, 128,0.7)",
                                            data: [weight.extend8],
                                            borderWidth: 2
                                        }, {
                                            label: name[8],
                                            backgroundColor: "rgba(255, 0, 85,0.5)",
                                            borderColor: "rgba(153, 0, 51,0.7)",
                                            data: [weight.extend9],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    case 10:
                        if ($('.chart_bar_display').length) {
                            var ctx = document.getElementById("chart_bar_display").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Collaborator"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [weight.trust],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [weight.commit],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [weight.inte],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [weight.track],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [weight.exp],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [weight.extend6],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [weight.extend7],
                                            borderWidth: 2
                                        }, {
                                            label: name[7],
                                            backgroundColor: "rgba(102, 0, 204,0.5)",
                                            borderColor: "rgba(64, 0, 128,0.7)",
                                            data: [weight.extend8],
                                            borderWidth: 2
                                        }, {
                                            label: name[8],
                                            backgroundColor: "rgba(255, 0, 85,0.5)",
                                            borderColor: "rgba(153, 0, 51,0.7)",
                                            data: [weight.extend9],
                                            borderWidth: 2
                                        }, {
                                            label: name[9],
                                            backgroundColor: "rgba(0, 255, 0,0.5)",
                                            borderColor: "rgba(0, 77, 0,0.7)",
                                            data: [weight.extend0],
                                            borderWidth: 2
                                        }, {
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
            
            //=====================================================//
            //Total Weight
            //=====================================================//
            
//            var total_weight = trust_weight_m + commit_weight_m + inte_weight_m + track_weight_m + exp_weight_m;
            
            //=====================================================//
            //CI and CR worksheet
            //=====================================================//
            
            //trust
            var trust_trust_c = trust_trust * trust_weight;
            var commit_trust_c = commit_trust * trust_weight;
            var inte_trust_c = inte_trust * trust_weight;
            var track_trust_c = track_trust * trust_weight;
            var exp_trust_c = exp_trust * trust_weight;
            var extend1_6_c = extend1_6 * trust_weight;
            var extend1_7_c = extend1_7 * trust_weight;
            var extend1_8_c = extend1_8 * trust_weight;
            var extend1_9_c = extend1_9 * trust_weight;
            var extend1_0_c = extend1_0 * trust_weight;
            
            //commit
            var trust_commit_c = trust_commit * commit_weight;
            var commit_commit_c = commit_commit * commit_weight;
            var inte_commit_c = inte_commit * commit_weight;
            var track_commit_c = track_commit * commit_weight;
            var exp_commit_c = exp_commit * commit_weight;
            var extend2_6_c = extend2_6 * commit_weight;
            var extend2_7_c = extend2_7 * commit_weight;
            var extend2_8_c = extend2_8 * commit_weight;
            var extend2_9_c = extend2_9 * commit_weight;
            var extend2_0_c = extend2_0 * commit_weight;
            
            //inte
            var trust_inte_c = trust_inte * inte_weight;
            var commit_inte_c = commit_inte * inte_weight;
            var inte_inte_c = inte_inte * inte_weight;
            var track_inte_c = track_inte * inte_weight;
            var exp_inte_c = exp_inte * inte_weight;
            var extend3_6_c = extend3_6 * inte_weight;
            var extend3_7_c = extend3_7 * inte_weight;
            var extend3_8_c = extend3_8 * inte_weight;
            var extend3_9_c = extend3_9 * inte_weight;
            var extend3_0_c = extend3_0 * inte_weight;
            
            //track
            var trust_track_c = trust_track * track_weight;
            var commit_track_c = commit_track * track_weight;
            var inte_track_c = inte_track * track_weight;
            var track_track_c = track_track * track_weight;
            var exp_track_c = exp_track * track_weight;
            var extend4_6_c = extend4_6 * track_weight;
            var extend4_7_c = extend4_7 * track_weight;
            var extend4_8_c = extend4_8 * track_weight;
            var extend4_9_c = extend4_9 * track_weight;
            var extend4_0_c = extend4_0 * track_weight;
            
            //exp
            var trust_exp_c = trust_exp * exp_weight;
            var commit_exp_c = commit_exp * exp_weight;
            var inte_exp_c = inte_exp * exp_weight;
            var track_exp_c = track_exp * exp_weight;
            var exp_exp_c = exp_exp * exp_weight;
            var extend5_6_c = extend5_6 * exp_weight;
            var extend5_7_c = extend5_7 * exp_weight;
            var extend5_8_c = extend5_8 * exp_weight;
            var extend5_9_c = extend5_9 * exp_weight;
            var extend5_0_c = extend5_0 * exp_weight;
            
            //extend 6
            var extend6_1_c = extend6_1 * extend6_weight;
            var extend6_2_c = extend6_2 * extend6_weight;
            var extend6_3_c = extend6_3 * extend6_weight;
            var extend6_4_c = extend6_4 * extend6_weight;
            var extend6_5_c = extend6_5 * extend6_weight;
            var extend6_6_c = extend6_6 * extend6_weight;
            var extend6_7_c = extend6_7 * extend6_weight;
            var extend6_8_c = extend6_8 * extend6_weight;
            var extend6_9_c = extend6_9 * extend6_weight;
            var extend6_0_c = extend6_0 * extend6_weight;
            
            //extend 7
            var extend7_1_c = extend7_1 * extend7_weight;
            var extend7_2_c = extend7_2 * extend7_weight;
            var extend7_3_c = extend7_3 * extend7_weight;
            var extend7_4_c = extend7_4 * extend7_weight;
            var extend7_5_c = extend7_5 * extend7_weight;
            var extend7_6_c = extend7_6 * extend7_weight;
            var extend7_7_c = extend7_7 * extend7_weight;
            var extend7_8_c = extend7_8 * extend7_weight;
            var extend7_9_c = extend7_9 * extend7_weight;
            var extend7_0_c = extend7_0 * extend7_weight;
            
            //extend 8
            var extend8_1_c = extend8_1 * extend8_weight;
            var extend8_2_c = extend8_2 * extend8_weight;
            var extend8_3_c = extend8_3 * extend8_weight;
            var extend8_4_c = extend8_4 * extend8_weight;
            var extend8_5_c = extend8_5 * extend8_weight;
            var extend8_6_c = extend8_6 * extend8_weight;
            var extend8_7_c = extend8_7 * extend8_weight;
            var extend8_8_c = extend8_8 * extend8_weight;
            var extend8_9_c = extend8_9 * extend8_weight;
            var extend8_0_c = extend8_0 * extend8_weight;
            
            //extend 9
            var extend9_1_c = extend9_1 * extend9_weight;
            var extend9_2_c = extend9_2 * extend9_weight;
            var extend9_3_c = extend9_3 * extend9_weight;
            var extend9_4_c = extend9_4 * extend9_weight;
            var extend9_5_c = extend9_5 * extend9_weight;
            var extend9_6_c = extend9_6 * extend9_weight;
            var extend9_7_c = extend9_7 * extend9_weight;
            var extend9_8_c = extend9_8 * extend9_weight;
            var extend9_9_c = extend9_9 * extend9_weight;
            var extend9_0_c = extend9_0 * extend9_weight;
            
            //extend 10
            var extend0_1_c = extend0_1 * extend0_weight;
            var extend0_2_c = extend0_2 * extend0_weight;
            var extend0_3_c = extend0_3 * extend0_weight;
            var extend0_4_c = extend0_4 * extend0_weight;
            var extend0_5_c = extend0_5 * extend0_weight;
            var extend0_6_c = extend0_6 * extend0_weight;
            var extend0_7_c = extend0_7 * extend0_weight;
            var extend0_8_c = extend0_8 * extend0_weight;
            var extend0_9_c = extend0_9 * extend0_weight;
            var extend0_0_c = extend0_0 * extend0_weight;
            
            //=====================================================//
            //Sum CR & CI
            //=====================================================//
            
            var trust_sum_c = trust_trust_c + trust_commit_c + trust_inte_c + trust_track_c + trust_exp_c + extend1_6_c + extend1_7_c + extend1_8_c + extend1_9_c + extend1_0_c;
            var commit_sum_c = commit_trust_c + commit_commit_c + commit_inte_c + commit_track_c + commit_exp_c + extend2_6_c + extend2_7_c + extend2_8_c + extend2_9_c + extend2_0_c;
            var inte_sum_c = inte_trust_c + inte_commit_c + inte_inte_c + inte_track_c + inte_exp_c + extend3_6_c + extend3_7_c + extend3_8_c + extend3_9_c + extend3_0_c;
            var track_sum_c = track_trust_c + track_commit_c + track_inte_c + track_track_c + track_exp_c + extend4_6_c + extend4_7_c + extend4_8_c + extend4_9_c + extend4_0_c;
            var exp_sum_c = exp_trust_c + exp_commit_c + exp_inte_c + exp_track_c + exp_exp_c + extend5_6_c + extend5_7_c + extend5_8_c + extend5_9_c + extend5_0_c; 
            var extend6_sum_c = extend6_1_c + extend6_2_c + extend6_3_c + extend6_4_c + extend6_5_c + extend6_6_c + extend6_7_c + extend6_8_c + extend6_9_c + extend6_0_c; 
            var extend7_sum_c = extend7_1_c + extend7_2_c + extend7_3_c + extend7_4_c + extend7_5_c + extend7_6_c + extend7_7_c + extend7_8_c + extend7_9_c + extend7_0_c; 
            var extend8_sum_c = extend8_1_c + extend8_2_c + extend8_3_c + extend8_4_c + extend8_5_c + extend8_6_c + extend8_7_c + extend8_8_c + extend8_9_c + extend8_0_c; 
            var extend9_sum_c = extend9_1_c + extend9_2_c + extend9_3_c + extend9_4_c + extend9_5_c + extend9_6_c + extend9_7_c + extend9_8_c + extend9_9_c + extend9_0_c; 
            var extend0_sum_c = extend0_1_c + extend0_2_c + extend0_3_c + extend0_4_c + extend0_5_c + extend0_6_c + extend0_7_c + extend0_8_c + extend0_9_c + extend0_0_c; 
            
            //=====================================================//
            //Sum / Weight CR & CI
            //=====================================================//
            
            var trust_sum_weight = trust_sum_c / trust_weight;
            var commit_sum_weight = commit_sum_c / commit_weight;
            var inte_sum_weight = inte_sum_c / inte_weight;
            var track_sum_weight = track_sum_c / track_weight;
            var exp_sum_weight = exp_sum_c / exp_weight;
            var extend6_sum_weight = extend6_sum_c / extend6_weight;
            var extend7_sum_weight = extend7_sum_c / extend7_weight;
            var extend8_sum_weight = extend8_sum_c / extend8_weight;
            var extend9_sum_weight = extend9_sum_c / extend9_weight;
            var extend0_sum_weight = extend0_sum_c / extend0_weight;
            
            //=====================================================//
            //Conclusion
            //=====================================================//
            
            $('.data_count').val(counter);
            var constant = 0
            var lambda_max_sum = 0;
            switch (counter) {
                case 1 :
                    constant = 0;
                    lambda_max_sum = trust_sum_weight;
                    break;
                case 2 :
                    constant = 0;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight;
                    break;
                case 3 :
                    constant = 0.58;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight;
                    break;
                case 4 :
                    constant = 0.90;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight + track_sum_weight;
                    break;
                case 5 :
                    constant = 1.12;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight + track_sum_weight + exp_sum_weight;
                    break;
                case 6 :
                    constant = 1.24;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight + track_sum_weight + exp_sum_weight + extend6_sum_weight;
                    break;
                case 7 :
                    constant = 1.32;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight + track_sum_weight + exp_sum_weight + extend6_sum_weight +
                            extend7_sum_weight;
                    break;
                case 8 :
                    constant = 1.41;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight + track_sum_weight + exp_sum_weight + extend6_sum_weight +
                            extend7_sum_weight + extend8_sum_weight;
                    break;
                case 9 :
                    constant = 1.45;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight + track_sum_weight + exp_sum_weight + extend6_sum_weight +
                            extend7_sum_weight + extend8_sum_weight + extend9_sum_weight;
                    break;
                case 10 :
                    constant = 1.49;
                    lambda_max_sum = trust_sum_weight + commit_sum_weight + inte_sum_weight + track_sum_weight + exp_sum_weight + extend6_sum_weight +
                            extend7_sum_weight + extend8_sum_weight + extend9_sum_weight + extend0_sum_weight;
                    break;
                default :
                    break;
            }
            
            var lambda_max = lambda_max_sum / counter;
            $('.lambda_max').val(lambda_max.toFixed(2));

            var c_index = (lambda_max - counter) / (counter - 1);
            $('.c_index').val(c_index.toFixed(2));

            $('.constant').val(constant);
            var c_ratio = c_index / constant;
            $('.c_ratio').val(c_ratio.toFixed(2));

            if (parseFloat(c_ratio) <= 0.1)
            {
                $('.conclusion_msg').val('You consistancy ratio (CR) is ' + c_ratio.toFixed(2) + ' <= 0.1 therefore, your project criteria is relevant to the contractor');
            } else if (parseFloat(c_ratio) > 0.1) {
                $('.conclusion_msg').val('You consistancy ratio (CR) is ' + c_ratio.toFixed(2) + ' > 0.1 therefore, your project criteria is irrelevant to the contractor');
            }
        }
    });
    
    if($('#from').length && $('#to').length ){
        var dateToday = new Date();
        var dates = $("#from, #to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3,
            minDate: dateToday,
            onSelect: function (selectedDate) {
                var option = this.id === "from" ? "minDate" : "maxDate",
                        instance = $(this).data("datepicker"),
                        date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker("option", option, date);
            }
        });
    }
    
    var c_checkbox = $('input[name=hire-button]:checked');
    c_checkbox.each(function (){
        alert(c_checkbox.length);
    });

    $("div > input[type=checkbox]").click(function () {
        var thisParent = $(this).closest(".option-answer");
        var prevClicked = thisParent.find(":checked");
        var currentObj = $(this);
        prevClicked.each(function () {
            if (!$(currentObj).is($(this))) {
                $(this).prop("checked", false);
            }
        });
    });
    
    if($('#submit-button').length){
        var count = $('.question_list').find('#answered');
        if(count.length < 63){
            $('#submit-button').prop('disabled', true);
            $('#submit-button').css('background-color', 'grey');
        }
    }
    
    if ($('.QuestionContainer').length) {
        
        var question_counter = 1;
        var question_checker = 0;
        
        for (var i = 0; i <= 32; i++) {
            $('.' + i).hide();
        }
        
        $('.1').show();
        
        $('.option').change(function () {
            var parent = $(this).parent().parent();
            var midParent = $(this).parent();
            var superParent = $(this).parent().parent().parent();
            var test1 = $(midParent).find("#yes").prop("checked");
            var test2 = $(midParent).find("#no").prop("checked");
            if (test1 === true || test2 === true) {
                $(parent).attr("id", "answered");
                question_checker++;
                $(parent).hide(500);
                if (question_counter < 32) {
                    question_counter++;
                    $(superParent).find('.' + question_counter).show(500);
                }
            } else if (test1 === false && test2 === false) {
                $(parent).attr("name", "");
            }

            if (question_checker >= 32) {
                $('#submit-button').prop('disabled', false);
                $('#submit-button').css('background-color', '#5b68f5');
            }
        });
        
        $('.exp_option').change(function () {
            $('#option').val($(this).val()); 
            var parent = $(this).parent().parent();
            var superParent = $(this).parent().parent().parent();
            var test3 = $(this).val();
            if (test3 > 0) {
                $(parent).attr("id", "answered");
                question_checker++;
                $(parent).hide(500);
                if (question_counter < 32) {
                    question_counter++;
                    $(superParent).find('.' + question_counter).show(500);
                }
            } else if (test3 <= 0) {
                $(parent).attr("name", "");
            }

            if (question_checker >= 32) {
                $('#submit-button').prop('disabled', false);
                $('#submit-button').css('background-color', '#5b68f5');
            }
        });
        
        $('.button_next').click(function () {
            var parent = $(this).parent();
            $(parent).find('.' + question_counter).hide(500);
            question_counter++;
            $(parent).find('.' + question_counter).show(500);
        });
        
        $('.button_back').click(function () {
            var parent = $(this).parent();
            $(parent).find('.' + question_counter).hide(500);
            question_counter--;
            $(parent).find('.' + question_counter).show(500);
        });
    }

    // ============================================================== 
    // Extension
    // ============================================================== 

    if($('.p_name').length){
        var name = localStorage.getItem("project_name");
        $('.p_name').val(name);
    }
    
    if($('.p_code').length){
        var code = localStorage.getItem("project_code");
        $('.p_code').val(code);
    }
    
    if($('#nextChard').length){
        var ChartCounter = 0;
        $('.chart_container_1').show();
        $('.chart_container_2').hide();
        $('.chart_container_3').hide();
        $('.chart_container_4').hide();
        $('.chart_container_5').hide();
        $('.chart_container_6').hide();
        $('#nextChard').click(function () {
            if (ChartCounter >= 6) {
                ChartCounter = 1;
            } else {
                ChartCounter++;
            }
            switch (ChartCounter) {
                case 1:
                    $('.chart_container_1').slideDown(500);
                    $('.chart_container_2').slideUp(500);
                    $('.chart_container_3').slideUp(500);
                    $('.chart_container_4').slideUp(500);
                    $('.chart_container_5').slideUp(500);
                    $('.chart_container_6').slideUp(500);
                    break;
                case 2:
                    $('.chart_container_1').slideUp(500);
                    $('.chart_container_2').slideDown(500);
                    $('.chart_container_3').slideUp(500);
                    $('.chart_container_4').slideUp(500);
                    $('.chart_container_5').slideUp(500);
                    $('.chart_container_6').slideUp(500);
                    break;
                case 3:
                    $('.chart_container_1').slideUp(500);
                    $('.chart_container_2').slideUp(500);
                    $('.chart_container_3').slideDown(500);
                    $('.chart_container_4').slideUp(500);
                    $('.chart_container_5').slideUp(500);
                    $('.chart_container_6').slideUp(500);
                    break;
                case 4:
                    $('.chart_container_1').slideUp(500);
                    $('.chart_container_2').slideUp(500);
                    $('.chart_container_3').slideUp(500);
                    $('.chart_container_4').slideDown(500);
                    $('.chart_container_5').slideUp(500);
                    $('.chart_container_6').slideUp(500);
                    break;
                case 5:
                    $('.chart_container_1').slideUp(500);
                    $('.chart_container_2').slideUp(500);
                    $('.chart_container_3').slideUp(500);
                    $('.chart_container_4').slideUp(500);
                    $('.chart_container_5').slideDown(500);
                    $('.chart_container_6').slideUp(500);
                    break;
                case 6:
                    $('.chart_container_1').slideUp(500);
                    $('.chart_container_2').slideUp(500);
                    $('.chart_container_3').slideUp(500);
                    $('.chart_container_4').slideUp(500);
                    $('.chart_container_5').slideUp(500);
                    $('.chart_container_6').slideDown(500);
                    break;
                default:
                    break;
            } 
        });
    }
    
    if ($('.tobe_hire').length) {
        var name = [];
//        var trust = [];
//        var commit = [];
//        var inte = [];
//        var track = [];
//        var exp = [];
        var counter = 0;
        counter = parseFloat($('#counter').val());
        var total = [];
        
        var trust = {
            one: (parseFloat(localStorage.getItem("trust_data_1")) / counter).toFixed(2),
            two: (parseFloat(localStorage.getItem("commit_data_1")) / counter).toFixed(2),
            three: (parseFloat(localStorage.getItem("inte_data_1")) / counter).toFixed(2),
            four: (parseFloat(localStorage.getItem("track_data_1")) / counter).toFixed(2),
            five: (parseFloat(localStorage.getItem("exp_data_1")) / counter).toFixed(2),
            six: (parseFloat(localStorage.getItem("extend6_data_1")) / counter).toFixed(2),
            seven: (parseFloat(localStorage.getItem("extend7_data_1")) / counter).toFixed(2),
            eight: (parseFloat(localStorage.getItem("extend8_data_1")) / counter).toFixed(2),
            nine: (parseFloat(localStorage.getItem("extend9_data_1")) / counter).toFixed(2),
            ten: (parseFloat(localStorage.getItem("extend0_data_1")) / counter).toFixed(2)
        }; 
        
        var commit = {
            one: (parseFloat(localStorage.getItem("trust_data_2")) / counter).toFixed(2),
            two: (parseFloat(localStorage.getItem("commit_data_2")) / counter).toFixed(2),
            three: (parseFloat(localStorage.getItem("inte_data_2")) / counter).toFixed(2),
            four: (parseFloat(localStorage.getItem("track_data_2")) / counter).toFixed(2),
            five: (parseFloat(localStorage.getItem("exp_data_2")) / counter).toFixed(2),
            six: (parseFloat(localStorage.getItem("extend6_data_2")) / counter).toFixed(2),
            seven: (parseFloat(localStorage.getItem("extend7_data_2")) / counter).toFixed(2),
            eight: (parseFloat(localStorage.getItem("extend8_data_2")) / counter).toFixed(2),
            nine: (parseFloat(localStorage.getItem("extend9_data_2")) / counter).toFixed(2),
            ten: (parseFloat(localStorage.getItem("extend0_data_2")) / counter).toFixed(2)
        };
        
        var track = {
            one: (parseFloat(localStorage.getItem("trust_data_3")) / counter).toFixed(2),
            two: (parseFloat(localStorage.getItem("commit_data_3")) / counter).toFixed(2),
            three: (parseFloat(localStorage.getItem("inte_data_3")) / counter).toFixed(2),
            four: (parseFloat(localStorage.getItem("track_data_3")) / counter).toFixed(2),
            five: (parseFloat(localStorage.getItem("exp_data_3")) / counter).toFixed(2),
            six: (parseFloat(localStorage.getItem("extend6_data_3")) / counter).toFixed(2),
            seven: (parseFloat(localStorage.getItem("extend7_data_3")) / counter).toFixed(2),
            eight: (parseFloat(localStorage.getItem("extend8_data_3")) / counter).toFixed(2),
            nine: (parseFloat(localStorage.getItem("extend9_data_3")) / counter).toFixed(2),
            ten: (parseFloat(localStorage.getItem("extend0_data_3")) / counter).toFixed(2)
        };
        
        var inte = {
            one: (parseFloat(localStorage.getItem("trust_data_4")) / counter).toFixed(2),
            two: (parseFloat(localStorage.getItem("commit_data_4")) / counter).toFixed(2),
            three: (parseFloat(localStorage.getItem("inte_data_4")) / counter).toFixed(2),
            four: (parseFloat(localStorage.getItem("track_data_4")) / counter).toFixed(2),
            five: (parseFloat(localStorage.getItem("exp_data_4")) / counter).toFixed(2),
            six: (parseFloat(localStorage.getItem("extend6_data_4")) / counter).toFixed(2),
            seven: (parseFloat(localStorage.getItem("extend7_data_4")) / counter).toFixed(2),
            eight: (parseFloat(localStorage.getItem("extend8_data_4")) / counter).toFixed(2),
            nine: (parseFloat(localStorage.getItem("extend9_data_4")) / counter).toFixed(2),
            ten: (parseFloat(localStorage.getItem("extend0_data_4")) / counter).toFixed(2)
        };
        
        var exp = {
            one: (parseFloat(localStorage.getItem("trust_data_5")) / counter).toFixed(2),
            two: (parseFloat(localStorage.getItem("commit_data_5")) / counter).toFixed(2),
            three: (parseFloat(localStorage.getItem("inte_data_5")) / counter).toFixed(2),
            four: (parseFloat(localStorage.getItem("track_data_5")) / counter).toFixed(2),
            five: (parseFloat(localStorage.getItem("exp_data_5")) / counter).toFixed(2),
            six: (parseFloat(localStorage.getItem("extend6_data_5")) / counter).toFixed(2),
            seven: (parseFloat(localStorage.getItem("extend7_data_5")) / counter).toFixed(2),
            eight: (parseFloat(localStorage.getItem("extend8_data_5")) / counter).toFixed(2),
            nine: (parseFloat(localStorage.getItem("extend9_data_5")) / counter).toFixed(2),
            ten: (parseFloat(localStorage.getItem("extend0_data_5")) / counter).toFixed(2)
        };
        
        var conclusion = {
            one: parseFloat(trust.one + commit.one + inte.one + track.one + exp.one).toFixed(2),
            two: parseFloat(trust.two + commit.two + inte.two + track.two + exp.two).toFixed(2),
            three: parseFloat(trust.three + commit.three + inte.three + track.three + exp.three).toFixed(2),
            four: parseFloat(trust.four + commit.four + inte.four + track.four + exp.four).toFixed(2),
            five: parseFloat(trust.five + commit.five + inte.five + track.five + exp.five).toFixed(2),
            six: parseFloat(trust.six + commit.six + inte.six + track.six + exp.six).toFixed(2),
            seven: parseFloat(trust.seven + commit.seven + inte.seven + track.seven + exp.seven).toFixed(2),
            eight: parseFloat(trust.eight + commit.eight + inte.eight + track.eight + exp.eight).toFixed(2),
            nine: parseFloat(trust.nine + commit.nine + inte.nine + track.nine + exp.nine).toFixed(2),
            ten: parseFloat(trust.ten + commit.ten + inte.ten + track.ten + exp.ten).toFixed(2)
        };
        
//        var weight_trust = localStorage.getItem("trust");
//        var weight_commit = localStorage.getItem("commit");
//        var weight_inte = localStorage.getItem("inte");
//        var weight_track = localStorage.getItem("track");
//        var weight_exp = localStorage.getItem("exp");
//        console.log(weight_trust + "  " + weight_commit + "  " + weight_inte + "  " + weight_track + "  " + weight_exp);
        
//        var project_trust = $('#trust_data').val();
//        var project_commit = $('#commit_data').val();
//        var project_inte = $('#inte_data').val();
//        var project_track = $('#track_data').val();
//        var project_exp = $('#exp_data').val();
//        console.log("Project: " + project_trust + "  " + project_commit + "  " + project_inte + "  " + project_track + "  " + project_exp);
        
        var target = $('.tobe_hire');
        for(var i = 0; i < target.length; i++){
            name[i] = $(target[i]).find('#comp_hire').val();
//            var trust_val = 0, commit_val = 0, inte_val = 0, track_val = 0, exp_val = 0;
            
//            trust_val = parseFloat($(target[i]).find('#trust_hidden').val());
//            commit_val = parseFloat($(target[i]).find('#commit_hidden').val());
//            inte_val = parseFloat($(target[i]).find('#inte_hidden').val());
//            track_val = parseFloat($(target[i]).find('#track_hidden').val());
//            exp_val = parseFloat($(target[i]).find('#exp_hidden').val());
            
//            console.log(trust_val + "  " + commit_val + "  " + inte_val + "  " + track_val + "  " + exp_val);
            
//            trust[i] = ((trust_val / 8) * 100) / 5;
//            commit[i] = ((commit_val / 26) * 100) / 5;
//            inte[i] = ((inte_val / 7) * 100) / 5;
//            track[i] = ((track_val / 12) * 100) / 5;
//            exp[i] = ((exp_val / 10) * 100) / 5;
            
//            console.log(trust[i].toFixed(0) + "  " + commit[i].toFixed(0) + "  " + inte[i].toFixed(0) + "  " + track[i].toFixed(0) + "  " + exp[i].toFixed(0));
            
//            total[i] =  (trust[i] + (weight_trust / 100)) + 
//                        (commit[i] + (weight_commit / 100)) + 
//                        (inte[i] + (weight_inte / 100)) + 
//                        (track[i] + (weight_track / 100)) + 
//                        (exp[i] + (weight_exp / 100));
//                
//            total[i] = parseFloat(total[i]).toFixed(2);
        }
        
        //trust
        switch (target.length) {
                case 1:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 2:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 3:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 4:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [parseFloat(trust.four)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 5:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [parseFloat(trust.four)],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [parseFloat(trust.five)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 6:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [parseFloat(trust.four)],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [parseFloat(trust.five)],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [parseFloat(trust.six)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 7:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [parseFloat(trust.four)],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [parseFloat(trust.five)],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [parseFloat(trust.six)],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [parseFloat(trust.seven)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 8:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [parseFloat(trust.four)],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [parseFloat(trust.five)],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [trust.six],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [parseFloat(trust.seven)],
                                            borderWidth: 2
                                        }, {
                                            label: name[7],
                                            backgroundColor: "rgba(102, 0, 204,0.5)",
                                            borderColor: "rgba(64, 0, 128,0.7)",
                                            data: [parseFloat(trust.eight)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 9:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [parseFloat(trust.four)],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [parseFloat(trust.five)],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [trust.six],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [parseFloat(trust.seven)],
                                            borderWidth: 2
                                        }, {
                                            label: name[7],
                                            backgroundColor: "rgba(102, 0, 204,0.5)",
                                            borderColor: "rgba(64, 0, 128,0.7)",
                                            data: [parseFloat(trust.eight)],
                                            borderWidth: 2
                                        }, {
                                            label: name[8],
                                            backgroundColor: "rgba(255, 0, 85,0.5)",
                                            borderColor: "rgba(153, 0, 51,0.7)",
                                            data: [parseFloat(trust.nine)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                case 10:
                    if ($('.chart_container_1').length) {
                        $('.chart_container_1').append('<canvas id="chart_bar"></canvas>');
                        if ($('#chart_bar').length) {
                            var ctx = document.getElementById("chart_bar").getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: ["Trustworthiness"],
                                    datasets: [{
                                            label: name[0],
                                            backgroundColor: "rgba(255, 0, 0,0.5)",
                                            borderColor: "rgba(204, 0, 0,0.7)",
                                            data: [parseFloat(trust.one)],
                                            borderWidth: 2
                                        }, {
                                            label: name[1],
                                            backgroundColor: "rgba(51, 204, 51,0.5)",
                                            borderColor: "rgba(20, 82, 20,0.7)",
                                            data: [parseFloat(trust.two)],
                                            borderWidth: 2
                                        }, {
                                            label: name[2],
                                            backgroundColor: "rgba(255, 255, 0,0.5)",
                                            borderColor: "rgba(179, 179, 0,0.7)",
                                            data: [parseFloat(trust.three)],
                                            borderWidth: 2
                                        }, {
                                            label: name[3],
                                            backgroundColor: "rgba(255, 153, 0,0.5)",
                                            borderColor: "rgba(179, 107, 0,0.7)",
                                            data: [parseFloat(trust.four)],
                                            borderWidth: 2
                                        }, {
                                            label: name[4],
                                            backgroundColor: "rgba(204, 0, 204,0.5)",
                                            borderColor: "rgba(102, 0, 102,0.7)",
                                            data: [parseFloat(trust.five)],
                                            borderWidth: 2
                                        }, {
                                            label: name[5],
                                            backgroundColor: "rgba(255, 102, 0,0.5)",
                                            borderColor: "rgba(179, 71, 0,0.7)",
                                            data: [parseFloat(trust.six)],
                                            borderWidth: 2
                                        }, {
                                            label: name[6],
                                            backgroundColor: "rgba(0, 255, 255,0.5)",
                                            borderColor: "rgba(0, 179, 179,0.7)",
                                            data: [parseFloat(trust.seven)],
                                            borderWidth: 2
                                        }, {
                                            label: name[7],
                                            backgroundColor: "rgba(102, 0, 204,0.5)",
                                            borderColor: "rgba(64, 0, 128,0.7)",
                                            data: [parseFloat(trust.eight)],
                                            borderWidth: 2
                                        }, {
                                            label: name[8],
                                            backgroundColor: "rgba(255, 0, 85,0.5)",
                                            borderColor: "rgba(153, 0, 51,0.7)",
                                            data: [parseFloat(trust.nine)],
                                            borderWidth: 2
                                        }, {
                                            label: name[9],
                                            backgroundColor: "rgba(0, 255, 0,0.5)",
                                            borderColor: "rgba(0, 77, 0,0.7)",
                                            data: [parseFloat(trust.ten)],
                                            borderWidth: 2
                                        },{
                                            label: "",
                                            data: [0],
                                            borderWidth: 0
                                        }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{

                                            }]
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',

                                        labels: {
                                            fontColor: '#71748d',
                                            fontFamily: 'Circular Std Book',
                                            fontSize: 14,
                                        }
                                    },

                                    scales: {
                                        xAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }],
                                        yAxes: [{
                                                ticks: {
                                                    fontSize: 14,
                                                    fontFamily: 'Circular Std Book',
                                                    fontColor: '#71748d',
                                                }
                                            }]
                                    }
                                }
                            });
                        }
                    }
                    localStorage.clear();
                    break;
                default:
                    break;
            }
            
        //commit
        switch(target.length){
            case 1:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 2:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    },{
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 3:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 4:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [commit.four],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 5:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [commit.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [commit.five],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 6:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [commit.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [commit.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [commit.six],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 7:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [commit.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [commit.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [commit.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [commit.seven],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 8:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [commit.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [commit.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [commit.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [commit.seven],
                                        borderWidth: 2
                                    }, {
                                        label: name[7],
                                        backgroundColor: "rgba(102, 0, 204,0.5)",
                                        borderColor: "rgba(64, 0, 128,0.7)",
                                        data: [commit.eight],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 9:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [commit.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [commit.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [commit.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [commit.seven],
                                        borderWidth: 2
                                    }, {
                                        label: name[7],
                                        backgroundColor: "rgba(102, 0, 204,0.5)",
                                        borderColor: "rgba(64, 0, 128,0.7)",
                                        data: [commit.eight],
                                        borderWidth: 2
                                    }, {
                                        label: name[8],
                                        backgroundColor: "rgba(255, 0, 85,0.5)",
                                        borderColor: "rgba(153, 0, 51,0.7)",
                                        data: [commit.nine],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 10:
                if ($('.chart_container_2').length) {
                    $('.chart_container_2').append('<canvas id="chart_bar_1"></canvas>');
                    if ($('#chart_bar_1').length) {
                        var ctx = document.getElementById("chart_bar_1").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Commitment"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [commit.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [commit.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [commit.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [commit.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [commit.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [commit.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [commit.seven],
                                        borderWidth: 2
                                    }, {
                                        label: name[7],
                                        backgroundColor: "rgba(102, 0, 204,0.5)",
                                        borderColor: "rgba(64, 0, 128,0.7)",
                                        data: [commit.eight],
                                        borderWidth: 2
                                    }, {
                                        label: name[8],
                                        backgroundColor: "rgba(255, 0, 85,0.5)",
                                        borderColor: "rgba(153, 0, 51,0.7)",
                                        data: [commit.nine],
                                        borderWidth: 2
                                    }, {
                                        label: name[9],
                                        backgroundColor: "rgba(0, 255, 0,0.5)",
                                        borderColor: "rgba(0, 77, 0,0.7)",
                                        data: [commit.ten],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            default:
                break;
        }
        
        //inte
        switch(target.length){
           case 1:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 2:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   },{
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 3:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 4:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [inte.four],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 5:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [inte.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [inte.five],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 6:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [inte.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [inte.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [inte.six],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 7:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [inte.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [inte.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [inte.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [inte.seven],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 8:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [inte.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [inte.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [inte.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [inte.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [inte.eight],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 9:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [inte.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [inte.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [inte.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [inte.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [inte.eight],
                                       borderWidth: 2
                                   }, {
                                       label: name[8],
                                       backgroundColor: "rgba(255, 0, 85,0.5)",
                                       borderColor: "rgba(153, 0, 51,0.7)",
                                       data: [inte.nine],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 10:
               if ($('.chart_container_3').length) {
                   $('.chart_container_3').append('<canvas id="chart_bar_2"></canvas>');
                   if ($('#chart_bar_2').length) {
                       var ctx = document.getElementById("chart_bar_2").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Integrity"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [inte.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [inte.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [inte.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [inte.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [inte.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [inte.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [inte.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [inte.eight],
                                       borderWidth: 2
                                   }, {
                                       label: name[8],
                                       backgroundColor: "rgba(255, 0, 85,0.5)",
                                       borderColor: "rgba(153, 0, 51,0.7)",
                                       data: [inte.nine],
                                       borderWidth: 2
                                   }, {
                                       label: name[9],
                                       backgroundColor: "rgba(0, 255, 0,0.5)",
                                       borderColor: "rgba(0, 77, 0,0.7)",
                                       data: [inte.ten],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           default:
               break;
       }
       
        //track
        switch(target.length){
           case 1:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 2:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   },{
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 3:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 4:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [track.four],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 5:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [track.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [track.five],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 6:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [track.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [track.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [track.six],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 7:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [track.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [track.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [track.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [track.seven],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 8:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [track.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [track.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [track.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [track.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [track.eight],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 9:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [track.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [track.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [track.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [track.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [track.eight],
                                       borderWidth: 2
                                   }, {
                                       label: name[8],
                                       backgroundColor: "rgba(255, 0, 85,0.5)",
                                       borderColor: "rgba(153, 0, 51,0.7)",
                                       data: [track.nine],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 10:
               if ($('.chart_container_4').length) {
                   $('.chart_container_4').append('<canvas id="chart_bar_3"></canvas>');
                   if ($('#chart_bar_3').length) {
                       var ctx = document.getElementById("chart_bar_3").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Track Record"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [track.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [track.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [track.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [track.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [track.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [track.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [track.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [track.eight],
                                       borderWidth: 2
                                   }, {
                                       label: name[8],
                                       backgroundColor: "rgba(255, 0, 85,0.5)",
                                       borderColor: "rgba(153, 0, 51,0.7)",
                                       data: [track.nine],
                                       borderWidth: 2
                                   }, {
                                       label: name[9],
                                       backgroundColor: "rgba(0, 255, 0,0.5)",
                                       borderColor: "rgba(0, 77, 0,0.7)",
                                       data: [track.ten],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           default:
               break;
       }
        
        //exp
        switch(target.length){
           case 1:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 2:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   },{
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 3:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 4:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [exp.four],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 5:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [exp.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [exp.five],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 6:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [exp.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [exp.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [exp.six],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 7:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [exp.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [exp.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [exp.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [exp.seven],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 8:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [exp.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [exp.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [exp.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [exp.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [exp.eight],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 9:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [exp.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [exp.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [exp.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [exp.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [exp.eight],
                                       borderWidth: 2
                                   }, {
                                       label: name[8],
                                       backgroundColor: "rgba(255, 0, 85,0.5)",
                                       borderColor: "rgba(153, 0, 51,0.7)",
                                       data: [exp.nine],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           case 10:
               if ($('.chart_container_5').length) {
                   $('.chart_container_5').append('<canvas id="chart_bar_4"></canvas>');
                   if ($('#chart_bar_4').length) {
                       var ctx = document.getElementById("chart_bar_4").getContext('2d');
                       var myChart = new Chart(ctx, {
                           type: 'bar',
                           data: {
                               labels: ["Experience"],
                               datasets: [{
                                       label: name[0],
                                       backgroundColor: "rgba(255, 0, 0,0.5)",
                                       borderColor: "rgba(204, 0, 0,0.7)",
                                       data: [exp.one],
                                       borderWidth: 2
                                   }, {
                                       label: name[1],
                                       backgroundColor: "rgba(51, 204, 51,0.5)",
                                       borderColor: "rgba(20, 82, 20,0.7)",
                                       data: [exp.two],
                                       borderWidth: 2
                                   }, {
                                       label: name[2],
                                       backgroundColor: "rgba(255, 255, 0,0.5)",
                                       borderColor: "rgba(179, 179, 0,0.7)",
                                       data: [exp.three],
                                       borderWidth: 2
                                   }, {
                                       label: name[3],
                                       backgroundColor: "rgba(255, 153, 0,0.5)",
                                       borderColor: "rgba(179, 107, 0,0.7)",
                                       data: [exp.four],
                                       borderWidth: 2
                                   }, {
                                       label: name[4],
                                       backgroundColor: "rgba(204, 0, 204,0.5)",
                                       borderColor: "rgba(102, 0, 102,0.7)",
                                       data: [exp.five],
                                       borderWidth: 2
                                   }, {
                                       label: name[5],
                                       backgroundColor: "rgba(255, 102, 0,0.5)",
                                       borderColor: "rgba(179, 71, 0,0.7)",
                                       data: [exp.six],
                                       borderWidth: 2
                                   }, {
                                       label: name[6],
                                       backgroundColor: "rgba(0, 255, 255,0.5)",
                                       borderColor: "rgba(0, 179, 179,0.7)",
                                       data: [exp.seven],
                                       borderWidth: 2
                                   }, {
                                       label: name[7],
                                       backgroundColor: "rgba(102, 0, 204,0.5)",
                                       borderColor: "rgba(64, 0, 128,0.7)",
                                       data: [exp.eight],
                                       borderWidth: 2
                                   }, {
                                       label: name[8],
                                       backgroundColor: "rgba(255, 0, 85,0.5)",
                                       borderColor: "rgba(153, 0, 51,0.7)",
                                       data: [exp.nine],
                                       borderWidth: 2
                                   }, {
                                       label: name[9],
                                       backgroundColor: "rgba(0, 255, 0,0.5)",
                                       borderColor: "rgba(0, 77, 0,0.7)",
                                       data: [exp.ten],
                                       borderWidth: 2
                                   }, {
                                       label: "",
                                       data: [0],
                                       borderWidth: 0
                                   }]
                           },
                           options: {
                               scales: {
                                   yAxes: [{

                                       }]
                               },
                               legend: {
                                   display: true,
                                   position: 'bottom',

                                   labels: {
                                       fontColor: '#71748d',
                                       fontFamily: 'Circular Std Book',
                                       fontSize: 14,
                                   }
                               },

                               scales: {
                                   xAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }],
                                   yAxes: [{
                                           ticks: {
                                               fontSize: 14,
                                               fontFamily: 'Circular Std Book',
                                               fontColor: '#71748d',
                                           }
                                       }]
                               }
                           }
                       });
                   }
               }
               localStorage.clear();
               break;
           default:
               break;
       }
       
        //conclusion
        switch (target.length) {
            case 1:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 2:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 3:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 4:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [conclusion.four],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 5:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [conclusion.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [conclusion.five],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 6:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [conclusion.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [conclusion.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [exp.six],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 7:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [conclusion.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [conclusion.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [conclusion.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [conclusion.seven],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 8:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [conclusion.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [conclusion.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [conclusion.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [conclusion.seven],
                                        borderWidth: 2
                                    }, {
                                        label: name[7],
                                        backgroundColor: "rgba(102, 0, 204,0.5)",
                                        borderColor: "rgba(64, 0, 128,0.7)",
                                        data: [conclusion.eight],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 9:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Conclusion"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [conclusion.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [conclusion.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [conclusion.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [conclusion.seven],
                                        borderWidth: 2
                                    }, {
                                        label: name[7],
                                        backgroundColor: "rgba(102, 0, 204,0.5)",
                                        borderColor: "rgba(64, 0, 128,0.7)",
                                        data: [conclusion.eight],
                                        borderWidth: 2
                                    }, {
                                        label: name[8],
                                        backgroundColor: "rgba(255, 0, 85,0.5)",
                                        borderColor: "rgba(153, 0, 51,0.7)",
                                        data: [conclusion.nine],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            case 10:
                if ($('.chart_container_6').length) {
                    $('.chart_container_6').append('<canvas id="chart_bar_5"></canvas>');
                    if ($('#chart_bar_4').length) {
                        var ctx = document.getElementById("chart_bar_5").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["Experience"],
                                datasets: [{
                                        label: name[0],
                                        backgroundColor: "rgba(255, 0, 0,0.5)",
                                        borderColor: "rgba(204, 0, 0,0.7)",
                                        data: [conclusion.one],
                                        borderWidth: 2
                                    }, {
                                        label: name[1],
                                        backgroundColor: "rgba(51, 204, 51,0.5)",
                                        borderColor: "rgba(20, 82, 20,0.7)",
                                        data: [conclusion.two],
                                        borderWidth: 2
                                    }, {
                                        label: name[2],
                                        backgroundColor: "rgba(255, 255, 0,0.5)",
                                        borderColor: "rgba(179, 179, 0,0.7)",
                                        data: [conclusion.three],
                                        borderWidth: 2
                                    }, {
                                        label: name[3],
                                        backgroundColor: "rgba(255, 153, 0,0.5)",
                                        borderColor: "rgba(179, 107, 0,0.7)",
                                        data: [conclusion.four],
                                        borderWidth: 2
                                    }, {
                                        label: name[4],
                                        backgroundColor: "rgba(204, 0, 204,0.5)",
                                        borderColor: "rgba(102, 0, 102,0.7)",
                                        data: [conclusion.five],
                                        borderWidth: 2
                                    }, {
                                        label: name[5],
                                        backgroundColor: "rgba(255, 102, 0,0.5)",
                                        borderColor: "rgba(179, 71, 0,0.7)",
                                        data: [conclusion.six],
                                        borderWidth: 2
                                    }, {
                                        label: name[6],
                                        backgroundColor: "rgba(0, 255, 255,0.5)",
                                        borderColor: "rgba(0, 179, 179,0.7)",
                                        data: [conclusion.seven],
                                        borderWidth: 2
                                    }, {
                                        label: name[7],
                                        backgroundColor: "rgba(102, 0, 204,0.5)",
                                        borderColor: "rgba(64, 0, 128,0.7)",
                                        data: [conclusion.eight],
                                        borderWidth: 2
                                    }, {
                                        label: name[8],
                                        backgroundColor: "rgba(255, 0, 85,0.5)",
                                        borderColor: "rgba(153, 0, 51,0.7)",
                                        data: [conclusion.nine],
                                        borderWidth: 2
                                    }, {
                                        label: name[9],
                                        backgroundColor: "rgba(0, 255, 0,0.5)",
                                        borderColor: "rgba(0, 77, 0,0.7)",
                                        data: [conclusion.ten],
                                        borderWidth: 2
                                    }, {
                                        label: "",
                                        data: [0],
                                        borderWidth: 0
                                    }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{

                                        }]
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }],
                                    yAxes: [{
                                            ticks: {
                                                fontSize: 14,
                                                fontFamily: 'Circular Std Book',
                                                fontColor: '#71748d',
                                            }
                                        }]
                                }
                            }
                        });
                    }
                }
                localStorage.clear();
                break;
            default:
                break;
        }
    }

    // ============================================================== 
    // Notification list
    // ============================================================== 
    if ($(".notification-list").length) {

        $('.notification-list').slimScroll({
            height: '250px'
        });

    }

    // ============================================================== 
    // Menu Slim Scroll List
    // ============================================================== 


    if ($(".menu-list").length) {
        $('.menu-list').slimScroll({

        });
    }

    // ============================================================== 
    // Sidebar scrollnavigation 
    // ============================================================== 

    if ($(".sidebar-nav-fixed a").length) {
        $('.sidebar-nav-fixed a')
            // Remove links that don't actually link to anything

            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top - 90
                        }, 1000, function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                };
                $('.sidebar-nav-fixed a').each(function() {
                    $(this).removeClass('active');
                })
                $(this).addClass('active');
            });

    }

    // ============================================================== 
    // tooltip
    // ============================================================== 
    if ($('[data-toggle="tooltip"]').length) {
            
            $('[data-toggle="tooltip"]').tooltip()

        }

     // ============================================================== 
    // popover
    // ============================================================== 
       if ($('[data-toggle="popover"]').length) {
            $('[data-toggle="popover"]').popover()

    }
     // ============================================================== 
    // Chat List Slim Scroll
    // ==============================================================  
        if ($('.chat-list').length) {
            $('.chat-list').slimScroll({
            color: 'false',
            width: '100%'


        });
    }
    // ============================================================== 
    // dropzone script
    // ============================================================== 

 //     if ($('.dz-clickable').length) {
 //            $(".dz-clickable").dropzone({ url: "/file/post" });
 // }

}); // AND OF JQUERY

// $(function() {
//     "use strict";


    

   // var monkeyList = new List('test-list', {
    //    valueNames: ['name']

     // });
  // var monkeyList = new List('test-list-2', {
    //    valueNames: ['name']

   // });



   
   

// });