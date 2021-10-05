const Role = require("./Role");

module.exports = function(sequelize, dataTypes){
    let alias = 'Usuario';
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        } ,
        
        name:{
        allowNull: false,
        type: dataTypes.STRING,
        },
        street:{
            allowNull: false,
            type: dataTypes.STRING,
        },
        number:{
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        city:{
            allowNull: false,
            type: dataTypes.STRING,
        },
        state_id:{
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        postalCode:{
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        phone:{
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        email:{
            allowNull: false,
            type: dataTypes.STRING,
            
        }, 
        password: {
            allowNull: false,
            type: dataTypes.STRING
        },
        image:{
            allowNull: true,
            type: dataTypes.STRING
        },
        acepTerms:{ 
            type: dataTypes.INTEGER
        },
        role_id:{
            type: dataTypes.INTEGER
        }

       };
    let config = {
        tableName: 'users',
        timestamps: false
    }
    const Usuario = sequelize.define(alias,cols, config);

    //Estado / Ciudad
    Usuario.associate = function(models){
        Usuario.belongsTo(models.State, {
            as: "states",
            foreingKey: "state_id"
        });

        // Rol del usuario
        Usuario.associate = function(models){
            Usuario.belongsTo(models,Role, {
                as: "roles",
                foreingKey: "role_id"
            });
        }


    }

    return Usuario;
    } 
