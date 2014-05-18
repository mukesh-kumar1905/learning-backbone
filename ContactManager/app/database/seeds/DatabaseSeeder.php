<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		 $this->call('ContactTableSeeder');
	}

}
class ContactTableSeeder extends Seeder {

    public function run()
    {
    	$arr= array(
    		array(
    			'first_name' => 'Mukesh' ,
    			'last_name' =>'Kumar',
    			'description' => 'Web Developer',
    			'email' =>'mukeshkmar1905@gmail.com'),
    		array(
    			'first_name' => 'Nitant' ,
    			'last_name' =>'Kumar',
    			'email' => 'test@test.com'),
    		array(
    			'first_name' => 'John' ,
    			'last_name' =>'Doe',
    			'email' => 'testmail@test.com'),
    	 );
    	foreach ($arr as $value) {
    		Contact::create($value);
    	}
        
    }

}
