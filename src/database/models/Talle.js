module.exports = function (sequelize, dataTypes){
    const Stock = require('./Stock')(sequelize, dataTypes);
    let alias = 'Talle';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'sizes',
        timestamps: false
    };
    const Talle = sequelize.define(alias, cols, config);

    Talle.associate = models => {
        
        //Producto
        Talle.belongsToMany(models.Producto, {
            as: 'productos',
            through: Stock, //Tabla pivot
            foreignKey:'talle_id',
            otherKey: 'product_id',
        })
      
        
    }

    return Talle
}