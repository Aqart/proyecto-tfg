erDiagram
          MAQUINA ||--o{ CONSUMIBLE : contiene
          MAQUINA ||--o{ GASTO-ENERGETICO : tiene
          MAQUINA ||--o{ TRABAJADOR : opera
          MAQUINA ||--o{ PARTE-TELAR: genera
          USER ||--|| TRABAJADOR: es 

          MAQUINA{
            int id PK
            string nombre
            float produccion_m2
            float energia_consumida
          }
          CONSUMIBLE {
            int id PK
            string nombre
            float precio
            int id_maquina
            int id_maquina FK
          }
          GASTO-ENERGETICO {
            int id PK
            float potenciaConsumida
            float precio
            int id_maquina FK
          }
          TRABAJADOR {
            int id PK
            string nombre
            string apellidos
            float precio
            float produccion
            int id_maquina FK
            int id_user FK
          }
          GASTO-GENERAL {
            int id PK
            string nombre
            float precio
          }

          MATERIA-PRIMA{
            int id PK
            string nombre
            float cantidad_m3
            float precio
          }
          TRANSPORTE{
            int id PK
            string nombre
            int cantidad
            float precio
          }
          PARTE-TELAR{
            int id PK
            string bloque
            string material
            float medida
          }
          PARTE-PULIDORA{
            int id PK
            string bloque
            string material
            float medida
          }
          USER{
            int id PK
            string email
            string password
            timestamp fecha_registro
            timestamp ultima_conexion
          }