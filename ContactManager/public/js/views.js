//global app view
App.Views.App = Backbone.View.extend({
	initialize: function() {
		//console.log(this.collection.toJSON());
		var addContactView=new App.Views.AddContact({collection:App.contacts});
		var allContactsView=new App.Views.Contacts({collection:App.contacts}).render();
		$("#allContacts").append(allContactsView.el);
	}
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
	},
});

//single contact view
App.Views.Contact = Backbone.View.extend({
	tagName:'tr',
	template:template("allContactsTemplate"),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

//all contacts view
App.Views.Contacts = Backbone.View.extend({
	tagName:'tbody',
	initialize: function(){
		this.collection.on('sync',this.addOne,this);
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