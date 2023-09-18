SELECT * FROM "restaurant" WHERE id = 1;
SELECT * FROM "restaurant" WHERE id = 10;
SELECT * FROM "restaurant" WHERE id = 2;

-- 3 méthodes différentes pour récupérer les mêmes valeurs en une seule requête

SELECT * FROM "restaurant" WHERE id = 1 OR id = 10 OR id = 2;
SELECT * FROM "restaurant" WHERE id IN (1,10,2);
SELECT * FROM "restaurant" WHERE id = ANY ('{1,10,2}');

-- Ces requêtes sont des récupérations par batch
