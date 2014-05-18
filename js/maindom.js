//minimal task tool
$(function() {
	window.App={
		Models:{},
		Collections:{},
		Views:{}
	};
	var template=function(id) {
	return _.template($("#"+id).html().toString());
	};
	App.Models.Task = Backbone.Model.extend({
		validate:function  (args) {
			if(!$.trim(args.title))
				return 'A task requires a valid title';
		}
	});
	App.Views.Task =Backbone.View.extend({
		tagName: 'li',
		template:template('taskTemplate'),
		initialize: function(){
			//one way to bind context
			//_.bindAll(this,'editTask','render');
			//change:title instead of change will trigger only for change in title
			this.model.on('change',this.render,this);
			this.model.on('destroy',this.remove,this);
		},
		events:{
			'click .edit':'editTask',
			'click .delete':'destroyTask'
		},
		editTask: function(){
			var newTask=prompt('What to do you want to change the task to?',this.model.get('title'));
			if($.trim(newTask))
				this.model.set('title',newTask);
		},
		destroyTask: function(){
			this.model.destroy();
		},
		render: function() {
			var template=this.template(this.model.toJSON());
			this.$el.html(template);
			return this;
		},
		remove: function(){
			this.$el.remove();
		}
	});
	App.Collections.Tasks = Backbone.Collection.extend({
		model:App.Models.Task
	});
	App.Views.Tasks = Backbone.View.extend({
		tagName:'ul',
		initialize: function(){
			this.collection.on('add',this.addOne,this);			
		},
		render: function() {
			this.collection.each(this.addOne,this);
			return this;
		},
		addOne: function(task) {
			//creating a new child view
			var taskView =new App.Views.Task({model: task});
			//apppend to root element
			this.$el.append(taskView.render().el);
		}
	});
	App.Views.AddTasks = Backbone.View.extend({
		el:"#addTask",
		initialize: function(){
			//console.log(this.el.innerHTML);
		},
		events:{
			'submit':'submit'
		},
		submit: function(e){
			e.preventDefault();
			//console.log('submitted');
			var newTaskTitle=$(e.currentTarget).find("input[type=text]").val();
			var task=new App.Models.Task({title:newTaskTitle});
			this.collection.add(task);
		}
	});
	var tasks = new App.Collections.Tasks([
	{
		title:'Go to the store',
		priority:4
	},
	{
		title:'Go to the mall',
		priority:5
	},
	{
		title:'Go to the work',
		priority:2
	}
	]);
	var tasksView = new App.Views.Tasks({collection:tasks});
	//console.log(tasksView.render().el);
	$('.tasks').html(tasksView.render().el);
	var addTaskView=new App.Views.AddTasks({collection:tasks});
});