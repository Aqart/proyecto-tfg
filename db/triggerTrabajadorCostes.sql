DELIMITER //

CREATE TRIGGER after_trabajador_update
AFTER UPDATE ON trabajador
FOR EACH ROW
BEGIN
    IF NEW.activo = FALSE THEN
        DELETE FROM trabajador_costes WHERE numero_trabajador = NEW.numero_trabajador;
    END IF;
END;
//

DELIMITER ;