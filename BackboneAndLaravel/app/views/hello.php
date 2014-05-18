<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
	<style>
		@import url(//fonts.googleapis.com/css?family=Lato:700);

		body {
			margin:0;
			font-family:'Lato', sans-serif;
			text-align:center;
			color: #999;
		}

		.welcome {
			width: 300px;
			height: 200px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -150px;
			margin-top: -100px;
		}

		a, a:visited {
			text-decoration:none;
		}

		h1 {
			font-size: 32px;
			margin: 16px 0 0 0;
		}
	</style>
</head>
<body>
	<div class="welcome">
		<h1>ToDo</h1>
		<script type="text/javascript" src="//code.jquery.com/jquery.js"></script>
		<script type="text/javascript" src="//underscorejs.org/underscore.js"></script>
		<script type="text/javascript" src="//backbonejs.org/backbone.js"></script>
		<script type="text/javascript">
		$(function() {
			window.App={
				Models:{},
				Views:{},
				Collections:{}
			};
			App.Models.Task = Backbone.Model.extend({
				defaults:{
					title:'',
					completed:0
				},
				//WE CAN COMMENT URL ROOT IF WE FETCH THROUGH COLLECTION
				urlRoot: 'tasks'
			});
			App.Collections.Tasks = Backbone.Collection.extend({
				model:App.Models.Task,
				url:'/tasks',
				
			});
			App.Views.Task = Backbone.View.extend({
				tagName:'li',
				initialize: function(){
					//this.remove is like this.$el.remove
					this.model.on('destroy',this.remove,this);
				},
				render: function(){
					this.$el.html(this.model.get('title'));
					return this;
				},
			});
			App.Views.Tasks = Backbone.View.extend({
				tagName:'ul',
				initialize: function(){
					this.collection.on('add',this.addOne,this);
				},
				render: function(){
					this.$el.empty();
					this.collection.each(this.addOne,this);
					return this;
				},
				addOne: function(task){
					var taskView = new App.Views.Task({model:task});
					this.$el.append(taskView.render().el);
				},
			});
			window.tasks=new App.Collections.Tasks;
			var tasksView=new App.Views.Tasks({collection:tasks})
			$('#tasks').html(tasksView.render().el);
			tasks.fetch();
		});
		</script>
	</div>
	<div id="tasks"></div>
</body>
</html>
