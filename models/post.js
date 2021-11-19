module.exports = (sequelize, type) => {
    return sequelize.define('Posts', {
        idPost: {
            allowNull: false,
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
          allowNull: false,
          type: type.STRING
        },
        creationDate: {
          allowNull: false,
          type: type.DATE
        },
        image: {
            type: type.STRING,
            validate: {
              isUrl: {
                msg: 'image must be an valid url'
              },
              is: {
                args: /.*(.jpg|.gif|.png)$/i,
                msg: 'image must be a .jpg, .gif or .png file'
              }
            }
        },
        content: {
          allowNull: false,
          type: type.STRING
        }
    },
    {
      timestamps: false
    });
};