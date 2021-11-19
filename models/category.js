module.exports = (sequelize, type) => {
    return sequelize.define('Category', {
        idCategory: {
            allowNull: false,
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
          allowNull: false,
          type: type.STRING
        }
    },
    {
        timestamps: false
    });
};