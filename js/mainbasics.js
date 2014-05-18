$(function() {
	window.App={
		Models:{},
		Collections:{},
		Views:{}
	};
	var template=function(id) {
	return _.template($("#"+id).html().toString());
	};

	//Person Model
	App.Models.Person= Backbone.Model.extend({
		defaults: {
			name: 'Mukesh',
			age:21,
			occupation:'developer'
		},

		validate:function(attrs) {
			if(attrs.age < 0){
				return 'Age must be positive';
			}
			if(!attrs.name){
				return 'Name required';
			}
		},

		work:function() {
			return this.get('name') + " is working";
		}

	});

	//A list of people
	App.Collections.People=Backbone.Collection.extend({
		model:App.Models.Person
	});

	//The view for a Person
	App.Views.Person = Backbone.View.extend({
		tagName: 'li',
		template:template("personTemplate"),
		//for 2nd way
		//template:'#personTemplate',
		/*
		initialize:function() {
			//console.log(this.model);
			this.render();
		},
		*/
		render:function() {

			//anti-pattern
			//this.$el.html(this.model.get('name')+' ('+this.model.get('age')+') -'+this.model.get('occupation'));
			//1 way
			this.$el.html(this.template(this.model.toJSON()));
			//2nd way
			//var template=_.template($(this.template).html().toString());
			//this.$el.html(template(this.model.toJSON()));
			return this;
		}
	});

	//The view for all people
	App.Views.People=Backbone.View.extend({
		tagName:'ul',
		initialize:function() {
			//console.log(this.collection);
		},
		render:function() {
			//filter through all items in a collection
			//each method is passed an anonymous function hence this=window ,but if we pass 2nd argument that is this
			this.collection.each(function (person) {
				//for each,create a new PersonView
				var personView = new App.Views.Person({ model:person });
				//append to root element
				this.$el.append(personView.render().el);
				
			},this);
			return this;
		}
	});


	var person = new App.Models.Person();
	var personView = new App.Views.Person({model : person});

	//bleh it gets messy quickly
	var person1 = new  App.Models.Person({name:'Sample name',age:22 });
	var personView1 = new App.Views.Person({model : person1});

	/*
	var peopleCollection = new PeopleCollection();
	peopleCollection.add(person);
	peopleCollection.add(person1);
	console.log(peopleCollection);
	*/
	var peopleCollection = new App.Collections.People([
		{
			name:'Rohit',
			age:27
		},
		{
			name:'John Doe',
			age:28,
			occupation:'Web Designer'
		},
		{
			name:'Random name'
		}
		]);
	//console.log(peopleCollection);

	var peopleView = new App.Views.People({collection: peopleCollection});
	$(document.body).append(peopleView.render().el)
});
