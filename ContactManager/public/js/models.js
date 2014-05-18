App.Models.Contact = Backbone.Model.extend({
	validate:function(attrs) {
		if(!attrs.first_name || !attrs.last_name ||!attrs.email){
			return 'Required field missing';
		}
	}
});