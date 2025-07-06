const getListas = `
SELECT 
  L.ID,
  L.número AS numero_lista,
  L.partido,
  L.imagen,
  IL.cargo,
  V.CI,
  V.nombre,
  V.apellido
FROM Lista L
JOIN Papeleta P ON L.ID_papeleta = P.ID
JOIN Integración_listas IL ON L.ID = IL.ID_lista
JOIN Votante V ON IL.CI_candidato = V.CI
WHERE P.tipo_elección = ? AND P.fecha_elección = ?;
`;


const queryResultadoNacionalCircuito = `
SELECT 
  CASE 
    WHEN V.validez = 'válido' THEN CAST(L.número AS CHAR)
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END AS numero_lista,

  CASE 
    WHEN V.validez = 'válido' THEN L.partido
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END AS partido,

  COUNT(*) AS total_votos

FROM Voto V
JOIN Papeleta P ON V.ID_papeleta = P.ID
LEFT JOIN Lista L ON V.ID_lista = L.ID

WHERE P.fecha_elección = ? AND P.tipo_elección = 'Nacional' AND V.Id_circuito = ?

GROUP BY 
  CASE 
    WHEN V.validez = 'válido' THEN CAST(L.número AS CHAR)
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END,
  CASE 
    WHEN V.validez = 'válido' THEN L.partido
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END

ORDER BY total_votos DESC;

`;

const queryResultadoNacional = `
SELECT 
  CASE 
    WHEN V.validez = 'válido' THEN CAST(L.número AS CHAR)
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END AS numero_lista,

  CASE 
    WHEN V.validez = 'válido' THEN L.partido
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END AS partido,

  COUNT(*) AS total_votos

FROM Voto V
JOIN Papeleta P ON V.ID_papeleta = P.ID
LEFT JOIN Lista L ON V.ID_lista = L.ID

WHERE P.fecha_elección = ? AND P.tipo_elección = 'Nacional'

GROUP BY 
  CASE 
    WHEN V.validez = 'válido' THEN CAST(L.número AS CHAR)
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END,
  CASE 
    WHEN V.validez = 'válido' THEN L.partido
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END

ORDER BY total_votos DESC;


`;

const queryResultadoNacionalPorDepartamento = `
SELECT 
  CASE 
    WHEN V.validez = 'válido' THEN CAST(L.número AS CHAR)
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END AS numero_lista,

  CASE 
    WHEN V.validez = 'válido' THEN L.partido
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END AS partido,

  COUNT(*) AS total_votos

FROM Voto V
JOIN Papeleta P ON V.ID_papeleta = P.ID
LEFT JOIN Lista L ON V.ID_lista = L.ID
JOIN Circuito C ON V.Id_circuito = C.ID

WHERE P.fecha_elección = ? AND P.tipo_elección = 'Nacional' AND C.departamento = ?

GROUP BY 
  CASE 
    WHEN V.validez = 'válido' THEN CAST(L.número AS CHAR)
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END,
  CASE 
    WHEN V.validez = 'válido' THEN L.partido
    WHEN V.validez = 'en_blanco' THEN 'BLANCO'
    WHEN V.validez = 'anulado' THEN 'ANULADO'
  END

ORDER BY total_votos DESC;


`;

const queryResultadoNacionalPorPartido = `
SELECT 
    Partido_Político.nombre AS partido,
    COUNT(Voto.ID) AS cantidad_de_votos
FROM 
    Partido_Político
LEFT JOIN 
    Lista ON Lista.partido = Partido_Político.nombre
LEFT JOIN 
    Voto ON Voto.ID_lista = Lista.ID 
         AND Voto.validez = 'válido'
LEFT JOIN 
    Papeleta ON Lista.ID_papeleta = Papeleta.ID
LEFT JOIN
    Elección ON Papeleta.fecha_elección = Elección.fecha
            AND Papeleta.tipo_elección = Elección.tipo
WHERE 
    Elección.fecha = ?
    AND Elección.tipo = 'Nacional'
GROUP BY 
    Partido_Político.nombre
ORDER BY
    Partido_Político.nombre;



`;




module.exports = {getListas, queryResultadoNacionalCircuito, queryResultadoNacional, queryResultadoNacionalPorPartido, queryResultadoNacionalPorDepartamento};