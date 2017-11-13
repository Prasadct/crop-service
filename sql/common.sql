--Charset of database
	SELECT default_character_set_name FROM information_schema.SCHEMATA WHERE 
	schema_name = "cropadvisor";

--Charset of a table
	SELECT CCSA.character_set_name FROM information_schema.`TABLES` T, information_schema.`COLLATION_CHARACTER_SET_APPLICABILITY` CCSA WHERE 
	CCSA.collation_name = T.table_collation 
	AND T.table_schema = "cropadvisor" 
	AND T.table_name = "crop";

--Charset of a column
	SELECT character_set_name FROM information_schema.`COLUMNS` WHERE 
	table_schema = "cropadvisor" 
	AND table_name = "crop" 
	AND column_name = "crop_name_si";

--Change the charset of a column
ALTER TABLE crop MODIFY crop_name_si CHAR(50) CHARACTER SET utf8;