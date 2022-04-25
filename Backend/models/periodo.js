const db = require('../util/database');

module.exports = class Periodo{
    constructor(nueva_fechain, nueva_fechafin) {
        this.FechaInicio = nueva_fechain;
        this.FechaFin = nueva_fechafin;
    }

    static fetchAllPeriodos() {
        console.log(db.execute('SELECT * FROM PeriodoEvaluacion'));
         return db.execute('SELECT * FROM PeriodoEvaluacion');
    }

    static fetchOnePeriodo(fk_idPeriodo) {
        console.log(db.execute('SELECT * FROM PeriodoEvaluacion WHERE idPeriodo = ?', [fk_idPeriodo]));
        return db.execute('SELECT * FROM PeriodoEvaluacion WHERE idPeriodo = ?', [fk_idPeriodo]);
    }

    save() {
        return db.execute('INSERT INTO PeriodoEvaluacion (FechaInicio, FechaFin) VALUES (?, ?)',
        [this.FechaInicio, this.FechaFin]
    );
    }

    static checkOverlap(FechaInicio, FechaFin){
        console.log('SELECT idPeriodo FROM PeriodoEvaluacion WHERE FechaInicio BETWEEN ? and ?');
        return db.execute('SELECT idPeriodo FROM PeriodoEvaluacion WHERE FechaInicio BETWEEN ? and ?', 
        [FechaInicio, FechaFin]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }

    // Obtiene el periodo más reciente
    static getPeriodo() {
        return db.execute('SELECT * FROM PeriodoEvaluacion ORDER BY idPeriodo DESC LIMIT 1;').then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }
}