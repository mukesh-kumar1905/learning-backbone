$(function() {
	window.App={
		Models:{},
		Collections:{},
		Views:{},
		Router:{}
	};
	var template=function(id) {
	return _.template($("#"+id).html().toString());
	};
	App.Router=Backbone.Router.extend({
		routes:{
			'':'index',
			'show/:id':'show',
			'download/:id/*filename':'download',
			'*other':'default'
		},
		index: function(){
			console.log('Hi from the index page');
		},
		show: function(id){
			console.log('show for id of '+id);
		},
		download: function(id,filename){
			console.log('download for id of '+id+" with filename "+filename);
		},
		default: function(other){
			console.log('other '+other);
		},
	});
	new App.Router;
	Backbone.history.start();
});
