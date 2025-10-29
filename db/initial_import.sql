LOAD DATA LOCAL INFILE 'data/locations.csv'
INTO TABLE zip_zones
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@zip_code, @zone, @city, @state, @lat, @lon)
SET zip = TRIM(@zip_code), usda_zone = TRIM(@zone);

LOAD DATA LOCAL INFILE 'data/locations.csv'
INTO TABLE locations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@zip_code, @zone, @city, @state, @lat, @lon)
SET zip = TRIM(@zip_code), city = TRIM(@city), state = TRIM(@state);

LOAD DATA LOCAL INFILE 'data/users_seed.csv'
INTO TABLE users
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(email, name, password, created_at);

LOAD DATA LOCAL INFILE 'data/crops_info.csv'
INTO TABLE crops
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '\\'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@common_name, @scientific_name, @ideal_soil, @sun_req, @water_req, @usda_zone_min, @usda_zone_max)
SET
  common_name     = NULLIF(TRIM(@common_name), ''),
  scientific_name = NULLIF(TRIM(@scientific_name), ''),
  ideal_soil      = NULLIF(TRIM(@ideal_soil), ''),
  sun_req         = NULLIF(TRIM(@sun_req), ''),
  water_req       = NULLIF(TRIM(@water_req), ''),
  usda_zone_min   = CAST(NULLIF(TRIM(@usda_zone_min), '') AS SIGNED),
  usda_zone_max   = CAST(NULLIF(TRIM(@usda_zone_max), '') AS SIGNED);

LOAD DATA LOCAL INFILE 'data/az_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 14808,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/chi_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 26378,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/la_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 16532,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/nyc_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 64,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/philly_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 5526,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/sd_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 16980,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/seattle_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 16289,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/sf_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 17375,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/tx_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 22084,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/uiuc_weather_data.csv'
INTO TABLE weather_observations
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@ignore_obs_id, @location_id, @observed_on, @tmin_c, @tmax_c, @precip_mm, @humidity_pct, @frost_flag, @source)
SET location_id = 26512,
    observed_on = STR_TO_DATE(@observed_on, '%Y-%m-%d'),
    tmin_c = TRIM(@tmin_c),
    tmax_c = TRIM(@tmax_c),
    precip_mm = IF(@precip_mm = '', NULL, TRIM(@precip_mm)),
    humidity_pct = IF(@humidity_pct = '', NULL, TRIM(@humidity_pct)),
    frost_flag = CASE WHEN TRIM(@frost_flag) = 'Y' THEN TRUE ELSE FALSE END,
    source = 'VisualCrossing';

LOAD DATA LOCAL INFILE 'data/plots_data.csv'
INTO TABLE plots
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@user_id, @location_id, @plot_name, @area_sq_m, @soil_type, @sunlight_exposure, @is_active)
SET
  user_id = TRIM(@user_id),
  location_id = TRIM(@location_id),
  plot_name = TRIM(@plot_name),
  area_sq_m = IF(@area_sq_m = '', NULL, TRIM(@area_sq_m)),
  soil_type = IF(@soil_type = '', NULL, TRIM(@soil_type)),
  sunlight_exposure = IF(@sunlight_exposure = '', NULL, TRIM(@sunlight_exposure)),
  is_active = CASE
    WHEN LOWER(TRIM(@is_active)) IN ('1') THEN TRUE
    ELSE FALSE
  END;
