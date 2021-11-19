const Sequelize = require('sequelize');
require('dotenv').config();

const { USERDB, PASSWORDDB, HOST } = process.env

const PostModel = require('./models/post');
const CategoryModel = require('./models/category');

const sequelize = new Sequelize('blogsApi', USERDB, PASSWORDDB, {
    host: HOST,
    dialect: 'mysql'
});

const Post = PostModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);

Category.hasMany(Post);
Post.belongsTo(Category);

sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas');
    }).catch(e => console.log(e));

module.exports = {
    Post,
    Category
};