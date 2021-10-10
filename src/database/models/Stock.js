module.exports = function (sequelize, dataTypes){
    let alias = 'Stock';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        size_id:{
            type:dataTypes.INTEGER
        },
        color_id:{
            type:dataTypes.INTEGER
        }, 
        stock: {
            type:dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'stocks',
        timestamps: false
    };
    const Stock = sequelize.define(alias, cols, config);
        


    return Stock
}
