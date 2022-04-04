const { getConnection, mssql } = require('../database');
const helpers = require('../lib/helpers')

class ActivitiesRepo {

  static async getActivities() {
    try {
      const pool = await getConnection();
      const activities = await pool.request().query('SELECT * FROM actividades');
      return activities.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getActivity(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const activity = await request.query('SELECT * FROM actividades WHERE id = @id');
      return activity.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getActivitiesbyCase(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      const activities = await request.query('SELECT * FROM actividades WHERE caso_id = @id');
      return activities.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addActivity(actividad) {
    try {
      const {activity, nextDate, nextStep, id, caseid} = actividad;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('case_id',  mssql.Int, caseid);
      request.input('user_id',  mssql.Int, id);
      request.input('requestDate', mssql.DateTime, new Date());
      request.input('activity', mssql.VarChar(100), activity);
      const date = helpers.toDate(nextDate);
      request.input('nextDate', mssql.DateTime, date);
      request.input('nextStep', mssql.VarChar(100), nextStep);
      const result = await request.query(
        `INSERT INTO [dbo].[actividades]
        ([caso_id] ,[usuario_id], [estado_id], [fecha], [actividad], [fecha_proximo], [proximo_paso])
        VALUES
        (@case_id, @user_id, 1, @requestDate, @activity, @nextDate, @nextStep)`
      );
      return result.recordsets;
    }
    catch (error) {
      console.log(error);
      throw (error);
    }
  }

  
  static async deleteActivity(id) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      await request.query('DELETE FROM actividades WHERE id = @id');

    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async updateActivity(actividad) {
    try {
      const {case_id, user_id, estado_id, activity, nextDate, nextStep, id} = actividad;
      const pool = await getConnection();
      const request = await pool.request();
      request.input('id', mssql.Int, id);
      request.input('case_id',  mssql.Int, case_id);
      request.input('user_id',  mssql.Int, user_id);
      request.input('estado_id',  mssql.Int, estado_id);
      request.input('requestDate', mssql.DateTime, new Date());
      request.input('activity', mssql.VarChar(100), activity);
      request.input('nextDate', mssql.Date, nextDate);
      request.input('nextStep', mssql.VarChar(100), nextStep);
      await request.query(
        `UPDATE actividades SET 
        [caso_id] = @case_id
      ,[usuario_id] = @user_id
      ,[estado_id] = @estado_id
      ,[fecha] = @requestDate
      ,[actividad] = @activity
      ,[fecha_proximo] = @nextDate
      ,[proximo_paso] = @nextStep
        WHERE id = @id`
      );
    } catch (error) {
      console.log(error);
      throw(error);
    }    
  }
}

module.exports = ActivitiesRepo