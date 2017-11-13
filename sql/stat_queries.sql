April
Number of users	72
select count(*) from user where datetime > '2017-03-22 00:00:00';


+----------+--------------------------------+


select count(*),district from user where datetime > '2017-03-22 00:00:00' group by district;

Number of users by desctrict

+----------+--------------------------------+
| count(*) | district                       |
+----------+--------------------------------+
       13 	අනුරාධපුර                      
        5 	 කුරැනෑගල                       
       19 	 ගමිපහ                          
       11 	පුත්තලම                        
        1 	 පොළොන්නරුව                     
       2 	 මහනුවර                         
       19	  මාතලේ                          
        2 	 යාපනය                          
+----------+--------------------------------+


select count(croptype) as count, croptype  from audit_reqs grouped where generatedfrom = 'detail' group by croptype

select u.name, u.district, u.phone, ar.croptype,count(ar.croptype),ar.datetime 
	from user u join audit_reqs ar 
	on u.phoneid = ar.generatedfromid
	where ar.datetime > '2017-04-01 00:00:00' 
	group by ar.croptype,u.name 
	INTO OUTFILE '/tmp/page_visit_by_user.csv'
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n';

select u.name, u.district, u.phone,p.content,p.image,p.status,p.datetime from user u join post p 
	on u.phoneid = p.user 
	where p.datetime > '2017-04-01 00:00:00' 
    and p.datetime < '2017-05-01 00:00:00' 
    INTO OUTFILE '/tmp/post_count_by_user.csv'
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'; 


select u.name, u.district, u.phone, count(ar.generatedfromid) 
	from user u left join audit_reqs ar 
	on u.phoneid = ar.generatedfromid
	where ar.datetime > '2017-04-01 00:00:00' 
    and ar.datetime < '2017-05-01 00:00:00' 
    group by ar.generatedfromid 
    INTO OUTFILE '/tmp/usage_by_user.csv'
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'; 
