App.Router=Backbone.Router.extend({
	routes:{
		'':'index',
		'contacts/:id/edit':'edit'
	},
	index:function() {
		//console.log('index');
	},
	edit: function(id){
		vent.trigger('contact:edit',id);
	},
});