module.exports = function (sequelize, dataTypes){
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
            type: dataTypes.STRING,
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
            
        }


    };
    let config = {
        tableName: 'users',
        timestamps: false
    }
    const Usuario = sequelize.define(alias,cols, config);
    
    return Usuario;
};
