module.exports = function(sequelize, dataTypes){
 let alias = "Role";
 let cols = {
    id:{
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
    },
    role:{
        type: dataTypes.STRING
    }
 }
 let config = {
    tableName: "roles",
    timestamps: false
}
 
    const Role = sequelize.define(alias,cols, config);

    //Roles a usuarios
    Role.associate = function(models){
        Role.hasMany(models.Usuario, {
            as: "usuarios",
            foreignKey: "role_id"
        });

    }

    return Role;
}