module.exports = function (sequelize, dataTypes){
    let alias = 'Categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    };
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = models => {
        // Categoria
        Categoria.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'category_id'
        }) 
      
        
    }

    return Categoria
}
