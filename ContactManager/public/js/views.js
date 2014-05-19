//global app view
App.Views.App = Backbone.View.extend({
	initialize: function() {
		//console.log(this.collection.toJSON());
		var addContactView=new App.Views.AddContact({collection:App.contacts});
		var allContactsView=new App.Views.Contacts({collection:App.contacts}).render();
		$("#allContacts").append(allContactsView.el);

		vent.on('contact:edit',this.editContact,this);
	},
	editContact: function(id){
		var editContactView = new App.Views.EditContact({model:App.contacts.get(id)});
		$("#editForm").html(editContactView.render().el);
	},
});

//add contact view
App.Views.AddContact = Backbone.View.extend({
	el:"#addContact",
	events:{
		'submit':'addContact'
	},
	addContact: function(e){
		e.preventDefault();
		// first_name:this.$('#first_name') is same as this.$el.find('#first_name')
		this.collection.create({
			first_name:this.$('#first_name').val(),
			last_name:this.$('#last_name').val(),
			email:this.$('#email').val(),
			description:this.$('#description').val()
		},{wait:true});
		this.clearForm();
	},
	clearForm: function(){
		this.$('#first_name').val("");
		this.$('#last_name').val("");
		this.$('#email').val("");
		this.$('#description').val("");
		$("#addContact").fadeOut();
		$("#show").fadeIn();
	},
});

//add contact view
App.Views.EditContact = Backbone.View.extend({
	template:template('editContact'),
	initialize: function(){
		this.render();
	},
	render: function(){
		var html = this.template(this.model.toJSON());
		this.$el.html(html);
		return this;
	},
	events:{
		'submit form':'submit',
		'click button.cancel':'cancel'
	},
	submit: function(e){
		e.preventDefault();
		console.log();
		this.model.save({
			first_name:this.$("form").find('#edit_first_name').val(),
			last_name:this.$("form").find('#edit_last_name').val(),
			email:this.$("form").find('#edit_email').val(),
			description:this.$("form").find('#edit_description').val()
		});
		this.remove();
	},
	cancel: function(){
		this.remove();
	}
});

//single contact view
App.Views.Contact = Backbone.View.extend({
	tagName:'tr',
	template:template("allContactsTemplate"),
	initialize: function(){
		this.model.on('destroy',this.unrender,this);
		this.model.on('change',this.render,this);
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	events:{
		'click a.delete':'deleteContact'
	},
	deleteContact: function(e){
		
		this.model.destroy();
	},
	unrender: function(){
		this.remove();//==this.$el.remove()
	},
	editContact: function(e){
	},
});

//all contacts view
App.Views.Contacts = Backbone.View.extend({
	tagName:'tbody',
	initialize: function(){
		this.collection.on('add',this.addOne,this);
	},
	render: function(){
		this.collection.each(this.addOne,this);
		return this;
	},
	addOne: function(contact){
		var contactView = new App.Views.Contact({model:contact});
		this.$el.append(contactView.render().el);
	},
});