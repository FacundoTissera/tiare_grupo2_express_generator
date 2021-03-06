module.exports = function (sequelize, dataTypes){
    const Stock = require('./Stock')(sequelize, dataTypes);
    let alias = 'Color';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'colors',
        timestamps: false
    };
    const Color = sequelize.define(alias, cols, config);

    Color.associate = models => {
        //Producto
        Color.belongsToMany(models.Producto, {
            as: 'productos',
            through: Stock, //Tabla pivot
            foreignKey:'color_id',
            otherKey: 'product_id',
        })
      
        
    }

    return Color
}
