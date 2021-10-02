module.exports = function(sequelize, dataTypes){
    let alias = "State";
    let cols = {
       id:{
           autoIncrement: true,
           primaryKey: true,
           type: dataTypes.INTEGER,
       },
       state:{
           type: dataTypes.STRING
       }
    }
    let config = {
       tableName: 'states',
       timestamps: false
   }
    
       const State = sequelize.define(alias,cols, config);

       //Estados a usuarios
       State.associate = function(models){
        State.hasMany(models.Usuario, {
            as: "usuarios",
            foreingKey: "state_id"
        });

       }

       return State; 
   
    }
