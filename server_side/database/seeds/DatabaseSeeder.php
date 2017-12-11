<?php

use Illuminate\Database\Seeder;
use Faker\Factory;
use App\Company;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        foreach(range(1, 50) as $i) {
            Company::create([
                'name' => $faker->name,
                'capital' => $faker->randomFloat(4,300000),
                'president' =>$faker->firstName.' '.$faker->lastName,
                'website' => $faker->domainName,
                'created_at' => $faker->dateTime()

            ]);
        }
    }
}
