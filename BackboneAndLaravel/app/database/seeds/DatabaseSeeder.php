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

		 $this->call('TaskTableSeeder');
		 $this->command->info('Tasks table seeded!');
	}

}
class TaskTableSeeder extends Seeder {

    public function run()
    {
        $arr=array(
	array(
		'title' =>'Go to the store' 
		),
	array(
		'title' =>'Finish Backbone Course' 
		),
	array(
		'title' =>'Get some sleep' 
		)

	);
        foreach ($arr as &$value) {
        	Task::create($value);
        }

        
    }

}
