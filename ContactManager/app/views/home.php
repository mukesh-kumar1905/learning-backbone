<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Laravel PHP Framework</title>
	<style>
		@import url(//fonts.googleapis.com/css?family=Lato:700);

		body {
			margin:0;
			font-family:'Lato', sans-serif;
			text-align:center;
			color: #999;
		}

		a, a:visited {
			text-decoration:none;
		}

		h1 {
			font-size: 32px;
			margin: 16px 0 0 0;
		}

		#addContact {
			display:none;
		}
		#allContacts thead{
		
			color: #000;
			font-weight: bold;
		}
		table {
			margin-top: 2em;
		}
	</style>
</head>
<body>
	<h1>Contacts</h1>
	<button id="show">Add New Contact</button>
	<form id="addContact">
		<div>
			<label for="first_name">First Name</label>
			<input type="text" placeholder="First Name" name="first_name" id="first_name">
		</div>
		<div>
			<label for="last_name">Last Name</label>
			<input type="text" placeholder="Last Name" name="last_name" id="last_name">
		</div>
		<div>
			<label for="email">Email</label>
			<input type="text" placeholder="Email" name="email" id="email">
		</div>
		<div>
			<label for="description">Description</label>
			<textarea placeholder="Description" name="description" id="description"></textarea>
		</div>
		<input type="submit" value="Add Contact">
	</form>
	<div>
		<table id="allContacts" align="center">
			<thead>
				<tr>
					<td>First Name</td>
					<td>Last Name</td>
					<td>Email</td>
					<td>Description</td>
					<td>Options</td>
			</thead>
		</table>
	</div>
	<div id="editForm">	
	</div>
	<script type="text/template" id="editContact">
		<h1>Edit Contact:<%= first_name%>&nbsp;&nbsp; <%= last_name%></h1>
		<form>
		<div>
			<label for="first_name">First Name</label>
			<input type="text" placeholder="First Name" name="first_name" id="edit_first_name" value="<%= first_name%>">
		</div>
		<div>
			<label for="last_name">Last Name</label>
			<input type="text" placeholder="Last Name" name="last_name" id="edit_last_name" value="<%= last_name%>">
		</div>
		<div>
			<label for="email">Email</label>
			<input type="text" placeholder="Email" name="email" id="edit_email" value="<%= email%>">
		</div>
		<div>
			<label for="description">Description</label>
			<textarea placeholder="Description" name="description" id="edit_description" ><%= description%></textarea>
		</div>
		<input type="submit" value="Edit Contact">
		<button class="cancel" type="button">Cancel</button>
	</form>
	</script>
	<script id="allContactsTemplate" type="text/template">
	<td><%= first_name %></td>
	<td><%= last_name %></td>
	<td><%= email %></td>
	<td><%= description %></td>
	<td><a href ="#contacts/<%= id%>/edit" class="edit">Edit </a>&nbsp;&nbsp;<a href ="#contacts/<%= id%>" class="delete">Delete</a></td>
	</script>
	<script type="text/javascript" src="//code.jquery.com/jquery.js"></script>
	<script type="text/javascript" src="//underscorejs.org/underscore.js"></script>
	<script type="text/javascript" src="//backbonejs.org/backbone.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/models.js"></script>
	<script type="text/javascript" src="js/views.js"></script>
	<script type="text/javascript" src="js/collections.js"></script>
	<script type="text/javascript" src="js/router.js"></script>
	<script type="text/javascript">
	$(function() {
		$("#show").click(function() {
			$("#addContact").fadeIn();
			$("#show").fadeOut();
		});
	});
	new App.Router;
	Backbone.history.start();
	App.contacts=new App.Collections.Contacts;
	App.contacts.fetch().then(function() {
		new App.Views.App({collection:App.contacts});
	});
	</script>
</body>
</html>
