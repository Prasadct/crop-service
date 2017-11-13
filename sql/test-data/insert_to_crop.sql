insert into crop values(1, 1, 'දොඩම්', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(2, 1, 'අන්නාසි', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(3, 1, 'අලිගැට පෙර ', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(4, 1, 'කෙසෙල්', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(5, 1, 'මිදි', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(6, 1, 'කොමඩු', 'Orange', 'Orange', 'orange.jpg');

update  crop set crop_name_si = 'දොඩම්' , crop_name_ta = 'Orange' , crop_name_en = 'Orange', image = 'orange.jpg' where id = 1;
update  crop set crop_name_si = 'අන්නාසි' , crop_name_ta = 'Pine apple' , crop_name_en = 'Pine apple', image = 'pineapple.jpg' where id = 2;
update  crop set crop_name_si = 'අලිගැට' , crop_name_ta = 'Avacado' , crop_name_en = 'Avacado', image = 'avacado.jpg' where id = 3;
update  crop set crop_name_si = 'කෙසෙල්' , crop_name_ta = 'Banana' , crop_name_en = 'Banana', image = 'banana.jpg' where id = 4;
update  crop set crop_name_si = 'මිදි' , crop_name_ta = 'Grapes' , crop_name_en = 'Grapes', image = 'grapes.jpg' where id = 5;
update  crop set crop_name_si = 'කොමඩු' , crop_name_ta = 'Watermelon' , crop_name_en = 'Watermelon', image = 'watermelon.jpg' where id = 6;


/*
live 

insert into crop values(1, 1, 'ද~\ඩම~J', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(2, 1, '~Eන~Jන~O~C~R', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(3, 1, '~Eල~R~\~Pට ප~Yර ', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(4, 1, '~Z~Y~C~Yල~J', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(5, 1, 'ම~Rද~R', 'Orange', 'Orange', 'orange.jpg');
insert into crop values(6, 1, '~Z~\මඩ~T', 'Orange', 'Orange', 'orange.jpg');

update  crop set crop_name_si = 'ද~\ඩම~J' , crop_name_ta = 'Orange' , crop_name_en = 'Orange' where id = 1;
update  crop set crop_name_si = '~Eන~Jන~O~C~R' , crop_name_ta = 'Pine apple' , crop_name_en = 'Pine apple' where id = 2;
update  crop set crop_name_si = '~Eල~R~\~Pට' , crop_name_ta = 'Avacado' , crop_name_en = 'Avacado' where id = 3;
update  crop set crop_name_si = '~Z~Y~C~Yල~J' , crop_name_ta = 'Banana' , crop_name_en = 'Banana' where id = 4;
update  crop set crop_name_si = 'ම~Rද~R' , crop_name_ta = 'Grapes' , crop_name_en = 'Grapes' where id = 5;
update  crop set crop_name_si = '~Z~\මඩ~T' , crop_name_ta = 'Watermelon' , crop_name_en = 'Watermelon' where id = 6;


*/