const queryResultadoNacionalCircuito = `
SELECT 
  CASE 
    WHEN Voto.validez = 'válido' THEN CAST(Lista.número AS CHAR)
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END AS numero_lista,
  CASE 
    WHEN Voto.validez = 'válido' THEN Integración_Listas.partido
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END AS partido,
  COUNT(Voto.ID) AS total_votos
FROM Voto
JOIN Papeleta
  ON Voto.ID_papeleta = Papeleta.ID
LEFT JOIN Lista
  ON Papeleta.ID = Lista.ID_papeleta
LEFT JOIN Integración_Listas
  ON Integración_Listas.ID_lista = Lista.ID_papeleta
WHERE Papeleta.fecha_elección = ? AND Papeleta.tipo_elección = ? AND Voto.ID_circuito = ?
GROUP BY 
  CASE 
    WHEN Voto.validez = 'válido' THEN CAST(Lista.número AS CHAR)
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END,
  CASE 
    WHEN Voto.validez = 'válido' THEN Integración_Listas.partido
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END
ORDER BY total_votos DESC;

`;

const queryResultadoNacional = `
SELECT 
  CASE 
    WHEN Voto.validez = 'válido' THEN CAST(Lista.número AS CHAR)
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END AS numero_lista,
  CASE 
    WHEN Voto.validez = 'válido' THEN Integración_Listas.partido
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END AS partido,
  COUNT(Voto.ID) AS total_votos
FROM Voto
JOIN Papeleta
  ON Voto.ID_papeleta = Papeleta.ID
LEFT JOIN Lista
  ON Papeleta.ID = Lista.ID_papeleta
LEFT JOIN Integración_Listas
  ON Integración_Listas.ID_lista = Lista.ID_papeleta
WHERE Papeleta.fecha_elección = ? AND Papeleta.tipo_elección = ?
GROUP BY 
  CASE 
    WHEN Voto.validez = 'válido' THEN CAST(Lista.número AS CHAR)
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END,
  CASE 
    WHEN Voto.validez = 'válido' THEN Integración_Listas.partido
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END
ORDER BY total_votos DESC;

`;

const queryResultadoNacionalPorPartido = `
SELECT 
  CASE
    WHEN Voto.validez = 'válido' THEN Integración_Listas.partido
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END AS partido,
  COUNT(Voto.ID) AS total_votos
FROM Voto
JOIN Papeleta
  ON Voto.ID_papeleta = Papeleta.ID
LEFT JOIN Lista
  ON Papeleta.ID = Lista.ID_papeleta
LEFT JOIN Integración_Listas
  ON Integración_Listas.ID_lista = Lista.ID_papeleta
WHERE Papeleta.fecha_elección = ? AND Papeleta.tipo_elección = ?
GROUP BY 
  CASE
    WHEN Voto.validez = 'válido' THEN Integración_Listas.partido
    WHEN Voto.validez = 'en_blanco' THEN 'BLANCO'
    WHEN Voto.validez = 'anulado' THEN 'ANULADO'
  END
ORDER BY total_votos DESC;


`;


module.exports = {queryResultadoNacionalCircuito, queryResultadoNacional, queryResultadoNacionalPorPartido};