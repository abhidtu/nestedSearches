# nestedSearches
An AngularJs directive to search elements in a nested json -- highlighting both parent and children.


A common working case:
In the world there are a total of 196 countries:
Now inside each country there are many states.
Inside each state there are cities.
Inside city there are cities etc..
This can keep on going till nth level.

A common way to represent this data would be in a form of recursive nested json. 
For example:
<pre>
{ 
	"countries":
	[
		{
			"country_id":1,
			"name":"catname_1",
			"country_description":"countdesc_1",
			"country_status":1,
			"states":
			[
				{
					"state_id":4,
					"name":"catname_4",
					"state_description":"countdesc_4",
					"state_status":0,
					"cities":
					[
						{
							"city_id":5,
							"name":"prodname_5",
							"city_description":"proddesc_5",
							"city_status":1,
							"districts":
							[
								{
									"district_id":821,
									"name":"districtname_821",
									"district_description":"districtdesc_821",
									"district_status":1
								},
								{
									"district_id":822,
									"name":"districtname_822",
									"district_description":"districtdesc_822",
									"district_status":1
								},
								{
									"district_id":823,
									"name":"districtname_823",
									"district_description":"districtdesc_823",
									"district_status":1
								}
							]
						},
						{
							"city_id":6,
							"name":"prodname_6",
							"city_description":"proddesc_6",
							"city_status":1
						}		
					]
				},
				{
					"country_id":7,
					"name":"catname_7",
					"country_description":"countdesc_7",
					"country_status":1,
					"cities":
					[
						{
							"city_id":8,
							"name":"prodname_8",
							"city_description":"proddesc_8",
							"city_status":1
						},
						{
							"city_id":9,
							"name":"prodname_9",
							"city_description":"proddesc_9",
							"city_status":1,
							"districts":
							[
								{
									"district_id":831,
									"name":"districtname_831",
									"district_description":"districtdesc_831",
									"district_status":0
								},
								{
									"district_id":832,
									"name":"districtname_832",
									"district_description":"districtdesc_832",
									"district_status":1
								},
								{
									"district_id":833,
									"name":"districtname_833",
									"district_description":"districtdesc_833",
									"district_status":1
								}
							]
						}		
					]
				}
			]
		}
	]
}
</pre>
Now if one wants to search any country name, ueser might like to know what all cities/states/districts etc lie under it ie:
searching for a parent means also displaying all its the children in the search results till nth level, where n can be any number.

Similarly if user wants to search any state this means user should also get an idea that in which country the state lies along with all the cities and districts in the city, ie: both parent and children should get highlighted.

<b>Thus there are two cases in this:</b>

1.While searching for a country/city/state etc. user should also be able to see all the children items lying under that particular item.

2.While searching for a country/city/state etc. user should also be able to see all its consecutive the parents in the search results.
