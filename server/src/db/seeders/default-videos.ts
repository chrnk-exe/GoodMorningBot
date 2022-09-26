'use strict';
import path from 'path';
import { QueryInterface, Sequelize } from 'sequelize/types';
const mypath = path.resolve(process.cwd(), '.env')
require('dotenv').config({path: mypath});

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    let arr = []
    for(let i = 456239942; i <= 456239953; i++){
        arr.push({
            ownerid: 184915743,
            content: null,
            vkcontent: `184915743_${i}`,
            day: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
    await queryInterface.bulkInsert('videos', arr, {});
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('users', {});
  }
};
