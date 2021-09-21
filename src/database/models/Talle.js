module.exports = function (sequelize, dataTypes){
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
    const Color = sequelize.define(alias, cols, config);

    Talle.associate = models => {
        
        //Producto
        Talle.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'stock', //Tabla pivot
            foreignKey:'talle_id',
            otherKey: 'product_id',
            timestamps: false
        })
      
        
    }

    return Talle
}