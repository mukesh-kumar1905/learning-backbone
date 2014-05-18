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
	var vent=_.extend({},Backbone.Events);
	//console.log(vent);
	App.Views.Appointment=Backbone.View.extend({
		initialize: function(){
			vent.on("appointment:show",this.show,this);
		},
		show: function(appointmentId){
			console.log('showing the appointment for id '+appointmentId );
			//we set up the model here from a collection or backend
			//lets say we have a collection then we do this.collection.get(id) and then render the required view
		},
	});
	App.Router=Backbone.Router.extend({
		routes:{
			'':'index',
			'show/:id':'show',
			'download/:id/*filename':'download',
			'appointment/:id':'appointment',
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
		appointment: function(appointmentId){
			vent.trigger('appointment:show',appointmentId);
		}
	});
	new App.Views.Appointment;
	new App.Router;
	Backbone.history.start();
	
});
