'use strict';
const path = require('path');
const mypath = path.resolve(process.cwd(), 'src' , '.env')
require('dotenv').config({path: mypath});

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      email: 'ivan_kot2001@mail.ru',
      password: process.env.ADMIN_PASSWORD,
      vklink: 'vk.com/id184915743',
      last_vizit: new Date(),
      added_videos: '[]',
      isAdmin: true,
      activated: true
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
