1) We revised our functional dependencies for location table and user table. 
2) We revised most of our BCNF Normalization work.
3) We also revised our relational schema and UML diagram based on the results from the BCNF normalization.

No comments were directly addressed by action 1 but was slightly altered to better fit our desired design.

Comments Addressed by action 2 and 3:

-0.5: plot_id and crop_id in Planting_Plan should also be PKs

-1: Planting_Plan not normalized

-1: Error in normalizing Location. PostalCode is not in 3NF, violating FD is
zip --> (city, state)
zip is not a superkey

(city, state) is not part of a candidate key (candidate key is (zip, usda_zone)

It may be helpful to write out the entire process of normalization (i.e. find minimal basis, then use that to get 3NF)
