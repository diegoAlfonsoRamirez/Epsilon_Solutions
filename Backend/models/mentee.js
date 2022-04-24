const db = require('../util/database');

module.exports = class Mentee{
    constructor(nuevo_fk_idLead, nuevo_idMentee, nueva_descAsignacion, nuevo_fk_idPeriodo) {
        this.fk_idLead = nuevo_fk_idLead;
        this.idMentee = nuevo_idMentee;
        this.descAsignacion = nueva_descAsignacion;
        this.fk_idPeriodo = nuevo_fk_idPeriodo;
    }

    static fetchAllMentees() {
        return db.execute('SELECT idMentee, nombre, apellidoP, apellidoM, nivOverall, descAsignacion, FechaInicio, FechaFin FROM Empleado e, Mentees m, PeriodoEvaluacion p WHERE e.idEmpleado = m.idMentee AND m.fk_idPeriodo = p.idPeriodo');
    }

    save() {
        return db.execute('INSERT INTO Mentees (fk_idLead, idMentee, descAsignacion, fk_idPeriodo) VALUES (?, ?, ?, ?)',
        [this.fk_idLead, this.idMentee, this.descAsignacion, this.fk_idPeriodo]
    );
    }

    // Obtiene los mentores
    static getMentores(idEmpleadoSsn) {
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE idEmpleado <> ? AND fk_idRolJer = 2',[idEmpleadoSsn])
    }

    static getEmpleados(){
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE fk_idRolJer = 1')
    }

    // Obtiene el periodo más reciente
    static getPeriodo() {
        return db.execute('SELECT * FROM PeriodoEvaluacion ORDER BY idPeriodo DESC LIMIT 1;').then(([rows, fielData]) => {
            return rows[0].idPeriodo;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static getIdMentor(Mentor){
        return db.execute('SELECT idEmpleado FROM Empleado WHERE CONCAT(nombre , " ", apellidoP) = ?', [Mentor]).then(([rows, fielData]) => {
            return rows[0].idEmpleado;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static getIdMentorado(Mentorado){
        return db.execute('SELECT idEmpleado FROM Empleado WHERE CONCAT(nombre , " ", apellidoP) = ?', [Mentorado]).then(([rows, fieldData]) => {
            return rows[0].idEmpleado;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static getMentorados(idEmpleadoSsn){
        return db.execute('SELECT idMentee, nombre, apellidoP, apellidoM, nivOverall, nivPeople, nivBusiness, nivCraft FROM Empleado E, Mentees M WHERE E.idEmpleado = M.idMentee AND M.FK_IdLead = ?',
        [idEmpleadoSsn])
    }

    static getCuestMentorado(idMentorado, fk_idPeriodo){
        return db.execute('SELECT idCuestionario, nombre, apellidoP, apellidoM, FechaInicio, FechaFin FROM Empleado E, Cuestionario C, PeriodoEvaluacion PE WHERE E.idEmpleado = C.fk_idEvaluador AND C.idEvaluado = ? AND C.fk_idPeriodo = PE.idPeriodo AND C.fk_idPeriodo = ? AND C.isAnswered = 1', 
        [idMentorado, fk_idPeriodo])
    }

    static getAnsCuest(idCuestionario){
        return db.execute('SELECT idRespuesta, Template, idPregunta, Pregunta, Respuesta, tipoPregunta FROM PreguntaRespuesta WHERE fk_idCuestionario = ?',
        [idCuestionario])
    }

    static getIdEvaluado(idCuestionario){
        return db.execute('SELECT idEvaluado, fk_idEvaluador FROM Cuestionario WHERE idCuestionario = ?', [idCuestionario]).then(([rows, fielData]) => {
            return rows[0].idEvaluado
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static getIdEvaluador(idCuestionario){
        return db.execute('SELECT fk_idEvaluador, fk_idEvaluador FROM Cuestionario WHERE idCuestionario = ?', [idCuestionario]).then(([rows, fielData]) => {
            return rows[0].fk_idEvaluador
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static getNombreEmpleado(idEmpleado){
        return db.execute('SELECT nombre, apellidoP, apellidoM FROM Empleado WHERE idEmpleado = ?', [idEmpleado])
    }
}