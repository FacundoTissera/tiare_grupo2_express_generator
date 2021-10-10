module.exports = function (sequelize, dataTypes){
    const Stock = require('./Stock')(sequelize, dataTypes);
    let alias = 'Producto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        description:{
            type:dataTypes.STRING
        },
        image:{
            type:dataTypes.STRING
        },
        sale:{
            type:dataTypes.INTEGER
        },
        category_id:{
            type:dataTypes.INTEGER
        }, 
        discount: {
            type:dataTypes.DOUBLE
        }
    }; 
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = models => {
        // Categoria
        Producto.belongsTo(models.Categoria, {
            as: 'categorias',
            foreignKey: 'category_id'

        }) 
        //Talle
        Producto.belongsToMany(models.Talle, {
            as: 'talles',
            through: Stock, // Tabla pivot
            foreignKey: 'product_id',
            otherKey: 'size_id'
        })
        //Color
        Producto.belongsToMany(models.Color, {
            as: 'colores',
            through: Stock, //Tabla pivot
            foreignKey:'product_id',
            otherKey: 'color_id'
        })
        
        
    }

    return Producto
}

