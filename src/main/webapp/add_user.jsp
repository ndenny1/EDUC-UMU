<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="fill-height-lg">
<head>
  <%@ include file="assets/template/meta.jsp" %>
</head>
<%@ include file="assets/template/header.jsp" %>
<main role="main">
  <div class="container">
    <form>
    <div class="row">
        <h1>Add User</h1>
        <br/>
        <div class="col-lg-5">
            <div class="form-group">
                <label class="control-label" for="fullName">Full Name</label>
                <input id="fullName" class="form-control" placeholder="Full Name">
            </div>
            <div class="form-group">
                <label class="contol-label" for="email">Email Address</label>
                <input id="email" class="form-control" placeholder="Email">
            </div>
            <legend>Enter at least one of the following</legend>
            <div class="form-group">
                <label class="control-label" for="bceid">BCeID</label>
                <input id="bceid" class="form-control" placeholder="BCeID">
            </div>
            <div class="form-group">
                <label class="control-label" for="idir">IDIR</label>
                <input id="idir" class="form-control" placeholder="IDIR">
            </div>
            <div class="form-group">
                <label class="control-label" for="guid">GUID</label>
                <input id="guid" class="form-control" placeholder="GUID">
            </div>
        </div>
        <div class="col-lg-5">
            <legend>User Privileges</legend>
            <div class="form-group">
                <input id="admin" class="form-check-input" type="radio" value="admin" checked="">
                <label class="form-check-label" for="admin">EDW Administrator</label>
            </div>
            <div class="form-group">
                <input id="dev" class="form-check-input" type="radio" value="dev" checked="">
                <label class="form-check-label" for="dev">EDW Developer</label>
            </div>
            <div class="form-group">
                <input id="analyst" class="form-check-input" type="radio" value="analyst" checked="">
                <label class="form-check-label" for="analyst">EDW EAB Analyst</label>
            </div>
            <div class="form-group">
                <input id="general" class="form-check-input" type="radio" value="general" checked="">
                <label class="form-check-label" for="general">EDW General</label>
            </div>
            <div class="form-group">
                <input id="super" class="form-check-input" type="radio" value="super" checked="">
                <label class="form-check-label" for="super">EDW District Superintendent</label>
            </div>
            <div class="form-group">
                <input id="principle" class="form-check-input" type="radio" value="principle" checked="">
                <label class="form-check-label" for="principle">EDW School Principle</label>
            </div>
            <div class="form-group">
                <input id="dimstud" class="form-check-input" type="radio" value="dimstud" checked="">
                <label class="form-check-label" for="dimstud">EDW Dimstud</label>
            </div>
        </div>
    </div>
    <hr>
    <div class="row">
        <h1>Act As Privileges (Optional)</h1>
        <div class="form-group">
            <input id="gen_test" class="form-check-input" type="radio" value="gen_test" checked="">
            <label class="form-check-label" for="gen_test">EDW General Test</label>
        </div>
        <div class="form-group">
            <input id="analyst_test" class="form-check-input" type="radio" value="analyst_test" checked="">
            <label class="form-check-label" for="analyst_test">EDW EAB Analyst Test</label>
        </div>
        <div class="form-group">
            <input id="dev_test" class="form-check-input" type="radio" value="dev_test" checked="">
            <label class="form-check-label" for="dev_test">EDW Developer Test</label>
        </div>
        <div class="form-group">
            <input id="adm_test" class="form-check-input" type="radio" value="adm_test" checked="">
            <label class="form-check-label" for="adm_test">EDW Administrator Test</label>
        </div>
        <div class="form-group">
            <input id="super_test" class="form-check-input" type="radio" value="super_test" checked="">
            <label class="form-check-label" for="super_test">EDW District Superintendent Test</label>
        </div>
        <div class="form-group">
            <input id="principle_test" class="form-check-input" type="radio" value="principle_test" checked="">
            <label class="form-check-label" for="principle_test">EDW School Principle Test</label>
        </div>
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</main>
<%@ include file="assets/template/footer.jsp" %>
</html>